import { authenticate } from './authenticate';

const scopes = [
    'profile',
    'https://www.googleapis.com/auth/fitness.body.read',
    'https://www.googleapis.com/auth/fitness.body.write',
];

authenticate(scopes).then(() => {
    console.log('finish');
});
