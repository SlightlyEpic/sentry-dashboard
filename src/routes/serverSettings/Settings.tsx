import { Navmenu } from '@/components/Navmenu';
import { RouteObject, Outlet, useLoaderData } from 'react-router-dom';
import { ExtractRouteParams } from '@/util/typeMagic';

export const routerData: RouteObject = {
    path: 'settings/:serverId/',
    element: <Settings />,
    children: [
        { index: true, element: <Index /> }
    ]
}

type RouteParams = ExtractRouteParams<'settings/:serverId/'>;
type LoaderData = Awaited<ReturnType<typeof loader>>;

export async function loader({ params }: { params: RouteParams }) {
    console.log('params:', params);
    return {
        serverId: params.serverId
    };
}

function Index() {
    // const loaderData = useLoaderData() as LoaderData;
    // console.log('loader data:', loaderData);

    // return <div className='text-white'>Index: {loaderData.serverId}</div>;
    return <div className='text-white'>Index</div>;
}

export default function Settings() {
    const loaderData = useLoaderData() as LoaderData;
    console.log('loaderData:', loaderData);

    return (
        <div className="flex justify-start min-h-screen bg-bgdark">
            {/* <Navmenu serverId={loaderData.serverId} /> */}
            <Navmenu serverId='1234' />
            <div className='w-full h-full relative'>
                <Outlet />
            </div>
        </div>
    )
}
