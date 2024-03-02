import { RouteObject } from 'react-router-dom';
import { MD5 } from 'object-hash';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import PunishmentInput from '@/components/PunishmentInput';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addPunishment, addPunishmentAT, removePunishmentAT } from '@/redux/guildSlice';
import type { Punishment } from '@/types/db';
import { useCallback } from 'react';
import { dispatchWhichRejects } from '@/util/reduxUtil';

export const routerData: RouteObject = {
    path: 'punishments/',
    element: <PunishmentSettings />,
}

export default function PunishmentSettings() {
    const dispatch = useAppDispatch();
    const guild = useAppSelector(state => state.guild);

    const savePunishment = useCallback(async (oldP: Punishment, newP: Punishment) => {
        await dispatchWhichRejects(dispatch(removePunishmentAT(oldP)));
        await dispatchWhichRejects(dispatch(addPunishmentAT(newP)));
    }, [dispatch]);

    const deletePunishment = useCallback((p: Punishment) => dispatchWhichRejects(dispatch(removePunishmentAT(p))), [dispatch]);

    const makeNewPunishment = useCallback(() => {
        dispatch(addPunishment({
            action: 'mute',
            duration: 24 * 60 * 60,
            duration_raw: '24h',
            warnings_count: 100,
            warning_severity: 'low'
        }));
    }, [dispatch]);

    return (
        <div className="flex flex-col h-fit w-full text-white p-4 gap-8">
            <div className='self-center text-2xl lg:text-4xl font-bold bg-blurple p-2 border border-white select-none rounded-md mb-4 text-center'>
                Punishment Settings
            </div>
            <div className='w-full flex flex-col gap-4'>
                {
                    guild.data && guild.data.warn_punishments.map(p => <PunishmentInput
                        punishment={p}
                        save={savePunishment}
                        deleteP={deletePunishment}
                        key={MD5(p)}
                    />)
                }

                <div className='flex justify-end'>
                    <button
                        type="button"
                        onClick={makeNewPunishment}
                        className='flex items-center w-full sm:w-max justify-center h-12 gap-1 bg-green-700 rounded-md text-md font-bold px-4 py-1 hover:bg-green-500 '
                    >
                        <PlusCircleIcon className='w-6 h-6 translate-y-[0.07rem]' />
                        <div className='text-xl text-center'>New Punishment</div>
                    </button>
                </div>
            </div>
        </div>
    )
}
