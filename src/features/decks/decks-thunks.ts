import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { AppThunk } from '../../app/store';
import { setAppStatusAC } from '../../app/app-reducer';
import axios from 'axios';

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
    try {
        const response = await decksAPI.addDeck(name)
        dispatch(addDeckAC(response.data))
    } catch (e) {
        console.log(e)
    }
}

export const deleteDeckTC = (id: string): AppThunk => async (dispatch) => {
    try {
        const response = await decksAPI.deleteDeck(id)
        dispatch(deleteDeckAC(response.data.id))
    } catch (e) {
        console.log(e)
    }
}

export type ErrorMessageResponseFromServer = {
	errorMessages: ErrorMessages[];
}
export type ErrorMessages = {
	field: string;
	message: string;
}

// Для проверки:
// 1. Network Error - выключить интернет. Ошибку создал Axios.
// 2. Ошибка не в Axios запросе - раскоментировать throw new Error чтобы проверить пункт
// 3. Server Error - ошибка возникшая на бэкэнде. Ошибку создал Axios. Тогда в теле ошибки будет e.response
// // В нашем коде несколько раз вызвать updateDeckTC кликнув на update button

export const updateDeckTC = (params: UpdateDeckParams): AppThunk => async (dispatch) => {
    try {
        // throw new Error('Some error in synchronous part of code is occurred') // (2.Ошибка не в Axios запросе)
        const response = await decksAPI.updateDeck(params)
        dispatch(updateDeckAC(response.data))
    } catch (e) {
        let errorMsg: string
        if (axios.isAxiosError<ErrorMessageResponseFromServer>(e)) { // Типизация ошибки Axios
            // errorMsg = e.response ? (3.Server Error) : (1.Network Error)
            errorMsg = e.response ? e.response.data.errorMessages[0].message
                                  : e.message;
        } else { // (2.Ошибка не в Axios запросе)
            errorMsg = (e as Error).message;
        }
        console.log(errorMsg)
    }
}
