import { checkStatus, parseJson, makeStandardHeaders, endpoint } from './helper';
import { IBjjStats } from '~/bjj/models';

export class CalendarApi {
    async getBjjStats() {
        return await fetch(`${endpoint}/v1/calendars/fitness/bjj`, {
            headers: makeStandardHeaders()
        })
        .then(checkStatus)
        .then<IBjjStats>(parseJson);
    }
}

const calendarApi = new CalendarApi();
export default calendarApi;
