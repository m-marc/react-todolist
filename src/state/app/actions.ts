export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppActionsType = ReturnType<typeof setAppStatus> | ReturnType<typeof setAppError>
    | ReturnType<typeof setAppInitialize>

export const setAppStatus = (status: RequestStatusType) => ({type: 'app/set_status', status} as const)
export const setAppError = (error: string | null) => ({type: 'app/set_error', error} as const)
export const setAppInitialize = (value: boolean) => ({type: 'app/set_initialize', value} as const)