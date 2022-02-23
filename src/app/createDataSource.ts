import { google, fitness_v1 } from 'googleapis';

import { getOAuth2ClientForLocal } from './authentication/getOAuth2ClientForLocal';

export async function createDataSource() {
    const oauth2Client = await getOAuth2ClientForLocal();

    const fitnessApi: fitness_v1.Fitness = google.fitness({
        version: 'v1',
        auth: oauth2Client,
    });

    const newDataSource: fitness_v1.Params$Resource$Users$Datasources$Create = {
        userId: 'me',
        requestBody: {
            application: {
                name: 'Sample Data Source',
            },
            dataType: {
                field: [
                    {
                        name: 'weight',
                        format: 'floatPoint',
                    },
                ],
                name: 'com.google.weight',
            },
            type: 'raw',
        },
    };
    const { data } = await fitnessApi.users.dataSources.create(newDataSource);
    return data;
}

createDataSource()
    .then((data) => {
        console.log(JSON.stringify(data));
    })
    .catch((e) => {
        console.error(e);
    });
