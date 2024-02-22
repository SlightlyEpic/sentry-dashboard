export function Footer() {
    const footerLinks: [name: string, path: string][] = [
        ['Invite', '/invite'],
        ['Support', '/support'],
        ['Terms of Service', '/tos'],
        ['Privacy Policy', '/privacy']
    ];

    return (
        // <div className='flex items-center justify-center absolute top-full -translate-y-full left-1/2 -translate-x-1/2'>
        <div className='hidden md:flex items-center justify-center w-full max-w-screen-xl bg-bgdark bg-opacity-50 backdrop-blur-sm'>
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
    );
}
