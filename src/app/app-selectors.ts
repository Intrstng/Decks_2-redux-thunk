import { AppRootState } from './store';
import { RequestStatusType } from './app-reducer';

export const statusAppSelector = ((state: AppRootState): RequestStatusType => state.app.status);

export const errorAppSelector = ((state: AppRootState): string | null => state.app.error);