export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  const {type, payload} = action;
  switch (type) {
    case 'APP/SET-STATUS': {
      const {status} = payload;
      return {...state, status}
    }
    case 'APP/SET-ERROR': {
      const {error} = payload;
      return {...state, error}
    }
    default:
      return state
  }
}

type ActionsType = SetAppStatusAC | SetAppErrorAC

type SetAppStatusAC = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: 'APP/SET-STATUS',
    payload: {
      status
    }
  } as const
}

type SetAppErrorAC = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => {
  return {
    type: 'APP/SET-ERROR',
    payload: {
      error
    }
  } as const
}
