import { Middleware, Dispatch } from 'redux';
import { IState } from '~/shared/rootReducer';
import { IErrorPayload } from '~/shared/reducers/errors';
import ApiError from '~/api/ApiError';
import { ApiErrorCode } from '~/shared/models';
import { assertActionsAreHandled } from '~/shared/IAction';
import { UnhandledApiError, UnhandledClientError } from '~/shared/actions/errors';

function isUnhandledApiError(action: any): action is UnhandledApiError {
    return action && action.type && action.type.indexOf('UNHANDLED_API_ERROR') >= 0;
}

function isUnhandledClientError(action: any): action is UnhandledClientError {
    return action && action.type && action.type.indexOf('UNHANDLED_CLIENT_ERROR') >= 0;
}

function userFriendly(code: ApiErrorCode) {
    switch (code) {
        case ApiErrorCode.Unknown:
            return 'Something went wrong. Try again later.';
        default:
            assertActionsAreHandled(code);
            return 'Something went wrong. Try again later.';
    }
}

async function apiErrorDetails(error: ApiError): Promise<{code: ApiErrorCode, details: any }> {
    const body = await error.getBody();
    if (!!body && !!body.message) {
        if (__DEV__)
            console.log(`error body.message: ${body.message}`);
        // FUTURE: add if statements to check content of message
        return { code: ApiErrorCode.Unknown, details: body.message };
    }
    return { code: ApiErrorCode.Unknown, details: null };
}

interface IHandledError {
    type: string;
    payload?: IErrorPayload;
}

function errorHandled(type: string, code: ApiErrorCode, details?: any): IHandledError {
    return { type, payload: { code, details, time: new Date(), message: userFriendly(code), hasError: true }};
}

export const errorHandler: Middleware<{}, IState, Dispatch<IHandledError>> = ({dispatch}) => next => async action => {
    const result = next(action); // dispatch it right away, so we can do our async calls
    if (__DEV__ && (isUnhandledApiError(action) || isUnhandledClientError(action)))
        console.log(action);
    if (isUnhandledApiError(action)) {
        const { err, handledAction } = action.payload;
        if (action.payload.err instanceof ApiError) {
            const { code, details } = await apiErrorDetails(err);
            dispatch(errorHandled(handledAction, code, details));
        }
        else
            dispatch(errorHandled(handledAction, ApiErrorCode.Unknown));
    }
    else if (isUnhandledClientError(action))
        dispatch(errorHandled(action.payload.handledAction, action.payload.code));
    return result;
};

export default errorHandler;
