import { RouteObject } from 'react-router-dom';

export const routerData: RouteObject = {
    path: 'general/',
    element: <GeneralSettings />,
}

export default function GeneralSettings() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 justify-start h-full w-full [&>*]:place-self-center">
        </div>
    )
}
