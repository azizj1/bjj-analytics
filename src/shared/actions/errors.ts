import IAction from '~/shared/IAction';
import { ApiErrorCode } from '~/shared/models';

export type UnhandledApiError = IAction<'UNHANDLED_API_ERROR', { err: any, handledAction: string }, void>;
export type UnhandledClientError =
    IAction<'UNHANDLED_CLIENT_ERROR', { code: ApiErrorCode, handledAction: string }, void>;

export function unhandledApiError(err: any, handledAction: string): UnhandledApiError {
    return { type: 'UNHANDLED_API_ERROR', payload: {err, handledAction} };
}

export function unhandledClientError(code: ApiErrorCode, handledAction: string): UnhandledClientError {
    return { type: 'UNHANDLED_CLIENT_ERROR', payload: {code, handledAction} };
}
