export enum EActionStatus {
    Idle = 'idle',
    Pending = 'pending',
    Succeeded = 'succeeded',
    Failed = 'failed',
}

export interface FetchError {
    errorCode: string
    errorMessage: string
}
