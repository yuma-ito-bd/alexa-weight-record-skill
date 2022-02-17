import { Auth } from 'googleapis';
import * as fspromises from 'fs/promises';
import path from 'path';

export async function saveCredentails(credentials: Auth.Credentials) {
    const filePath = path.join(
        __dirname,
        '../credentials/google-api-credentials.json'
    );
    const data = JSON.stringify(credentials);
    await fspromises.writeFile(filePath, data);
    console.log(`Credentails file is saved at ${filePath}`);
}
