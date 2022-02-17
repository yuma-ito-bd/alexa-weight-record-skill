/* eslint-disable @typescript-eslint/no-use-before-define */
import * as path from 'path';
import { Auth, google } from 'googleapis';
import * as fs from 'fs';
import * as fspromises from 'fs/promises';

export async function getOAuth2Client(): Promise<Auth.OAuth2Client> {
    const options = await getOAuth2ClientOptions();
    return new google.auth.OAuth2(options);
}

async function getOAuth2ClientOptions(): Promise<Auth.OAuth2ClientOptions> {
    const keyPath = path.join(__dirname, '../credentials/client_secret.json');
    if (!fs.existsSync(keyPath))
        throw new Error('not found the client secret file');

    const file = await fspromises.readFile(keyPath, 'utf-8');
    const { web } = JSON.parse(file) as ClientSecret;
    return {
        clientId: web.client_id,
        clientSecret: web.client_secret,
        redirectUri: web.redirect_uris[0],
    };
}

type ClientSecret = {
    web: {
        client_id: string;
        project_id: string;
        auth_uri: string;
        token_uri: string;
        auth_provider_x509_cert_url: string;
        client_secret: string;
        redirect_uris: string[];
    };
};
