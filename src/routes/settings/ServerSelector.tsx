import { setAllSettings, setGuildId } from '@/redux/guildSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useRef, useState } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';
import * as api from '@/apiInterface/guildSettings';

export const routerData: RouteObject = {
    path: 'settings/',
    element: <ServerSelector />,
}

export default function ServerSelector() {
    const [isLoading, setIsLoading] = useState(false);
    const guildId = useRef('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        dispatch(setGuildId(guildId.current));
        setIsLoading(true);
        
        try {
            const guildSettings = await api.getAllSettings(guildId.current);
            dispatch(setAllSettings(guildSettings));
            navigate(`/settings/${guildId}/general`);
        } catch(err) {
            alert(`Loading failed: ${err}`);
        }

        setIsLoading(false);
    }

    return (
        <div className="flex flex-col gap-2 text-white justify-center items-center min-h-screen bg-bgdark">
            {
            !isLoading && <>
                <div>Please select the server:</div>
                <input onChange={(e) => guildId.current = e.target.value} type='text' className='text-black' />
                <button className='bg-white text-black p-1 rounded-sm' onClick={handleClick}>Submit</button>
            </>
            }
            {
            isLoading && <>
                <div className='flex flex-col items-center justify-center w-64 h-32 rounded-md bg-bggrey font-bold font-mono text-2xl border-2 border-blurple'>
                    <div>Loading data</div>
                    <div className='flex'>
                        <div className='animate-bounce'>.</div>
                        <div className='animate-bounce animation-delay-1/6'>.</div>
                        <div className='animate-bounce animation-delay-2/6'>.</div>
                    </div>
                </div>
            </>
            }
        </div>
    )
}
