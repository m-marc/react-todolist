export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const setAppStatus = (status: RequestStatusType) => ({type: 'app/set_status', status} as const)
export type AppStatusAction = ReturnType<typeof setAppStatus>

export const setAppError = (error: string | null) => ({type: 'app/set_error', error} as const)
export type AppErrorAction = ReturnType<typeof setAppError>

export type ActionsType = AppStatusAction | AppErrorAction