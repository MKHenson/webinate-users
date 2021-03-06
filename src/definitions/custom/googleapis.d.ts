declare module 'googleapis' {
    export interface GMail {
        users: {

            /**
             * gmail.users.getProfile
             *
             * @desc Gets the current user's Gmail profile.
             *
             * @alias gmail.users.getProfile
             * @memberOf! gmail(v1)
             *
             * @param  {object} params - Parameters for request
             * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
             * @param  {callback} callback - The callback that handles the response.
             * @return {object} Request object
             */
            getProfile( params, callback );

            /**
             * gmail.users.stop
             *
             * @desc Stop receiving push notifications for the given user mailbox.
             *
             * @alias gmail.users.stop
             * @memberOf! gmail(v1)
             *
             * @param  {object} params - Parameters for request
             * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
             * @param  {callback} callback - The callback that handles the response.
             * @return {object} Request object
             */
            stop( params, callback );

            /**
             * gmail.users.watch
             *
             * @desc Set up or update a push notification watch on the given user mailbox.
             *
             * @alias gmail.users.watch
             * @memberOf! gmail(v1)
             *
             * @param  {object} params - Parameters for request
             * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
             * @param  {object} params.resource - Request body data
             * @param  {callback} callback - The callback that handles the response.
             * @return {object} Request object
             */
            watch( params, callback );

            drafts:
            {
                /**
                 * gmail.users.drafts.create
                 *
                 * @desc Creates a new draft with the DRAFT label.
                 *
                 * @alias gmail.users.drafts.create
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {object} params.resource - Media resource metadata
                 * @param  {object} params.media - Media object
                 * @param  {string} params.media.mimeType - Media mime-type
                 * @param  {string|object} params.media.body - Media body contents
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                create( params, callback );

                /**
                 * gmail.users.drafts.delete
                 *
                 * @desc Immediately and permanently deletes the specified draft. Does not simply trash it.
                 *
                 * @alias gmail.users.drafts.delete
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - The ID of the draft to delete.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                delete( params, callback );

                /**
                 * gmail.users.drafts.get
                 *
                 * @desc Gets the specified draft.
                 *
                 * @alias gmail.users.drafts.get
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string=} params.format - The format to return the draft in.
                 * @param  {string} params.id - The ID of the draft to retrieve.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                get( params, callback );

                /**
                 * gmail.users.drafts.list
                 *
                 * @desc Lists the drafts in the user's mailbox.
                 *
                 * @alias gmail.users.drafts.list
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {integer=} params.maxResults - Maximum number of drafts to return.
                 * @param  {string=} params.pageToken - Page token to retrieve a specific page of results in the list.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                list( params, callback );

                /**
                 * gmail.users.drafts.send
                 *
                 * @desc Sends the specified, existing draft to the recipients in the To, Cc, and Bcc headers.
                 *
                 * @alias gmail.users.drafts.send
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {object} params.resource - Media resource metadata
                 * @param  {object} params.media - Media object
                 * @param  {string} params.media.mimeType - Media mime-type
                 * @param  {string|object} params.media.body - Media body contents
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                send( params, callback );

                /**
                 * gmail.users.drafts.update
                 *
                 * @desc Replaces a draft's content.
                 *
                 * @alias gmail.users.drafts.update
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - The ID of the draft to update.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {object} params.resource - Media resource metadata
                 * @param  {object} params.media - Media object
                 * @param  {string} params.media.mimeType - Media mime-type
                 * @param  {string|object} params.media.body - Media body contents
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                update( params, callback );
            }

            history:
            {

                /**
                 * gmail.users.history.list
                 *
                 * @desc Lists the history of all changes to the given mailbox. History results are returned in chronological order (increasing historyId).
                 *
                 * @alias gmail.users.history.list
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string=} params.labelId - Only return messages with a label matching the ID.
                 * @param  {integer=} params.maxResults - The maximum number of history records to return.
                 * @param  {string=} params.pageToken - Page token to retrieve a specific page of results in the list.
                 * @param  {string=} params.startHistoryId - Required. Returns history records after the specified startHistoryId.
                 * The supplied startHistoryId should be obtained from the historyId of a message, thread, or previous list response.
                 * History IDs increase chronologically but are not contiguous with random gaps in between valid IDs. Supplying an invalid or out of date startHistoryId
                 * typically returns an HTTP 404 error code. A historyId is typically valid for at least a week, but in some rare circumstances may be valid for only a few hours.
                 * If you receive an HTTP 404 error response, your application should perform a full sync. If you receive no nextPageToken in the response,
                 * there are no updates to retrieve and you can store the returned historyId for a future request.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                list( params, callback );
            }

            labels:
            {

                /**
                 * gmail.users.labels.create
                 *
                 * @desc Creates a new label.
                 *
                 * @alias gmail.users.labels.create
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {object} params.resource - Request body data
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                create( params, callback );

                /**
                 * gmail.users.labels.delete
                 *
                 * @desc Immediately and permanently deletes the specified label and removes it from any messages and threads that it is applied to.
                 *
                 * @alias gmail.users.labels.delete
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - The ID of the label to delete.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                delete( params, callback );

                /**
                 * gmail.users.labels.get
                 *
                 * @desc Gets the specified label.
                 *
                 * @alias gmail.users.labels.get
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - The ID of the label to retrieve.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                get( params, callback );

                /**
                 * gmail.users.labels.list
                 *
                 * @desc Lists all labels in the user's mailbox.
                 *
                 * @alias gmail.users.labels.list
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                list( params, callback );

                /**
                 * gmail.users.labels.patch
                 *
                 * @desc Updates the specified label. This method supports patch semantics.
                 *
                 * @alias gmail.users.labels.patch
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - The ID of the label to update.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {object} params.resource - Request body data
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                patch( params, callback );

                /**
                 * gmail.users.labels.update
                 *
                 * @desc Updates the specified label.
                 *
                 * @alias gmail.users.labels.update
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - The ID of the label to update.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {object} params.resource - Request body data
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                update( params, callback );
            }

            messages:
            {

                /**
                 * gmail.users.messages.delete
                 *
                 * @desc Immediately and permanently deletes the specified message. This operation cannot be undone. Prefer messages.trash instead.
                 *
                 * @alias gmail.users.messages.delete
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - The ID of the message to delete.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                delete( params, callback );

                /**
                 * gmail.users.messages.get
                 *
                 * @desc Gets the specified message.
                 *
                 * @alias gmail.users.messages.get
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string=} params.format - The format to return the message in.
                 * @param  {string} params.id - The ID of the message to retrieve.
                 * @param  {string=} params.metadataHeaders - When given and format is METADATA, only include headers specified.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                get( params, callback );

                /**
                 * gmail.users.messages.import
                 *
                 * @desc Imports a message into only this user's mailbox, with standard email delivery scanning and classification similar to receiving via SMTP. Does not send a message.
                 *
                 * @alias gmail.users.messages.import
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {boolean=} params.deleted - Mark the email as permanently deleted (not TRASH) and only visible in Google Apps Vault to a Vault administrator. Only used for Google Apps for Work accounts.
                 * @param  {string=} params.internalDateSource - Source for Gmail's internal date of the message.
                 * @param  {boolean=} params.neverMarkSpam - Ignore the Gmail spam classifier decision and never mark this email as SPAM in the mailbox.
                 * @param  {boolean=} params.processForCalendar - Process calendar invites in the email and add any extracted meetings to the Google Calendar for this user.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {object} params.resource - Media resource metadata
                 * @param  {object} params.media - Media object
                 * @param  {string} params.media.mimeType - Media mime-type
                 * @param  {string|object} params.media.body - Media body contents
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                import( params, callback );

                /**
                 * gmail.users.messages.insert
                 *
                 * @desc Directly inserts a message into only this user's mailbox similar to IMAP APPEND, bypassing most scanning and classification. Does not send a message.
                 *
                 * @alias gmail.users.messages.insert
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {boolean=} params.deleted - Mark the email as permanently deleted (not TRASH) and only visible in Google Apps Vault to a Vault administrator. Only used for Google Apps for Work accounts.
                 * @param  {string=} params.internalDateSource - Source for Gmail's internal date of the message.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {object} params.resource - Media resource metadata
                 * @param  {object} params.media - Media object
                 * @param  {string} params.media.mimeType - Media mime-type
                 * @param  {string|object} params.media.body - Media body contents
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                insert( params, callback );

                /**
                 * gmail.users.messages.list
                 *
                 * @desc Lists the messages in the user's mailbox.
                 *
                 * @alias gmail.users.messages.list
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {boolean=} params.includeSpamTrash - Include messages from SPAM and TRASH in the results.
                 * @param  {string=} params.labelIds - Only return messages with labels that match all of the specified label IDs.
                 * @param  {integer=} params.maxResults - Maximum number of messages to return.
                 * @param  {string=} params.pageToken - Page token to retrieve a specific page of results in the list.
                 * @param  {string=} params.q - Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, "from:someuser@example.com rfc822msgid: is:unread".
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                list( params, callback );

                /**
                 * gmail.users.messages.modify
                 *
                 * @desc Modifies the labels on the specified message.
                 *
                 * @alias gmail.users.messages.modify
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - The ID of the message to modify.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {object} params.resource - Request body data
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                modify( params, callback );

                /**
                 * gmail.users.messages.send
                 *
                 * @desc Sends the specified message to the recipients in the To, Cc, and Bcc headers.
                 *
                 * @alias gmail.users.messages.send
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {object} params.resource - Media resource metadata
                 * @param  {object} params.media - Media object
                 * @param  {string} params.media.mimeType - Media mime-type
                 * @param  {string|object} params.media.body - Media body contents
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                send( params, callback );

                /**
                 * gmail.users.messages.trash
                 *
                 * @desc Moves the specified message to the trash.
                 *
                 * @alias gmail.users.messages.trash
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - The ID of the message to Trash.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                trash( params, callback );

                /**
                 * gmail.users.messages.untrash
                 *
                 * @desc Removes the specified message from the trash.
                 *
                 * @alias gmail.users.messages.untrash
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - The ID of the message to remove from Trash.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                untrash( params, callback );


                attachments:
                {

                    /**
                     * gmail.users.messages.attachments.get
                     *
                     * @desc Gets the specified message attachment.
                     *
                     * @alias gmail.users.messages.attachments.get
                     * @memberOf! gmail(v1)
                     *
                     * @param  {object} params - Parameters for request
                     * @param  {string} params.id - The ID of the attachment.
                     * @param  {string} params.messageId - The ID of the message containing the attachment.
                     * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                     * @param  {callback} callback - The callback that handles the response.
                     * @return {object} Request object
                     */
                    get( params, callback );
                }
            }

            threads:
            {

                /**
                 * gmail.users.threads.delete
                 *
                 * @desc Immediately and permanently deletes the specified thread. This operation cannot be undone. Prefer threads.trash instead.
                 *
                 * @alias gmail.users.threads.delete
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - ID of the Thread to delete.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                delete( params, callback );

                /**
                 * gmail.users.threads.get
                 *
                 * @desc Gets the specified thread.
                 *
                 * @alias gmail.users.threads.get
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string=} params.format - The format to return the messages in.
                 * @param  {string} params.id - The ID of the thread to retrieve.
                 * @param  {string=} params.metadataHeaders - When given and format is METADATA, only include headers specified.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                get( params, callback );

                /**
                 * gmail.users.threads.list
                 *
                 * @desc Lists the threads in the user's mailbox.
                 *
                 * @alias gmail.users.threads.list
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {boolean=} params.includeSpamTrash - Include threads from SPAM and TRASH in the results.
                 * @param  {string=} params.labelIds - Only return threads with labels that match all of the specified label IDs.
                 * @param  {integer=} params.maxResults - Maximum number of threads to return.
                 * @param  {string=} params.pageToken - Page token to retrieve a specific page of results in the list.
                 * @param  {string=} params.q - Only return threads matching the specified query. Supports the same query format as the Gmail search box. For example, "from:someuser@example.com rfc822msgid: is:unread".
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                list( params, callback );

                /**
                 * gmail.users.threads.modify
                 *
                 * @desc Modifies the labels applied to the thread. This applies to all messages in the thread.
                 *
                 * @alias gmail.users.threads.modify
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - The ID of the thread to modify.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {object} params.resource - Request body data
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                modify( params, callback );

                /**
                 * gmail.users.threads.trash
                 *
                 * @desc Moves the specified thread to the trash.
                 *
                 * @alias gmail.users.threads.trash
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - The ID of the thread to Trash.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                trash( params, callback );

                /**
                 * gmail.users.threads.untrash
                 *
                 * @desc Removes the specified thread from the trash.
                 *
                 * @alias gmail.users.threads.untrash
                 * @memberOf! gmail(v1)
                 *
                 * @param  {object} params - Parameters for request
                 * @param  {string} params.id - The ID of the thread to remove from Trash.
                 * @param  {string} params.userId - The user's email address. The special value me can be used to indicate the authenticated user.
                 * @param  {callback} callback - The callback that handles the response.
                 * @return {object} Request object
                 */
                untrash( params, callback );
            }
        };
    }

    export function gmail( version ): GMail;
}