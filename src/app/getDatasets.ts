import { Auth, fitness_v1, google } from 'googleapis';
import { NanoSecConverter } from '../libs/NanoSecConverter';

export class GetDatasets {
    constructor(
        private oauth2Client: Auth.OAuth2Client,
        private dataSourceId: string
    ) {}

    public async exec(from: Date, to: Date) {
        const fitnessApi: fitness_v1.Fitness = google.fitness({
            version: 'v1',
            auth: this.oauth2Client,
        });

        const fromNs = NanoSecConverter.toUnixNs(from);
        const toNs = NanoSecConverter.toUnixNs(to);

        const { data } = await fitnessApi.users.dataSources.datasets.get({
            dataSourceId: this.dataSourceId,
            userId: 'me',
            datasetId: `${fromNs}-${toNs}`,
        });

        return data;
    }
}
