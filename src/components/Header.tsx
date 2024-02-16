import { UserGroupIcon, PlusCircleIcon, StarIcon, CloudIcon } from '@heroicons/react/24/outline';

export function Header() {
    const headerLinks: [icon: React.ReactElement, name: string, path: string][] = [
        [<UserGroupIcon className='h-6 w-6' />, 'Settings', '/settings'],
        [<UserGroupIcon className='h-6 w-6' />, 'Team', '/team'],
        [<PlusCircleIcon className='h-6 w-6' />, 'Invite', '/invite'],
        [<StarIcon className='h-6 w-6' />, 'Premium', '/premium'],
        [<CloudIcon className='h-6 w-6' />, 'Support', '/support']
    ];

    return <div className='w-full top-0 z-30 self-end hidden md:flex justify-end items-center p-2 bg-bgdark border-b-bgdark-l border-b-2'>
        {headerLinks.map(v => (
            <a key={v[2]} className='text-blue-500 font-medium pl-3 pr-3 hover:text-blue-300' href={v[2]}>
                <div className='flex gap-2'>
                    {v[0]} {v[1]}
                </div>
            </a>
        ))}
    
        <button className='text-white ml-3 bg-blurple h-8 w-20 rounded-md text-sm hover:bg-blurple-ll transition-colors duration-200'>Log In</button>
    </div>
}