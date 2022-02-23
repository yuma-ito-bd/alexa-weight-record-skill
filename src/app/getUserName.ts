import { Auth, google } from 'googleapis';

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
