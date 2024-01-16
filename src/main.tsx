import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css';

import { routerData as appRouterData } from '@/routes/App';
import { routerData as settingsRouterData } from '@/routes/settings/Settings';

const router = createBrowserRouter([
    appRouterData,
    settingsRouterData,
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
