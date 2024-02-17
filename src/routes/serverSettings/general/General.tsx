import { RouteObject } from 'react-router-dom';

export const routerData: RouteObject = {
    path: 'general/',
    element: <GeneralSettings />,
}

export default function GeneralSettings() {
    return (
        <div className="h-full w-full flex flex-col gap-6 text-white p-6">
            Prefix
        </div>
    )
}
