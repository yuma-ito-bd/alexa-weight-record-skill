import { google, fitness_v1 } from 'googleapis';

import { getOAuth2ClientForLocal } from './getOAuth2ClientForLocal';

export async function getBodyData() {
    const oauth2Client = await getOAuth2ClientForLocal();

    const fitnessApi: fitness_v1.Fitness = google.fitness({
        version: 'v1',
        auth: oauth2Client,
    });

    const from = Date.parse('2022-02-01') * 1e6; // ミリ秒→ナノ秒に変換(10^6倍する)
    const to = Date.parse('2022-02-28') * 1e6;

    const { data } = await fitnessApi.users.dataSources.datasets.get({
        // 体重のデータソース
        dataSourceId:
            'raw:com.google.weight:com.google.android.apps.fitness:user_input',
        userId: 'me',
        datasetId: `${from}-${to}`,
    });

    return data;
}

getBodyData().then((data) => {
    console.log(JSON.stringify(data));
});
