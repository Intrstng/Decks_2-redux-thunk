import axios from 'axios';
import { ErrorMessageResponseFromServer } from '../../features/decks/decks-thunks';
import { Dispatch } from 'redux';
import { setAppErrorAC } from '../../app/app-reducer';

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
export const handleError = (e: unknown, dispatch: Dispatch) => {
    let errorMsg: string
    if (axios.isAxiosError<ErrorMessageResponseFromServer>(e)) {
        // errorMsg = e.response ? (3.Server Error) : (1.Network Error)
        errorMsg = e.response ? e.response.data.errorMessages[0].message
            : e.message;
    } else { // (2.Ошибка не в Axios запросе)
        errorMsg = (e as Error).message;
    }
    dispatch(setAppErrorAC(errorMsg))
    console.log(errorMsg)
}