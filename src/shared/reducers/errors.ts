import { ApiErrorCode } from '~/shared/models';

export interface IErrorState {
    hasError: boolean;
    code: ApiErrorCode | null;
    message: string | null;
    details: any;
    time: Date | null;
}

export const initialErrorState: IErrorState = {
    hasError: false,
    code: null,
    message: null,
    details: null,
    time: null
};

export interface IErrorPayload {
    hasError: boolean;
    code: ApiErrorCode;
    details: any;
    time: Date;
    message: string;
}
