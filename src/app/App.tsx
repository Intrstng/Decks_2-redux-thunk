import './App.css'
import { Decks } from '../features/decks/Decks.tsx'
import { GlobalError } from './GlobalError/GlobalError.tsx'
import { useAppSelector } from './store';
import { RequestStatusType } from './app-reducer';
import { LinearLoader } from '../common/components/Loader/LinearLoader';
import { statusAppSelector } from './app-selectors';

export const App = () => {
    const appStatus = useAppSelector<RequestStatusType>(statusAppSelector)
    return (
        <>
            {appStatus === 'loading' && <LinearLoader/>}
            <div>
                <Decks/>
                <GlobalError/>
            </div>
        </>
    )
}
