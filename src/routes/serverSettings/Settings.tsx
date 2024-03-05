import { RouteObject, Outlet, useLoaderData, LoaderFunction, useNavigate } from 'react-router-dom';
import { ExtractRouteParams } from '@/types/typeMagic';
import { Cog6ToothIcon, FireIcon, KeyIcon, ExclamationTriangleIcon, NewspaperIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { routerData as generalRouterData } from './general/General';
import { routerData as punishmentRouterData } from './punishments/Punishments';
import { routerData as adwarnRouterData } from './adwarn/AdWarn';
import { routerData as permitRouterData } from './permits/Permits';
import { routerData as reportsRouterData } from './reports/Reports';
import { routerData as templatesRouterData } from './templates/Templates';

import { Navmenu } from '@/components/Navmenu';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import SettingCard from '@/components/SettingCard';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

export const routerData: RouteObject = {
    path: 'settings/:serverId/',
    element: <Settings />,
    loader: loader as unknown as LoaderFunction,
    children: [
        {
            index: true,
            element: <Index />,
            loader: loader as unknown as LoaderFunction
        },
        generalRouterData,
        punishmentRouterData,
        adwarnRouterData,
        permitRouterData,
        reportsRouterData,
        templatesRouterData
    ]
}

type RouteParams = ExtractRouteParams<'settings/:serverId/'>;
type LoaderData = Awaited<ReturnType<typeof loader>>;

export async function loader({ params }: { params: RouteParams }) {
    return {
        serverId: params.serverId
    };
}

function Index() {
    const loaderData = useLoaderData() as LoaderData;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 justify-start h-fit w-full [&>*]:place-self-center">
            <SettingCard
                settingName='General Settings'
                to={`/settings/${loaderData.serverId}/general`}
                icon={<Cog6ToothIcon className='w-10 h-10 -mb-1'/>}
                buttonText='Edit General Settings'
            >
                Configure settings like prefix and moderation stats.
            </SettingCard>
            <SettingCard
                settingName='Punishments'
                to={`/settings/${loaderData.serverId}/punishments`}
                icon={<FireIcon className='w-10 h-10 -mb-1'/>}
                buttonText='Configure Punishments'
            >
                Add, remove or edit existing punishment actions which are triggered automatically by the bot.
            </SettingCard>
            <SettingCard
                settingName='Permits'
                to={`/settings/${loaderData.serverId}/permits`}
                icon={<KeyIcon className='w-10 h-10 -mb-1'/>}
                buttonText='Configure Permits'
            >
                Add, remove or edit existing permits to grant or revoke access to certain commands of the bot to different users or roles.
            </SettingCard>
            <SettingCard
                settingName='Ad Warnings'
                to={`/settings/${loaderData.serverId}/adwarn`}
                icon={<ExclamationTriangleIcon className='w-10 h-10 -mb-1'/>}
                buttonText='Configure Ad Moderation Settings'
            >
                Configure settings related to advertisment warnings and advertisment moderation.
            </SettingCard>
            <SettingCard
                settingName='Reports'
                to={`/settings/${loaderData.serverId}/reports`}
                icon={<NewspaperIcon className='w-10 h-10 -mb-1'/>}
                buttonText='Configure Reports'
            >
                Configure settings related to the bot's reporting system.
            </SettingCard>
            <SettingCard
                settingName='Message Templates'
                to={`/settings/${loaderData.serverId}/templates`}
                icon={<ChatBubbleBottomCenterIcon className='w-10 h-10 -mb-1'/>}
                buttonText='Configure Reports'
            >
                Configure messages and embed templates to be used by the bot as responses across your server.
            </SettingCard>
        </div>
    )
}

export default function Settings() {
    const loaderData = useLoaderData() as LoaderData;
    const navigate = useNavigate();

    const user = useAppSelector(state => state.user);
    
    useEffect(() => {
        if(!user.isAuthenticated) location.href = '/login';
    }, [user, navigate]);

    if(!user.isAuthenticated) return <></>

    return <>
        <img src='/waves/blob-blurple.svg' className='absolute w-full h-full object-cover -z-10' />
        {/* <img src='/waves/blue.svg' className='absolute w-full h-full object-cover -z-10' /> */}
        <div className='flex flex-col items-center justify-start w-full h-full'>
            <Header />

            <div className='flex justify-center w-full max-w-screen-xl overflow-y-scroll flex-grow'>
                <Navmenu serverId={loaderData.serverId} />
                <div className='w-full h-max min-h-full bg-bgdark bg-opacity-50 backdrop-blur-sm'>
                    <Outlet />
                </div>
            </div>

            <Footer />
        </div>
    </>
}
