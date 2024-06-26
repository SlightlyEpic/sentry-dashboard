import { ChevronLeftIcon, HomeIcon } from '@heroicons/react/24/solid';
import { Cog6ToothIcon, FireIcon, KeyIcon, ExclamationTriangleIcon, NewspaperIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar } from './Avatar';
import { useAppSelector } from '@/redux/hooks';


export type NavmenuProps = {
    serverId: string
}

type NavmenuItemProps = {
    name: string
    to: string
    serverId: string
    children: React.ReactNode
    pathname: string 
}

function NavmenuItem(props: NavmenuItemProps) {
    const to = `/settings/${props.serverId}/${props.to}`;

    return <Link 
        to={to} 
        className={
            'flex flex-row items-center justify-start hover:bg-blurple hover:ring-1 hover:ring-white ' +
            'w-full gap-4 p-2 rounded-md cursor-pointer transition-all duration-200 ' +
            (props.pathname === to ? 'bg-blurple ring-1 ring-white' : 'bg-transparent')
        }
    >
        {props.children}
        <div>{props.name}</div>
    </Link>
}

function ExpanderArrow(expanded: boolean, setExpanded: React.Dispatch<React.SetStateAction<boolean>>) {
    return <>
        <div 
            className={
                'mt-2 visible md:hidden absolute left-full top-0 z-10 flex items-center justify-center w-12 h-12 bg-transparent rounded-r-md transition-transform duration-500 ' +
                (expanded ? '-translate-x-full' : '')
            }
            onClick={() => setExpanded(expanded => !expanded)}
        >
            <ChevronLeftIcon className={'text-white w-8 h-8 transition-transform duration-500 ' + (expanded ? '' : 'rotate-180')} />
        </div>
    </>
}

export function Navmenu({ serverId }: NavmenuProps) {
    const [expanded, setExpanded] = useState(true);
    const location = useLocation();
    const user = useAppSelector(state => state.user);

    return (
        <div className={
                'text-white w-full absolute md:sticky self-start top-0 z-20 bg-bgdark flex flex-col items-center h-full md:min-w-80 md:w-80 p-4 font-mono transition-transform duration-500 ' +
                'backdrop-blur-lg bg-opacity-75 md:backdrop-blur-sm md:bg-opacity-50 ' +
                (expanded ? '' : '-translate-x-full')
        }>
            {/* <img src='/waves/vertical-blurple-dark-waves.svg' alt='' className='object-cover w-full h-full absolute left-0 top-0 -z-10' /> */}

            {ExpanderArrow(expanded, setExpanded)}

            {/* Spacer */}
            <div className='max-w-sm flex flex-col h-full w-full gap-4'>
                <div className='p-6'></div>
                
                <div className='mt-2 text-white self-center border border-bgdark-l w-full flex justify-center items-center flex-col'>
                    <div className='flex gap-2 items-center p-2'>
                        {/* <Avatar image='https://cdn.discordapp.com/avatars/219806114420752384/b87f6ff3b17560161b06b2330df48fb5?size=512' size='md' /> */}
                        <Avatar image={user.image!} size='md' />
                        {user.username}
                    </div>
                    <Link to='/logout' className='bg-bgdark-l hover:bg-blurple transition-colors duration-200 w-full text-center'>Logout</Link>
                </div>
                <Link to={`/settings/${serverId}`} className='mt-2 mb-2 bg-blurple w-24 rounded-full hover:bg-bgdark hover:ring-1 hover:ring-blurple self-center flex items-center justify-center gap-1'>
                    <HomeIcon className='w-4 h-4' /> Home
                </Link>
                <div className='w-full border border-white' />

                <NavmenuItem pathname={location.pathname} name='General Settings' serverId={serverId} to='general'>
                    <Cog6ToothIcon className='w-6 h-6'></Cog6ToothIcon>
                </NavmenuItem>
                <NavmenuItem pathname={location.pathname} name='Punishments' serverId={serverId} to='punishments'>
                    <FireIcon className='w-6 h-6'></FireIcon>
                    </NavmenuItem>
                <NavmenuItem pathname={location.pathname} name='Permits' serverId={serverId} to='permits'>
                    <KeyIcon className='w-6 h-6'></KeyIcon>
                </NavmenuItem>
                <NavmenuItem pathname={location.pathname} name='Advertisment Warnings' serverId={serverId} to='adwarn'>
                    <ExclamationTriangleIcon className='w-6 h-6'></ExclamationTriangleIcon>
                </NavmenuItem>
                <NavmenuItem pathname={location.pathname} name='Reports' serverId={serverId} to='reports'>
                    <NewspaperIcon className='w-6 h-6'></NewspaperIcon>
                </NavmenuItem>
                <NavmenuItem pathname={location.pathname} name='Message Templates' serverId={serverId} to='templates'>
                    <ChatBubbleBottomCenterIcon className='w-6 h-6'></ChatBubbleBottomCenterIcon>
                </NavmenuItem>
            </div>

        </div>
    )
}
