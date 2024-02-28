import { RouteObject } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import * as api from '@/apiInterface/guildSettings';

import PermitInput from '@/components/PermitInput';
import { Permit } from '@/types/db';
import { setPermitPermissions, setPermitRoles } from '@/redux/guildSlice';
import { useCallback } from 'react';

export const routerData: RouteObject = {
    path: 'permits/',
    element: <PermitsSettings />,
}

export default function PermitsSettings() {
    const dispatch = useAppDispatch();
    const guild = useAppSelector(state => state.guild);

    const saveToServer = useCallback(async (permit: Permit) => {
        await Promise.all([
            api.setPermitPermissions(guild.guildId!, { permitName: permit.name, permissions: permit.permissions }),
            api.setPermitRoles(guild.guildId!, { permitName: permit.name, roles: permit.roles })
        ]);
        return 'Success';
    }, [guild]);

    const saveToRedux = useCallback((permit: Permit) => {
        dispatch(setPermitPermissions({ permitName: permit.name, permissions: permit.permissions }));
        dispatch(setPermitRoles({ permitName: permit.name, roles: permit.roles }));
    }, [dispatch]);

    return (
        <div className="flex flex-col h-fit w-full text-white p-4 gap-8">
            <div className='self-center text-2xl lg:text-4xl font-bold bg-blurple p-2 border border-white select-none rounded-md mb-4 text-center'>
                Permit Settings
            </div>
            <div className='w-full flex flex-col gap-4'>
            {
                guild.data!.custom_permits.map(permit => <PermitInput saveToRedux={saveToRedux} saveToServer={saveToServer} permit={permit} key={permit.name} />)
            }
            </div>
        </div>
    )
}
