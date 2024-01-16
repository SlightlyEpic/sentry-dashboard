import { Button, ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd';
import React from 'react';
import { UserGroupIcon, PlusCircleIcon, StarIcon, CloudIcon } from '@heroicons/react/24/outline';
import { RouteObject } from 'react-router-dom';

import DiscordSignInButton from '@/components/buttons/DiscordSignIn';

export const routerData: RouteObject = {
    path: '/',
    element: <App />,
}

export default function App() {
    const pageThemeConfig: ThemeConfig = {
        components: {
            Button: {
                colorPrimary: '#5865f2',
                algorithm: true
            },
        }
    };

    const headerLinks: [icon: React.ReactElement, name: string, path: string][] = [
        [<UserGroupIcon className='h-6 w-6' />, 'Settings', '/settings'],
        [<UserGroupIcon className='h-6 w-6' />, 'Team', '/team'],
        [<PlusCircleIcon className='h-6 w-6' />, 'Invite', '/invite'],
        [<StarIcon className='h-6 w-6' />, 'Premium', '/premium'],
        [<CloudIcon className='h-6 w-6' />, 'Support', '/support']
    ];

    const footerLinks: [name: string, path: string][] = [
        ['Invite', '/invite'],
        ['Support', '/support'],
        ['Terms of Service', '/tos'],
        ['Privacy Policy', '/privacy']
    ];

    return (
        <>
            <ConfigProvider theme={pageThemeConfig}>
                <div className='flex flex-col h-screen text-white'>
                    <img src='/waves/blurple-transparent-waves.svg' alt='' className='object-cover absolute -z-10 w-full h-full' />

                    <div className='hidden sm:flex justify-end p-2 bg-bgdark border-b-bgdark-l border-b-2'>
                        {headerLinks.map(v => (
                            <Button key={v[2]} type='link' href={v[2]}>
                                <div className='flex gap-2'>
                                    {v[0]} {v[1]}
                                </div>
                            </Button>
                        ))}
                    
                        <Button type='primary' className='bg-blurple'>Log In</Button>
                    </div>
                
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
                                <Button key={i} type='link' href={v[1]}>
                                    <div className='flex gap-2'>
                                        {v[0]}
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </>
    )
}