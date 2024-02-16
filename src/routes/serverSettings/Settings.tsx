import { Navmenu } from '@/components/Navmenu';
import { Header } from '@/components/Header';
import { RouteObject, Outlet, useLoaderData, LoaderFunction } from 'react-router-dom';
import { ExtractRouteParams } from '@/util/typeMagic';
import { routerData as generalRouterData } from './general/General';

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
        generalRouterData
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
    console.log('loader data:', loaderData);

    return <div className='text-white'>Index: {loaderData.serverId}</div>;
}

export default function Settings() {
    const loaderData = useLoaderData() as LoaderData;
    console.log('loaderData:', loaderData);

    

    return (
        <div className="flex flex-col items-center justify-start w-full h-full bg-bgdark">
            <Header />

            <div className='flex justify-center w-full max-w-screen-xl overflow-y-scroll'>
                <Navmenu serverId={loaderData.serverId} />
                <div className='w-full h-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
