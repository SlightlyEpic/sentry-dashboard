import { useState } from 'react';
import { RouteObject } from 'react-router-dom';
import StringInput from '@/components/StringInput';
import SwitchButton from '@/components/SwitchButton';
import StaticSwitch from '@/components/StaticSwitch';

export const routerData: RouteObject = {
    path: 'general/',
    element: <GeneralSettings />,
}

export default function GeneralSettings() {
    const prefix = 'p';
    const [mStat, setMStats] = useState(true);
    const [compRes, setCompRes] = useState(false);

    return (
        <div className="flex flex-col h-fit w-full text-white p-4 gap-8">
            <div className='self-center text-4xl font-bold bg-blurple p-2 border border-white select-none rounded-md mb-4'>
                General Settings
            </div>
            <div className='flex flex-col gap-4'>
                <div className='w-full h-fit flex flex-col gap-2'>
                    <div className='text-xl font-bold'>Prefix</div>
                    <StringInput saveToRedux={() => {}} saveToServer={async () => 'Success'} text={prefix} />
                </div>
                <div className='border-t border-bggrey-ll' />
                <div className='w-full h-8 flex items-center justify-between gap-2'>
                    <div className='text-xl font-bold'>Moderation Stats</div>
                    <SwitchButton state={mStat} setState={setMStats} />
                </div>
                <div className='border-t border-bggrey-ll' />
                <div className='w-full h-8 flex items-center justify-between gap-2'>
                    <div className='text-xl font-bold'>Compact Response</div>
                    <SwitchButton state={compRes} setState={setCompRes} />
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
