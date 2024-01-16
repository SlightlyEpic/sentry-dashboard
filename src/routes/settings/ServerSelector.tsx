import { RouteObject } from 'react-router-dom';

export const routerData: RouteObject = {
    path: 'settings/',
    element: <ServerSelector />
}

export default function ServerSelector() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-bgdark">
            <div>Please select the server:</div>
            <input type='text' />
        </div>
    )
}
