import { google, fitness_v1 } from 'googleapis';

import { getOAuth2ClientForLocal } from './authentication/getOAuth2ClientForLocal';

export async function getDataSources() {
    const oauth2Client = await getOAuth2ClientForLocal();

    const fitnessApi: fitness_v1.Fitness = google.fitness({
        version: 'v1',
        auth: oauth2Client,
    });
    const { data } = await fitnessApi.users.dataSources.list({
        userId: 'me',
    });
    return data;
}

getDataSources().then((data) => {
    console.log(JSON.stringify(data));
});
