import { Navmenu } from '@/components/Navmenu';
import { RouteObject, Outlet, useLoaderData, LoaderFunction } from 'react-router-dom';
import { ExtractRouteParams } from '@/util/typeMagic';

export const routerData: RouteObject = {
    path: 'settings/:serverId/',
    element: <Settings />,
    loader: loader as unknown as LoaderFunction,
    children: [
        {
            index: true,
            element: <Index />,
            loader: loader as unknown as LoaderFunction
        }
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
        <div className="flex justify-start min-h-screen bg-bgdark">
            {/* <Navmenu serverId={loaderData.serverId} /> */}
            <Navmenu serverId={loaderData.serverId} />
            <div className='w-full h-full relative'>
                <Outlet />
            </div>
        </div>
    )
}
