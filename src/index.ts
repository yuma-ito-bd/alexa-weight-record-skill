import { SkillBuilders } from 'ask-sdk-core';
import {
    cancelAndStopIntentHandler,
    errorHandler,
    helpIntentHandler,
    launchRequestHandler,
    registerIntentHandler,
    sessionEndedRequestHandler,
} from './app/alexaHanders';

const handler = SkillBuilders.custom()
    .addRequestHandlers(
        launchRequestHandler,
        registerIntentHandler,
        helpIntentHandler,
        cancelAndStopIntentHandler,
        sessionEndedRequestHandler
    )
    .addErrorHandlers(errorHandler)
    .lambda();

export { handler };
