﻿'use strict';

import express = require( 'express' );
import bodyParser = require( 'body-parser' );
import * as def from 'webinate-users';
import { UserManager, UserPrivileges } from '../users';
import { ownerRights, adminRights, identifyUser } from '../permission-controller';
import { Controller } from './controller'
import { okJson, errJson } from '../serializers';
import * as compression from 'compression';
import * as winston from 'winston';

/**
 * Main class to use for managing users
 */
export class UserController extends Controller {
    private _config: def.IConfig;


	/**
	 * Creates an instance of the user manager
	 * @param userCollection The mongo collection that stores the users
	 * @param sessionCollection The mongo collection that stores the session data
	 * @param The config options of this manager
	 */
    constructor( e: express.Express, config: def.IConfig ) {
        super();

        this._config = config;

        // Setup the rest calls
        const router = express.Router();
        router.use( compression() );
        router.use( bodyParser.urlencoded( { 'extended': true }) );
        router.use( bodyParser.json() );
        router.use( bodyParser.json( { type: 'application/vnd.api+json' }) );

        router.get( '/users', <any>[ identifyUser, this.getUsers.bind( this ) ] );
        router.post( '/users', <any>[ ownerRights, this.createUser.bind( this ) ] );
        router.get( '/users/authenticated', this.authenticated.bind( this ) );
        router.get( '/users/logout', this.logout.bind( this ) );
        router.get( '/users/activate-account', this.activateAccount.bind( this ) );
        router.post( '/users/login', this.login.bind( this ) );
        router.post( '/users/register', this.register.bind( this ) );
        router.put( '/users/password-reset', this.passwordReset.bind( this ) );

        router.get( '/users/:user/meta', <any>[ ownerRights, this.getData.bind( this ) ] );
        router.get( '/users/:user/meta/:name', <any>[ ownerRights, this.getVal.bind( this ) ] );
        router.get( '/users/:username', <any>[ ownerRights, this.getUser.bind( this ) ] );
        router.get( '/users/:user/resend-activation', this.resendActivation.bind( this ) );
        router.get( '/users/:user/request-password-reset', this.requestPasswordReset.bind( this ) );
        router.delete( '/users/:user', <any>[ ownerRights, this.removeUser.bind( this ) ] );
        router.post( '/users/:user/meta/:name', <any>[ adminRights, this.setVal.bind( this ) ] );
        router.post( '/users/:user/meta', <any>[ adminRights, this.setData.bind( this ) ] );
        router.put( '/users/:user/approve-activation', <any>[ ownerRights, this.approveActivation.bind( this ) ] );

        router.get( '/who-am-i', this.authenticated.bind( this ) );
        router.get( '/sessions', <any>[ ownerRights, this.getSessions.bind( this ) ] );
        router.delete( '/sessions/:id', <any>[ ownerRights, this.deleteSession.bind( this ) ] );
        router.post( '/message-webmaster', this.messageWebmaster.bind( this ) );

        // Register the path
        e.use( config.apiPrefix, router );
    }

