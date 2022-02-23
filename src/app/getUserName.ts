import { Auth, google } from 'googleapis';

import { getOAuth2ClientForLocal } from './authentication/getOAuth2ClientForLocal';

export class GetUserName {
    constructor(private oauth2Client: Auth.OAuth2Client) {}

    public async exec() {
        const peopleApi = google.people({
            version: 'v1',
            auth: this.oauth2Client,
        });
        const { data: name } = await peopleApi.people.get({
            resourceName: 'people/me',
            personFields: 'names',
        });

        return name;
    }
}

getOAuth2ClientForLocal().then((client) => {
    new GetUserName(client).exec().then((data) => {
        console.log(JSON.stringify(data));
    });
});
