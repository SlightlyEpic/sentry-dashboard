import { RouteObject } from 'react-router-dom';
import StringInput from '@/components/StringInput';
import SwitchButton from '@/components/SwitchButton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import * as api from '@/apiInterface/guildSettings';
import { setReportsChannel, setReportsStatus } from '@/redux/guildSlice';

export const routerData: RouteObject = {
    path: 'reports/',
    element: <ReportsSettings />,
}

export default function ReportsSettings() {
    const dispatch = useAppDispatch();
    const guild = useAppSelector(state => state.guild);
    
    const saveStatusToServer = (value: boolean) => api.setReportsStatus(guild.guildId!, { status: value });
    const saveStatusToRedux = (value: boolean) => dispatch(setReportsStatus({ status: value }));

    const saveChannelToServer = (value: string) => api.setReportsChannel(guild.guildId!, { channel: value });
    const saveChannelToRedux = (value: string) => dispatch(setReportsChannel({ channel: value }));

    return (
        <div className="flex flex-col h-fit w-full text-white p-4 gap-8">
            <div className='self-center text-2xl lg:text-4xl font-bold bg-blurple p-2 border border-white select-none rounded-md mb-4 text-center'>
                Reports Settings
            </div>
            <div className='flex flex-col gap-4'>
                <div className='w-full h-8 flex items-center justify-between gap-2'>
                    <div className='text-xl font-bold'>Status</div>
                    <SwitchButton state={guild.data!.reports.status} saveToServer={saveStatusToServer} saveToRedux={saveStatusToRedux} />
                </div>
                <div className='border-t border-bggrey-ll' />
                <div className='w-full h-fit flex flex-col gap-2'>
                    <div className='text-xl font-bold'>Channel</div>
                    <StringInput saveToRedux={saveChannelToRedux} saveToServer={saveChannelToServer} text={guild.data!.reports.channel ?? ''} />
                </div>
            </div>
        </div>
    )
}
