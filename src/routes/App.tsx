import { Header } from '@/components/Header';
import { RouteObject } from 'react-router-dom';

import DiscordSignInButton from '@/components/buttons/DiscordSignIn';

export const routerData: RouteObject = {
    path: '/',
    element: <App />,
}

export default function App() {
    const footerLinks: [name: string, path: string][] = [
        ['Invite', '/invite'],
        ['Support', '/support'],
        ['Terms of Service', '/tos'],
        ['Privacy Policy', '/privacy']
    ];

    return (
        <>
            <div className='flex flex-col h-screen text-white'>
                <img src='/waves/blurple-transparent-waves.svg' alt='' className='object-cover absolute -z-10 w-full h-full' />

                <Header />
            
                <div className='flex items-center justify-evenly flex-col lg:flex-row p-8 gap-8 h-full'>
                    <div className='flex flex-col w-1/3 gap-8'>
                        <div className='flex items-center justify-center flex-col md:flex-row gap-8 text-center md:text-left'>
                            <img src='/images/logo_circle.png' alt='logo' className='min-w-48 w-64 aspect-square'></img>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-4xl md:text-6xl font-rubik font-extrabold'>Sentry</h1>
                                <h2 className='text-xl md:text-sm text-center font-mono font-bold'>Your ultimate moderation companion.</h2>
                            </div>
                        </div>
                        <div className='font-mono hidden lg:block'>
                            With advanced moderation commands, custom punishments, customizable messages/buttons/menus, and customizable permission whitelists, empower your server with enhanced control and user management. Elevate your community experience effortlessly with Sentry&apos;s comprehensive features and unparalleled ease of use.
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 scale-[2]'>
                        <button className='flex w-32 h-8 text-white text-sm border-[1px] border-gray-300 backdrop-blur-md transition-colors duration-200 items-center justify-center bg-bgdark bg-opacity-20 rounded-md'>
                            Invite to server
                        </button>
                        <DiscordSignInButton />
                        
                    </div>
                </div>

                <div className='flex items-center justify-center'>
                    <div className='hidden sm:flex justify-end p-2'>
                        {footerLinks.map((v, i) => (
                            <a key={i} className='text-blue-500 text-sm pl-3 pr-3 hover:text-blue-300' href={v[1]}>
                                <div className='flex gap-2'>
                                    {v[0]}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
