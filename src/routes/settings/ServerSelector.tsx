import { useState } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';

export const routerData: RouteObject = {
    path: 'settings/',
    element: <ServerSelector />,
}

export default function ServerSelector() {
    let [serverId, setServerId] = useState('');
    let navigate = useNavigate();

    let doRedirect = () => navigate(`/settings/${serverId}/general`);

    return (
        <div className="flex flex-col gap-2 text-white justify-center items-center min-h-screen bg-bgdark">
            <div>Please select the server:</div>
            <input onChange={(e) => setServerId(e.target.value)} type='text' className='text-black' />
            <button className='bg-white text-black p-1 rounded-sm' onClick={doRedirect}>Submit</button>
        </div>
    )
}
