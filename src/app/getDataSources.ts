import { google, fitness_v1, Auth } from 'googleapis';

import { getOAuth2ClientForLocal } from './authentication/getOAuth2ClientForLocal';

export class GetDataSources {
    constructor(private oauth2Client: Auth.OAuth2Client) {}

    public async getDataSources() {
        const fitnessApi: fitness_v1.Fitness = google.fitness({
            version: 'v1',
            auth: this.oauth2Client,
        });
        const { data } = await fitnessApi.users.dataSources.list({
            userId: 'me',
        });
        return data;
    }
}

getOAuth2ClientForLocal().then((client) => {
    new GetDataSources(client).getDataSources().then((data) => {
        console.log(JSON.stringify(data));
    });
});
