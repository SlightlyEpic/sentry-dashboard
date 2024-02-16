import { ChevronLeftIcon, HomeIcon } from '@heroicons/react/24/solid';
import { Cog6ToothIcon, FireIcon, KeyIcon, ExclamationTriangleIcon, NewspaperIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { Avatar } from './Avatar';

// type PageLink = {
//     name: string
//     path: string
//     icon?: React.ReactElement
//     children?: PageLink[]
// };

export type NavmenuProps = {
    serverId: string
}

type NavmenuItemProps = {
    name: string
    children: React.ReactNode
}

function NavmenuItem(props: NavmenuItemProps) {
    return <div className='flex flex-row items-center justify-start bg-bgdark hover:bg-bggrey-l transition-colors duration-200 w-2/3 sm:w-1/2 md:w-full gap-4 p-2 rounded-md
    cursor-pointer'>
        {props.children}
        <div>{props.name}</div>
    </div>
}

function ExpanderArrow(expanded: boolean, setExpanded: React.Dispatch<React.SetStateAction<boolean>>) {
    return <>
        {/* <div className={
            'mt-2 visible md:hidden absolute left-full top-0 -z-20 flex items-center justify-center w-12 h-12 bg-bgdark rounded-r-md transition-transform duration-500 ' +
            (expanded ? '-translate-x-full' : ``)
        }></div> */}

        <div 
            className={
                'mt-2 visible md:hidden absolute left-full top-0 z-10 flex items-center justify-center w-12 h-12 bg-bgdark rounded-r-md transition-transform duration-500 ' +
                (expanded ? '-translate-x-full' : '')
            }
            onClick={() => setExpanded(expanded => !expanded)}
        >
            <ChevronLeftIcon className={'text-white w-8 h-8 transition-transform duration-500 ' + (expanded ? '' : 'rotate-180')} />
        </div>
    </>
}

export function Navmenu() {
    let [expanded, setExpanded] = useState(true);

    return (
        <div className={
                'text-white w-screen absolute md:relative z-20 bg-bgdark flex flex-col items-center h-screen md:min-w-80 md:w-80 p-4 font-mono transition-transform duration-500 ' +
                (expanded ? '' : '-translate-x-full')
        }>
            {/* <img src='/waves/vertical-blurple-dark-waves.svg' alt='' className='object-cover w-full h-full absolute left-0 top-0 -z-10' /> */}

            {ExpanderArrow(expanded, setExpanded)}

            {/* Spacer */}
            <div className='max-w-sm flex flex-col h-full w-full gap-4'>
                <div className='p-6'></div>
                
                <div className='mt-2 mb-2 text-white self-center border border-bgdark-l w-full flex justify-center items-center flex-col'>
                    <div>
                        <Avatar image='https://cdn.discordapp.com/avatars/219806114420752384/b87f6ff3b17560161b06b2330df48fb5?size=512' size='md'></Avatar>
                        username
                    </div>
                    <button className='bg-bgdark-l hover:bg-gray-800 w-full'>Logout</button>
                </div>
                <button className='mt-2 mb-2 bg-blurple border border-white w-24 rounded-full hover:hue-rotate-15 transition-colors duration-200 self-center'>
                    Home
                </button>
                <hr />

                <NavmenuItem name='General Settings'><Cog6ToothIcon className='w-6 h-6'></Cog6ToothIcon></NavmenuItem>
                <NavmenuItem name='General Settings'><Cog6ToothIcon className='w-6 h-6'></Cog6ToothIcon></NavmenuItem>
                <NavmenuItem name='General Settings'><Cog6ToothIcon className='w-6 h-6'></Cog6ToothIcon></NavmenuItem>
                <NavmenuItem name='General Settings'><Cog6ToothIcon className='w-6 h-6'></Cog6ToothIcon></NavmenuItem>
                <NavmenuItem name='General Settings'><Cog6ToothIcon className='w-6 h-6'></Cog6ToothIcon></NavmenuItem>
            </div>

        </div>
    )
}

// export function Navmenu(props: NavmenuProps) {
//     let [expanded, setExpanded] = useState(true);
//     // const location = useLocation();
//     const pathname = location.pathname;

//     const serverId = props.serverId;
//     /**@TODO incorporate serverId in these redirect links, maybe with something like watchEffect */

//     let links: PageLink[] = [
//         { name: 'Home', path: '/', icon: <HomeIcon className='w-5 h-5' /> },
//         { name: 'Settings', path: '/settings', icon: <Cog6ToothIcon className='w-5 h-5' />, children: [
//             { name: 'General', path: '/settings/general' },
//             { name: 'Punishments', path: '/settings/punishments' },
//             { name: 'Permits', path: '/settings/permits' },
//             { name: 'Advertisment Warnings', path: '/settings/adwarnings' },
//             { name: 'Reports', path: '/settings/reports' },
//         ] }
//     ]

//     return (
//         <div className={
//                 "w-screen absolute md:relative z-10 bg-bgdark flex flex-col border-r-2 border-bgdark-l h-screen md:min-w-80 md:w-80 p-4 font-mono transition-transform duration-500 " +
//                 (expanded ? '' : '-translate-x-full')
//         }>
//             <img src='/waves/vertical-blurple-dark-waves.svg' alt='' className='object-cover w-full h-full absolute left-0 top-0 -z-10' />

//             <div className={
//                 '-z-20 mt-2 visible absolute left-full top-0 flex items-center justify-center w-12 h-12 bg-bgdark rounded-r-md border-bgdark-l transition-transform duration-500 border-2 border-l-0 ' +
//                 (expanded ? '-translate-x-full' : ``)
//             } />

//             <div 
//                 className={
//                     "mt-2 visible md:hidden absolute left-full top-0 flex items-center justify-center w-12 h-12 bg-transparent transition-transform duration-500 " +
//                     (expanded ? '-translate-x-full' : '')
//                 }
//                 onClick={() => setExpanded(expanded => !expanded)}
//             >
//                 <ChevronLeftIcon className={'text-white w-8 h-8 transition-transform duration-500 ' + (expanded ? '' : 'rotate-180')} />
//             </div>

//             {/* Spacer */}
//             <div className='p-6'></div>

//             <div className='text-white'>
//                 You are: <img className='m-4 inline rounded-full' src={''} width={24} height={24} alt='pfp' /> username
//             </div>
            
//             <hr />

//             <button className='m-4 bg-bgdark-l text-white hover:bg-gray-800'>Logout</button>
            
//             {links.map((link, i) => (
//                 <div key={link.path} className='flex flex-col items-start'>
//                     <a href={link.path} className={'flex items-center justify-start gap-2 text-white hover:text-blue-500 text-lg w-full p-1 hover:bg-bgdark-l ' + (link.path === pathname ? 'bg-bgdark-l border-r-2 border-blurple' : '')}>
//                         {link.icon}{link.name}
//                     </a>

//                     {/* {link.children && link.children.map((link2, i2) => (
//                         <a href={link2.path} key={link2.path} className={'text-left text-slate-400 hover:text-blue-500 text-md w-full p-1 hover:bg-bgdark-l ' + (link2.path === pathname ? 'bg-bgdark-l border-r-2 border-blurple' : '')}>
//                             {i2 === link.children!.length - 1 ? '└─' : '├─'} {link2.name}
//                         </a>
//                     ))} */}

//                     {i !== links.length - 1 && <div className='mt-2 mb-2 w-full h-0 border-[1px] border-bgdark-l'></div>}
//                 </div>
//             ))}
//         </div>
//     )
// }
