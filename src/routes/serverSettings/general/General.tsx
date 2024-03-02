import { RouteObject } from 'react-router-dom';
import StringInput from '@/components/StringInput';
import SwitchButton from '@/components/SwitchButton';
import StaticSwitch from '@/components/StaticSwitch';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCompactResponseAT, setModStatsStatusAT, setPrefixAT } from '@/redux/guildSlice';
import { useCallback } from 'react';
import { dispatchWhichRejects } from '@/util/reduxUtil';

export const routerData: RouteObject = {
    path: 'general/',
    element: <GeneralSettings />,
}

export default function GeneralSettings() {
    const dispatch = useAppDispatch();
    const guild = useAppSelector(state => state.guild);

    const savePrefix = useCallback(async (value: string) => dispatchWhichRejects(dispatch(setPrefixAT({ prefix: value }))), [dispatch]);
    const saveMstat = useCallback(async (value: boolean) => dispatchWhichRejects(dispatch(setModStatsStatusAT({ status: value }))), [dispatch]);
    const saveCompRes = useCallback(async (value: boolean) => dispatchWhichRejects(dispatch(setCompactResponseAT({ status: value }))), [dispatch]);

    return (
        <div className="flex flex-col h-fit w-full text-white p-4 gap-8">
            <div className='self-center text-2xl lg:text-4xl font-bold bg-blurple p-2 border border-white select-none rounded-md mb-4 text-center'>
                General Settings
            </div>
            <div className='flex flex-col gap-4'>
                <div className='w-full h-fit flex flex-col gap-2'>
                    <div className='text-xl font-bold'>Prefix</div>
                    <StringInput save={savePrefix} text={guild.data!.prefix} />
                </div>
                <div className='border-t border-bggrey-ll' />
                <div className='w-full h-8 flex items-center justify-between gap-2'>
                    <div className='text-xl font-bold'>Moderation Stats</div>
                    <SwitchButton state={guild.data!.mod_stats.status} save={saveMstat} />
                </div>
                <div className='border-t border-bggrey-ll' />
                <div className='w-full h-8 flex items-center justify-between gap-2'>
                    <div className='text-xl font-bold'>Compact Response</div>
                    <SwitchButton state={guild.data!.compact_responses} save={saveCompRes} />
                </div>
                <div className='border-t border-bggrey-ll' />
                <div className='w-full h-8 flex items-center justify-between gap-2'>
                    <div className='text-xl font-bold'>Premium</div>
                    <StaticSwitch state={true} />
                </div>
                <div className='border-t border-bggrey-ll' />
            </div>
        </div>
    )
}
