export default class ApiError extends Error {
    private response: Response;

    constructor(message: string, response: Response) {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
        this.response = response;
    }

    async getBody(): Promise<any> {
        return await this.response.json();
    }
}
