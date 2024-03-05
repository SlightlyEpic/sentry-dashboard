import { setAllSettings, setGuildId } from '@/redux/guildSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useCallback, useEffect, useState } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';
import * as api from '@/apiInterface/guildSettings';
import { GuildInfo } from '@/types/apiTypes';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export const routerData: RouteObject = {
    path: 'settings/',
    element: <ServerSelector />,
}

async function fetchMutualGuilds(skipCache = false): Promise<GuildInfo[]> {
    const res = await fetch(`/api/guilds/mutual?force=${skipCache ? 1 : 0}`);
    if(!res.ok) throw `Error: ${res.statusText}`;
    const json: { message: string, data: GuildInfo[] } = await res.json();
    console.log('json:', json);
    return json.data;
}

function iconUrl(guildId: string, hash: string) {
    return `https://cdn.discordapp.com/icons/${guildId}/${hash}.webp?size=256`;
}

export default function ServerSelector() {
    const [isLoadingSettings, setIsLoadingSettings] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isLoadingMutual, setIsLoadingMutual] = useState(false);
    const [mutualGuilds, setMutualGuilds] = useState<GuildInfo[]>([]);
    
    const user = useAppSelector(state => state.user);

    const handleClick = useCallback(async (guildId: string) => {
        dispatch(setGuildId(guildId));
        setIsLoadingSettings(true);
        
        try {
            const guildSettings = await api.getAllSettings(guildId);
            dispatch(setAllSettings(guildSettings));
            navigate(`/settings/${guildId}/`);
        } catch(err) {
            alert(`Loading failed: ${err}`);
        }

        setIsLoadingSettings(false);
    }, [dispatch, navigate]);

    const loadGuilds = useCallback(async () => {
        if(isLoadingSettings) return;
        if(isLoadingMutual) return;
        setIsLoadingMutual(true);
        try {
            setMutualGuilds(await fetchMutualGuilds());
        } catch {
            alert('Error while fetching mutual guilds');
        } finally {
            setIsLoadingMutual(false);
        }
    }, [isLoadingMutual, isLoadingSettings]);

    useEffect(() => {
        if(!user.isAuthenticated) location.href = '/login';
    }, [user, navigate]);

    useEffect(() => {
        if(user.isAuthenticated) loadGuilds();
    }, []);

    if(!user.isAuthenticated) return <></>

    return (
        <div className="flex flex-col gap-2 text-white justify-center items-center min-h-screen bg-bgdark">
            {
            !isLoadingSettings && <>
                <div className='text-center flex flex-col items-center justify-start w-1/2 h-1/2 max-w-2xl min-h-64 max-h-96 rounded-md bg-bggrey font-bold font-mono text-2xl border-2 border-blurple p-2'>
                    <div className='relative w-full text-2xl font-bold font-mono items-center justify-center flex'>
                        Choose a server
                        <ArrowPathIcon 
                            className={
                                'absolute left-full w-6 h-6 -translate-x-full transition-transform duration-500 cursor-pointer ' +
                                (isLoadingMutual ? 'stroke-blurple animate-pulse' : 'stroke-white hover:rotate-180 ')
                            }
                            onClick={loadGuilds}
                        />
                    </div>
                    <div className='w-full h-0 border border-blurple bg-blurple my-2'></div>
                    <div className='flex flex-col w-full h-full overflow-y-auto flex-grow'>
                    {
                        !isLoadingMutual && mutualGuilds.map(g => <div 
                            key={g.id}
                            className='group flex w-full gap-4 items-center hover:bg-blurple p-2 cursor-pointer transition-colors duration-200 rounded-md'
                            onClick={() => handleClick(g.id)}
                        >
                            <img src={iconUrl(g.id, g.icon)} className='h-12 aspect-square rounded-full' />
                            <div className='flex flex-col'>
                                <div className='w-fit'>{g.name}</div>
                                <div className='text-sm w-fit font-mono font-normal text-gray-500 group-hover:text-white transition-colors duration-200'>{g.id}</div>
                            </div>
                        </div>)
                    }
                    {
                        isLoadingMutual && <div className='flex flex-col ites-center justify-center w-full h-full flex-grow'>
                            <div>Fetching mutual guilds</div>
                            <div className='flex self-center'>
                                <div className='animate-bounce'>.</div>
                                <div className='animate-bounce animation-delay-1/6'>.</div>
                                <div className='animate-bounce animation-delay-2/6'>.</div>
                            </div>
                        </div>
                    }
                    </div>
                </div>
            </>
            }
            {
            isLoadingSettings && <>
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
