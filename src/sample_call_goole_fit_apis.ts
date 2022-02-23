import { getOAuth2ClientForLocal } from './app/authentication/getOAuth2ClientForLocal';
import { CreateDataSource } from './app/createDataSource';
import { GetDatasets } from './app/getDatasets';
import { GetDataSources } from './app/getDataSources';
import { GetUserName } from './app/getUserName';
import { RegisterBodyData } from './app/registerBodyData';
import { NanoSecConverter } from './libs/NanoSecConverter';

// 名前取得
getOAuth2ClientForLocal().then((client) => {
    new GetUserName(client).exec().then((data) => {
        console.log(JSON.stringify(data));
    });
});

// 体重データ取得
getOAuth2ClientForLocal().then((client) => {
    const from = new Date('2022-02-01');
    const to = new Date('2022-02-28');
    const dataSourceId =
        'derived:com.google.weight:com.google.android.gms:merge_weight';

    new GetDatasets(client, dataSourceId).exec(from, to).then((data) => {
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

// 体重データ登録
getOAuth2ClientForLocal().then((client) => {
    const weight = 78.5;
    const registerTime = new Date();

    const dataSourceId = process.env.DATA_SOURCE_ID;
    if (dataSourceId == null) throw new Error('DATA_SOURCE_ID is not set ');

    new RegisterBodyData(client, dataSourceId)
        .exec(weight, registerTime)
        .then((data) => {
            console.log(JSON.stringify(data));
        })
        .catch((e) => {
            console.error(e);
        });
});

// データソース取得
getOAuth2ClientForLocal().then((client) => {
    new GetDataSources(client).getDataSources().then((data) => {
        console.log(JSON.stringify(data));
    });
});

// データソース作成
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
