import { RouteObject } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import * as api from '@/apiInterface/guildSettings';

import PermitInput from '@/components/PermitInput';

export const routerData: RouteObject = {
    path: 'permits/',
    element: <PermitsSettings />,
}

export default function PermitsSettings() {
    const dispatch = useAppDispatch();
    const guild = useAppSelector(state => state.guild);

    return (
        <div className="flex flex-col h-fit w-full text-white p-4 gap-8">
            <div className='self-center text-4xl font-bold bg-blurple p-2 border border-white select-none rounded-md mb-4'>
                Punishment Settings
            </div>
            <div className='w-full flex flex-col gap-4'>
            {
                guild.data!.custom_permits.map(permit => <PermitInput permit={permit} key={permit.name} />)
            }
            </div>
        </div>
    )
}
