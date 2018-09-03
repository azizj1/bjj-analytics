export default interface IAction<TType extends string, TPayload, TMeta> {
    type: TType;
    payload: TPayload;
    error?: boolean;
    meta?: TMeta;
}

export function assertActionsAreHandled(action: never) { return action; /* compile-time error */ }
