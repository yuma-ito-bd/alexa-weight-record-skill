/* eslint-disable @typescript-eslint/no-use-before-define */
import { Auth, google } from 'googleapis';

export function getOAuth2ClientForLambda(): Auth.OAuth2Client {
    const options = getOAuth2ClientOptions();
    const oauth2Client = new google.auth.OAuth2(options);
    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
    });
    return oauth2Client;
}

function getOAuth2ClientOptions(): Auth.OAuth2ClientOptions {
    return {
        clientId: process.env.OAUTH2_CLIENT_ID,
        clientSecret: process.env.OAUTH2_CLIENT_SECRET,
        redirectUri: process.env.OAUTH2_REDIRECT_URIS,
    };
}
