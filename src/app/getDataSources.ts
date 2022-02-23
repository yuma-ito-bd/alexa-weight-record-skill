import { Auth, fitness_v1, google } from 'googleapis';

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
