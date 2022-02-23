import { Auth, fitness_v1, google } from 'googleapis';
import { NanoSecConverter } from '../libs/NanoSecConverter';

export class RegisterBodyData {
    constructor(
        private oauth2Client: Auth.OAuth2Client,
        private dataSourceId: string
    ) {}

    public async exec(weight: number, time: Date) {
        const fitnessApi: fitness_v1.Fitness = google.fitness({
            version: 'v1',
            auth: this.oauth2Client,
        });

        const timeNs = NanoSecConverter.toUnixNs(time);
        const newDataSets: fitness_v1.Schema$Dataset = {
            dataSourceId: this.dataSourceId,
            maxEndTimeNs: String(timeNs),
            minStartTimeNs: String(timeNs),
            point: [
                {
                    startTimeNanos: String(timeNs),
                    endTimeNanos: String(timeNs),
                    dataTypeName: 'com.google.weight',
                    value: [{ fpVal: weight }],
                },
            ],
        };
        const requestParams: fitness_v1.Params$Resource$Users$Datasources$Datasets$Patch =
            {
                userId: 'me',
                dataSourceId: this.dataSourceId,
                datasetId: `${timeNs}-${timeNs}`,
                requestBody: newDataSets,
            };

        const { data } = await fitnessApi.users.dataSources.datasets.patch(
            requestParams
        );

        return data;
    }
}
