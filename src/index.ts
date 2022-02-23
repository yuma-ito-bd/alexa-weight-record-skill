import { SkillBuilders } from 'ask-sdk-core';
import {
    cancelAndStopIntentHandler,
    errorHandler,
    helloWorldIntentHandler,
    helpIntentHandler,
    launchRequestHandler,
    sessionEndedRequestHandler,
} from './app/alexaHanders';

const handler = SkillBuilders.custom()
    .addRequestHandlers(
        launchRequestHandler,
        helloWorldIntentHandler,
        helpIntentHandler,
        cancelAndStopIntentHandler,
        sessionEndedRequestHandler
    )
    .addErrorHandlers(errorHandler)
    .lambda();

export { handler };
