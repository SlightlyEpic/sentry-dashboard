import { RouteObject } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import PermitInput from '@/components/PermitInput';
import { Permit } from '@/types/db';
import { setPermitPermissionsAT, setPermitRolesAT } from '@/redux/guildSlice';
import { useCallback } from 'react';
import { dispatchWhichRejects } from '@/util/reduxUtil';

export const routerData: RouteObject = {
    path: 'permits/',
    element: <PermitsSettings />,
}

export default function PermitsSettings() {
    const dispatch = useAppDispatch();
    const guild = useAppSelector(state => state.guild);

    const save = useCallback(async (permit: Permit) => {
        await dispatchWhichRejects(dispatch(setPermitPermissionsAT({ permitName: permit.name, permissions: permit.permissions })));
        await dispatchWhichRejects(dispatch(setPermitRolesAT({ permitName: permit.name, roles: permit.roles })));
    }, [dispatch]);

    return (
        <div className="flex flex-col h-fit w-full text-white p-4 gap-8">
            <div className='self-center text-2xl lg:text-4xl font-bold bg-blurple p-2 border border-white select-none rounded-md mb-4 text-center'>
                Permit Settings
            </div>
            <div className='w-full flex flex-col gap-4'>
            {
                guild.data!.custom_permits.map(permit => <PermitInput save={save} permit={permit} key={permit.name} />)
            }
            </div>
        </div>
    )
}
