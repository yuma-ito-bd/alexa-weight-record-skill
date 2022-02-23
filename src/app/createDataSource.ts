import { google, fitness_v1, Auth } from 'googleapis';

import { getOAuth2ClientForLocal } from './authentication/getOAuth2ClientForLocal';

export class CreateDataSource {
    constructor(private oauth2Client: Auth.OAuth2Client) {}

    public async exec() {
        const fitnessApi: fitness_v1.Fitness = google.fitness({
            version: 'v1',
            auth: this.oauth2Client,
        });

        const newDataSource: fitness_v1.Params$Resource$Users$Datasources$Create =
            {
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
        const { data } = await fitnessApi.users.dataSources.create(
            newDataSource
        );
        return data;
    }
}

getOAuth2ClientForLocal().then((client) => {
    new CreateDataSource(client)
        .exec()
        .then((data) => {
            console.log(JSON.stringify(data));
        })
        .catch((e) => {
            console.error(e);
        });
});
