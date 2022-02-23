import { google } from 'googleapis';

import { getOAuth2ClientForLocal } from './authentication/getOAuth2ClientForLocal';

export async function getUserName() {
    const oauth2Client = await getOAuth2ClientForLocal();

    const peopleApi = google.people({ version: 'v1', auth: oauth2Client });
    const { data: name } = await peopleApi.people.get({
        resourceName: 'people/me',
        personFields: 'names',
    });

    return name;
}

getUserName().then((data) => {
    console.log(JSON.stringify(data));
});
