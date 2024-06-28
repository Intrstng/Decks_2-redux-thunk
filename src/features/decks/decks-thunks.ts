import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { AppThunk } from '../../app/store';
import { setAppStatusAC } from '../../app/app-reducer';

export const fetchDecksTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const response = await decksAPI.fetchDecks()
    dispatch(setDecksAC(response.data.items))
    dispatch(setAppStatusAC('succeeded'))
  } catch {
    dispatch(setAppStatusAC('failed'))
  }
}

export const addDeckTC = (name: string): AppThunk => async (dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string): AppThunk => async (dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

export const updateDeckTC = (params: UpdateDeckParams): AppThunk => async (dispatch) => {
  return decksAPI.updateDeck(params).then((res) => {
    dispatch(updateDeckAC(res.data))
  })
}
