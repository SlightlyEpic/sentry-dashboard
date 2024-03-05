import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import './index.css';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import NotFound404 from './routes/NotFound404';

import { routerData as appRouterData } from '@/routes/App';
import { routerData as loginRouterData } from '@/routes/Login';
import { routerData as logoutRouterData } from '@/routes/Logout';
import { routerData as serverSelectorRouterData } from '@/routes/settings/ServerSelector';
import { routerData as settingsRouterData } from '@/routes/serverSettings/Settings';

const router = createBrowserRouter([
    appRouterData,
    loginRouterData,
    logoutRouterData,
    serverSelectorRouterData,
    settingsRouterData,
    {
        path: '*',
        element: <NotFound404 />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
