import { ErrorHandler, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, SessionEndedRequest } from 'ask-sdk-model';

export const launchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText =
            '体重記録アプリ「たいれこ」にようこそ。今日の体重を教えてちょ。';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('ようこそ！', speechText)
            .getResponse();
    },
};

export const registerIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        const { request } = handlerInput.requestEnvelope;
        return (
            request.type === 'IntentRequest' &&
            request.intent.name === 'RegisterIntent'
        );
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
        // TODO 体重の数値を取り出して登録する

        const speechText = '体重を記録しました。';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};

export const helpIntentHandler: RequestHandler = {
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

export const cancelAndStopIntentHandler: RequestHandler = {
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

export const sessionEndedRequestHandler: RequestHandler = {
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

export const errorHandler: ErrorHandler = {
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
