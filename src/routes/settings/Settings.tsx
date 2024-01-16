import { Navmenu } from '@/components/Navmenu';
import { RouteObject, Outlet } from 'react-router-dom';

const routerData: RouteObject = {
    path: 'settings/',
    element: <Settings />
}

function Settings() {
    return (
        <div className="flex justify-start min-h-screen bg-bgdark">
            <Navmenu />
            <div className='w-full h-full relative'>
                <Outlet />
            </div>
        </div>
    )
}

export { routerData };
export default Settings;
