import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import './index.css';
import { store } from './redux/store';

import { routerData as appRouterData } from '@/routes/App';
import { routerData as serverSelectorRouterData } from '@/routes/settings/ServerSelector';
import { routerData as settingsRouterData } from '@/routes/serverSettings/Settings';

const router = createBrowserRouter([
    appRouterData,
    serverSelectorRouterData,
    settingsRouterData,
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
)
