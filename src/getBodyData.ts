import { google, fitness_v1 } from 'googleapis';

import { getOAuth2ClientForLocal } from './getOAuth2ClientForLocal';

export async function getBodyData() {
    const oauth2Client = await getOAuth2ClientForLocal();

    const peopleApi = google.people({ version: 'v1', auth: oauth2Client });
    const { data: name } = await peopleApi.people.get({
        resourceName: 'people/me',
        personFields: 'names',
    });
    console.log(name.names);

    const fitnessApi: fitness_v1.Fitness = google.fitness({
        version: 'v1',
        auth: oauth2Client,
    });
    const { data } = await fitnessApi.users.dataSources.list({
        userId: 'me',
    });

    const { dataSource } = data;

    // await fitnessApi.users.dataset

    // const peopleApi = google.people({ version: 'v1', auth: oauth2Client });
    // const { data } = await peopleApi.people.get({
    //     resourceName: 'people/me',
    //     personFields: 'names',
    // });

    return dataSource;
}

getBodyData().then((data) => {
    console.log(JSON.stringify(data));
});
