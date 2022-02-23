import { getOAuth2ClientForLocal } from './app/authentication/getOAuth2ClientForLocal';
import { CreateDataSource } from './app/createDataSource';
import { GetBodyData } from './app/getBodyData';
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

// 体重データ登録
getOAuth2ClientForLocal().then((client) => {
    new RegisterBodyData(client)
        .exec(78.5, new Date())
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
