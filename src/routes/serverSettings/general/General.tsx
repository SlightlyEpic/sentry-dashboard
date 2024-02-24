import { RouteObject } from 'react-router-dom';
import StringInput from '@/components/StringInput';
import SwitchButton from '@/components/SwitchButton';
import StaticSwitch from '@/components/StaticSwitch';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCompactRespone, setModStatsStatus, setPrefix } from '@/redux/guildSlice';
import * as api from '@/apiInterface/guildSettings';

export const routerData: RouteObject = {
    path: 'general/',
    element: <GeneralSettings />,
}

export default function GeneralSettings() {
    const dispatch = useAppDispatch();
    const guild = useAppSelector(state => state.guild);

    const savePrefixToServer = (value: string) => api.setPrefix(guild.guildId!, { prefix: value });
    const savePrefixToRedux = (value: string) => dispatch(setPrefix({ prefix: value }));
    
    const saveMStatToServer = (value: boolean) => api.setModStatsStatus(guild.guildId!, { status: value });
    const saveMStatToRedux = (value: boolean) => dispatch(setModStatsStatus({ status: value }));
    
    const saveCompResToServer = (value: boolean) => api.setCompactResponse(guild.guildId!, { status: value });
    const saveCompRestToRedux = (value: boolean) => dispatch(setCompactRespone({ status: value }));

    return (
        <div className="flex flex-col h-fit w-full text-white p-4 gap-8">
            <div className='self-center text-4xl font-bold bg-blurple p-2 border border-white select-none rounded-md mb-4'>
                General Settings
            </div>
            <div className='flex flex-col gap-4'>
                <div className='w-full h-fit flex flex-col gap-2'>
                    <div className='text-xl font-bold'>Prefix</div>
                    <StringInput saveToRedux={savePrefixToRedux} saveToServer={savePrefixToServer} text={guild.data!.prefix} />
                </div>
                <div className='border-t border-bggrey-ll' />
                <div className='w-full h-8 flex items-center justify-between gap-2'>
                    <div className='text-xl font-bold'>Moderation Stats</div>
                    <SwitchButton state={guild.data!.mod_stats.status} saveToServer={saveMStatToServer} saveToRedux={saveMStatToRedux} />
                </div>
                <div className='border-t border-bggrey-ll' />
                <div className='w-full h-8 flex items-center justify-between gap-2'>
                    <div className='text-xl font-bold'>Compact Response</div>
                    <SwitchButton state={guild.data!.compact_responses} saveToServer={saveCompResToServer} saveToRedux={saveCompRestToRedux} />
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
