import { RouteObject } from 'react-router-dom';

export const routerData: RouteObject = {
    path: 'general/',
    element: <GeneralSettings />,
}

export default function GeneralSettings() {
    return (
        <div className="flex justify-start min-h-screen bg-green-500">
            Hello world
        </div>
    )
}