    /**
	 * Gets a specific user by username or email - the 'username' parameter must be set. Some of the user data will be obscured unless the verbose parameter
     * is specified. Specify the verbose=true parameter in order to get all user data.
	 */
    private async getUser( req: def.AuthRequest, res: express.Response ) {
        try {
            const user = await UserManager.get.getUser( req.params.username );

            if ( !user )
                throw new Error( 'No user found' );

            okJson<def.IGetUser>( {
                error: false,
                message: `Found ${ user.dbEntry.username }`,
                data: user.generateCleanedData( Boolean( req.query.verbose ) )
            }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

    /**
	 * Gets a list of users. You can limit the haul by specifying the 'index' and 'limit' query parameters.
     * Also specify the verbose=true parameter in order to get all user data. You can also filter usernames with the
     * search query
	 */
    private async getUsers( req: def.AuthRequest, res: express.Response ) {
        let verbose = Boolean( req.query.verbose );

        // Only admins are allowed to see sensitive data
        if ( req._user && req._user.dbEntry.privileges === UserPrivileges.SuperAdmin && verbose )
            verbose = true;
        else
            verbose = false;

        try {
            const totalNumUsers = await UserManager.get.numUsers( new RegExp( req.query.search ) );
            const users = await UserManager.get.getUsers( parseInt( req.query.index ), parseInt( req.query.limit ), new RegExp( req.query.search ) );
            const sanitizedData: def.IUserEntry[] = [];

            for ( let i = 0, l = users.length; i < l; i++ )
                sanitizedData.push( users[ i ].generateCleanedData( verbose ) );

            okJson<def.IGetUsers>( {
                error: false,
                message: `Found ${ users.length } users`,
                data: sanitizedData,
                count: totalNumUsers
            }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

	/**
	 * Gets a list of active sessions. You can limit the haul by specifying the 'index' and 'limit' query parameters.
	 */
    private async getSessions( req: express.Request, res: express.Response ) {
        try {
            const numSessions = await UserManager.get.sessionManager.numActiveSessions();
            const sessions = await UserManager.get.sessionManager.getActiveSessions( parseInt( req.query.index ), parseInt( req.query.limit ) )

            okJson<def.IGetSessions>( {
                error: false,
                message: `Found ${ sessions.length } active sessions`,
                data: sessions,
                count: numSessions
            }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

	/**
 	 * Resends the activation link to the user
	 */
    private async deleteSession( req: express.Request, res: express.Response ) {
        try {
            await UserManager.get.sessionManager.clearSession( req.params.id, req, res );
            okJson<def.IResponse>( { error: false, message: `Session ${ req.params.id } has been removed` }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

	/**
	 * Activates the user's account
	 */
    private async activateAccount( req: express.Request, res: express.Response ) {
        const redirectURL = this._config.accountRedirectURL;

        try {
            // Check the user's activation and forward them onto the admin message page
            await UserManager.get.checkActivation( req.query.user, req.query.key );
            res.redirect( `${ redirectURL }?message=${ encodeURIComponent( 'Your account has been activated!' ) }&status=success&origin=${ encodeURIComponent( req.query.origin ) }` );

        } catch ( error ) {
            winston.error( error.toString(), { process: process.pid });
            res.redirect( `${ redirectURL }?message=${ encodeURIComponent( error.message ) }&status=error&origin=${ encodeURIComponent( req.query.origin ) }` );
        };
    }

	/**
	 * Resends the activation link to the user
	 */
    private async resendActivation( req: express.Request, res: express.Response ) {
        try {
            const origin = encodeURIComponent( req.headers[ 'origin' ] || req.headers[ 'referer' ] );

            await UserManager.get.resendActivation( req.params.user, origin );
            okJson<def.IResponse>( { error: false, message: 'An activation link has been sent, please check your email for further instructions' }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

    /**
	 * Resends the activation link to the user
	 */
    private async requestPasswordReset( req: express.Request, res: express.Response ) {
        try {
            const origin = encodeURIComponent( req.headers[ 'origin' ] || req.headers[ 'referer' ] );

            await UserManager.get.requestPasswordReset( req.params.user, origin );

            okJson<def.IResponse>( { error: false, message: 'Instructions have been sent to your email on how to change your password' }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

    /**
	 * resets the password if the user has a valid password token
	 */
    private async passwordReset( req: express.Request, res: express.Response ) {
        try {
            if ( !req.body )
                throw new Error( 'Expecting body content and found none' );
            if ( !req.body.user )
                throw new Error( 'Please specify a user' );
            if ( !req.body.key )
                throw new Error( 'Please specify a key' );
            if ( !req.body.password )
                throw new Error( 'Please specify a password' );

            // Check the user's activation and forward them onto the admin message page
            await UserManager.get.resetPassword( req.body.user, req.body.key, req.body.password );

            okJson<def.IResponse>( { error: false, message: 'Your password has been reset' }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

	/**
	 * Approves a user's activation code so they can login without email validation
	 */
    private async approveActivation( req: express.Request, res: express.Response ) {
        try {
            await UserManager.get.approveActivation( req.params.user );
            okJson<def.IResponse>( { error: false, message: 'Activation code has been approved' }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

	/**
	 * Attempts to log the user in. Expects the username, password and rememberMe parameters be set.
	 */
    private async login( req: express.Request, res: express.Response ) {
        try {
            const token: def.ILoginToken = req.body;
            const user = await UserManager.get.logIn( token.username, token.password, token.rememberMe, req, res );

            okJson<def.IAuthenticationResponse>( {
                message: ( user ? 'User is authenticated' : 'User is not authenticated' ),
                authenticated: ( user ? true : false ),
                user: ( user ? user.generateCleanedData( Boolean( req.query.verbose ) ) : {}),
                error: false
            }, res );

        } catch ( err ) {

            okJson<def.IAuthenticationResponse>( {
                message: err.message,
                authenticated: false,
                error: true
            }, res );
        };
    }

	/**
	 * Attempts to log the user out
	 */
    private async logout( req: express.Request, res: express.Response ) {
        try {
            await UserManager.get.logOut( req, res );
            okJson<def.IResponse>( { error: false, message: 'Successfully logged out' }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

    /**
	 * Attempts to send the webmaster an email message
	 */
    async messageWebmaster( req: express.Request, res: express.Response ) {
        try {
            const token: any = req.body;

            if ( !token.message )
                throw new Error( 'Please specify a message to send' );

            await UserManager.get.sendAdminEmail( token.message, token.name, token.from );
            okJson<def.IResponse>( { error: false, message: 'Your message has been sent to the support team' }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

	/**
	 * Attempts to register a new user
	 */
    private async register( req: express.Request, res: express.Response ) {
        try {
            const token: def.IRegisterToken = req.body;
            const user = await UserManager.get.register( token.username!, token.password!, token.email!, token.captcha!, {}, req );

            return okJson<def.IAuthenticationResponse>( {
                message: ( user ? 'Please activate your account with the link sent to your email address' : 'User is not authenticated' ),
                authenticated: ( user ? true : false ),
                user: ( user ? user.generateCleanedData( Boolean( req.query.verbose ) ) : {}),
                error: false
            }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

    /**
 	 * Sets a user's meta data
	 */
    private async setData( req: def.AuthRequest, res: express.Response ) {
        const user = req._user!.dbEntry;
        let val = req.body && req.body.value;
        if ( !val )
            val = {};

        try {
            await UserManager.get.setMeta( user, val );
            okJson<def.IResponse>( { message: `User's data has been updated`, error: false }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

    /**
	 * Sets a user's meta value
	 */
    private async setVal( req: def.AuthRequest, res: express.Response ) {
        const user = req._user!.dbEntry;
        const name = req.params.name;

        try {
            await UserManager.get.setMetaVal( user, name, req.body.value );
            okJson<def.IResponse>( { message: `Value '${ name }' has been updated`, error: false }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

    /**
	 * Gets a user's meta value
	 */
    private async getVal( req: def.AuthRequest, res: express.Response ) {
        const user = req._user!.dbEntry;
        const name = req.params.name;

        try {
            const val = await UserManager.get.getMetaVal( user, name );
            okJson<any>( val, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

    /**
	 * Gets a user's meta data
	 */
    private async getData( req: def.AuthRequest, res: express.Response ) {
        const user = req._user!.dbEntry;

        try {
            const val = await UserManager.get.getMetaData( user );
            okJson<any>( val, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

	/**
	 * Removes a user from the database
	 */
    private async removeUser( req: def.AuthRequest, res: express.Response ) {
        try {
            const toRemove = req.params.user;
            if ( !toRemove )
                throw new Error( 'No user found' );

            await UserManager.get.removeUser( toRemove );

            return okJson<def.IResponse>( { message: `User ${ toRemove } has been removed`, error: false }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

	/**
	 * Allows an admin to create a new user without registration
	 */
    private async createUser( req: express.Request, res: express.Response ) {
        try {
            const token: def.IRegisterToken = req.body;

            // Set default privileges
            token.privileges = token.privileges ? token.privileges : UserPrivileges.Regular;

            // Not allowed to create super users
            if ( token.privileges === UserPrivileges.SuperAdmin )
                throw new Error( 'You cannot create a user with super admin permissions' );

            const user = await UserManager.get.createUser( token.username!, token.email, token.password, ( this._config.ssl ? 'https://' : 'http://' ) + this._config.host, token.privileges, token.meta );
            okJson<def.IGetUser>( {
                error: false,
                message: `User ${ user.dbEntry.username } has been created`,
                data: user.dbEntry
            }, res );

        } catch ( err ) {
            return errJson( err, res );
        };
    }

	/**
	 * Checks to see if the current session is logged in. If the user is, it will be returned redacted. You can specify the 'verbose' query parameter
	 */
    private async authenticated( req: express.Request, res: express.Response ) {
        try {
            const user = await UserManager.get.loggedIn( req, res );
            return okJson<def.IAuthenticationResponse>( {
                message: ( user ? 'User is authenticated' : 'User is not authenticated' ),
                authenticated: ( user ? true : false ),
                error: false,
                user: ( user ? user.generateCleanedData( Boolean( req.query.verbose ) ) : {})
            }, res );

        } catch ( error ) {
            return okJson<def.IAuthenticationResponse>( {
                message: error.message,
                authenticated: false,
                error: true
            }, res );
        };
    }
}