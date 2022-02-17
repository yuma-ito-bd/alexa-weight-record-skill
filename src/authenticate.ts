import http from 'http';
import url from 'url';
import open from 'open';
import destoryer from 'server-destroy';
import { getOAuth2Client } from './getOAuth2Client';
import { saveCredentails } from './saveCredentials';

export async function authenticate(scopes: string[]) {
    const oauth2Client = await getOAuth2Client();

    const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes.join(' '),
    });
    const server = http
        .createServer(async (req, res) => {
            const requestUrl = req.url;
            // oauth2によるcallback以外のリクエストは無視する
            if (!requestUrl?.includes('/oauth2callback')) return;

            res.end('Authentication successful! Please return to the console.');
            server.destroy();

            const qs = new url.URL(requestUrl, 'http://localhost:3000')
                .searchParams;
            const code = qs.get('code');
            if (code == null)
                throw new Error('Cannot get the authorization code');

            const { tokens } = await oauth2Client.getToken(code);
            saveCredentails(tokens);
        })
        .listen(3000, () => {
            console.log('server listen start.');
            open(authorizeUrl, { wait: false }).then((cp) => cp.unref());
        });
    destoryer(server);
}
