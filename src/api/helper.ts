import ApiError from './ApiError';
import { camelCase, isObject, isArray, reduce } from 'lodash';

export const endpoint = 'http://localhost:3000/calendars';
export const devEndpoint = 'https://27shtszeu6.execute-api.us-east-1.amazonaws.com/dev/calendars';
export const prodEndpoint = 'https://0jhkh4pn4b.execute-api.us-east-1.amazonaws.com/prod/calendars';

export function checkStatus(response: Response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        throw new ApiError(`${response.status}: ${response.statusText}`, response);
    }
}

export function makeStandardHeaders(token?: string) {
    return new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ... token != null ? { Authorization: `${token}` } : { }
    });
}

export function parseJson(response: Response) {
    return response.json();
}

export function parseSnakeCaseJson(response: Response) {
    return response.json().then(toCamelCase);
}

function toCamelCase(obj: any): any {
    if (!isObject(obj))
        return obj;
    else if (isArray(obj))
        return obj.map(value => toCamelCase(value));
    return reduce(obj, (result, value, key) => ({
        ...result,
        [camelCase(key)]: toCamelCase(value)
    }), {});
}
