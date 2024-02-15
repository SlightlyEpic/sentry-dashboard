import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
        <RouterProvider router={router} />
    </React.StrictMode>,
)
