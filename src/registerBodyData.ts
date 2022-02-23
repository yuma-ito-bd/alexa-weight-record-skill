import { google, fitness_v1 } from 'googleapis';

import { getOAuth2ClientForLocal } from './getOAuth2ClientForLocal';
import { NanoSecConverter } from './libs/NanoSecConverter';

export async function registerBodyData(weight: number, time: Date) {
    const oauth2Client = await getOAuth2ClientForLocal();

    const fitnessApi: fitness_v1.Fitness = google.fitness({
        version: 'v1',
        auth: oauth2Client,
    });

    const timeNs = NanoSecConverter.toUnixNs(time);
    const dataSourceId = 'raw:com.google.weight:645092788289';
    const newDataSets: fitness_v1.Schema$Dataset = {
        dataSourceId,
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
            dataSourceId,
            datasetId: `${timeNs}-${timeNs}`,
            requestBody: newDataSets,
        };

    const { data } = await fitnessApi.users.dataSources.datasets.patch(
        requestParams
    );

    return data;
}

registerBodyData(75.5, new Date())
    .then((data) => {
        console.log(JSON.stringify(data));
    })
    .catch((e) => {
        console.error(e);
    });
