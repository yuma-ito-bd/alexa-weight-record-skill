import { ErrorHandler, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { IntentRequest, Response, SessionEndedRequest } from 'ask-sdk-model';
import { getOAuth2ClientForLambda } from './authentication/getOAuth2ClientForLambda';
import { RegisterBodyData } from './registerBodyData';

export const launchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText =
            '体重記録アプリ「たいレコ」にようこそ。今日の体重を教えてね。';

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
        // 体重の数値を取り出して登録する
        const weight = (handlerInput.requestEnvelope.request as IntentRequest)
            .intent.slots?.weight?.value;

        if (weight == null) {
            const speakText =
                'すみません。体重を聞き取れませんでした。もう一度教えてください。';
            return handlerInput.responseBuilder
                .speak(speakText)
                .reprompt(speakText)
                .withSimpleCard('エラー', speakText)
                .getResponse();
        }

        const dataSourceId = process.env.DATA_SOURCE_ID;
        if (dataSourceId == null) throw new Error('DATA_SOURCE_ID is not set');

        const oauth2Client = getOAuth2ClientForLambda();
        const usecase = new RegisterBodyData(oauth2Client, dataSourceId);
        usecase.exec(Number(weight), new Date());

        const speechText = `体重を${weight}キロで記録しました。また明日も記録してくださいね！`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('体重記録完了！', speechText)
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
