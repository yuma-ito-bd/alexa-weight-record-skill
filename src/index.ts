import {
    ErrorHandler,
    HandlerInput,
    RequestHandler,
    SkillBuilders,
} from 'ask-sdk-core';
import { Response, SessionEndedRequest } from 'ask-sdk-model';

const launchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText =
            'Welcome to the Alexa Skills Kit, you can say hello!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};

const helloWorldIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return (
            handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name ===
                'HelloWorldIntent'
        );
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};

const helpIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return (
            handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name ===
                'AMAZON.HelpIntent'
        );
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'You can say hello to me!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};

const cancelAndStopIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return (
            handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name ===
                'AMAZON.CancelIntent' ||
                handlerInput.requestEnvelope.request.intent.name ===
                    'AMAZON.StopIntent')
        );
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};

const sessionEndedRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return (
            handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'
        );
    },
    handle(handlerInput: HandlerInput): Response {
        console.log(
            `Session ended with reason: ${
                (handlerInput.requestEnvelope.request as SessionEndedRequest)
                    .reason
            }`
        );

        return handlerInput.responseBuilder.getResponse();
    },
};

const errorHandler: ErrorHandler = {
    canHandle(): boolean {
        return true;
    },
    handle(handlerInput: HandlerInput, error: Error): Response {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak("Sorry, I can't understand the command. Please say again.")
            .reprompt(
                "Sorry, I can't understand the command. Please say again."
            )
            .getResponse();
    },
};

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
