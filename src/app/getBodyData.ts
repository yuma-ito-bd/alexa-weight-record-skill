import { google, fitness_v1, Auth } from 'googleapis';

import { getOAuth2ClientForLocal } from './authentication/getOAuth2ClientForLocal';
import { NanoSecConverter } from '../libs/NanoSecConverter';

export class GetBodyData {
    constructor(private oauth2Client: Auth.OAuth2Client) {}

    public async exec() {
        const fitnessApi: fitness_v1.Fitness = google.fitness({
            version: 'v1',
            auth: this.oauth2Client,
        });

        const from = NanoSecConverter.parseMs(Date.parse('2022-02-01'));
        const to = NanoSecConverter.parseMs(Date.parse('2022-02-28'));

        const { data } = await fitnessApi.users.dataSources.datasets.get({
            // 体重のデータソース
            dataSourceId:
                // 'raw:com.google.weight:com.google.android.apps.fitness:user_input',
                'derived:com.google.weight:com.google.android.gms:merge_weight',
            userId: 'me',
            datasetId: `${from}-${to}`,
        });

        return data;
    }
}

getOAuth2ClientForLocal().then((client) => {
    new GetBodyData(client).exec().then((data) => {
        const { point: points } = data;

        points?.forEach((point) => {
            const date = NanoSecConverter.toDate(Number(point.startTimeNanos));
            const weight = point.value?.[0].fpVal;
            const dataSource = point.originDataSourceId;
            console.log(
                `${date.toISOString()} - ${weight} kg (from: ${dataSource})`
            );
        });
    });
});
