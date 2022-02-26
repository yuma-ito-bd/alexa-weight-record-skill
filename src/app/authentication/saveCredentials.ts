import * as fspromises from 'fs/promises';
import { Auth } from 'googleapis';
import { cwd } from 'process';

export async function saveCredentails(credentials: Auth.Credentials) {
    const filePath = `${cwd()}/credentials/google-api-credentials.json`;
    const data = JSON.stringify(credentials);
    await fspromises.writeFile(filePath, data);
    console.log(`Credentails file is saved at ${filePath}`);
}
