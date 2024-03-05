import { useNavigate } from 'react-router-dom'

export default function NotFound404() {
    const navigate = useNavigate();

    return <div className='w-full h-full text-white font-mono flex flex-col gap-4 items-center justify-center'>
        <div className='relative w-full h-fit max-w-lg max-h-96 border border-blurple rounded-md flex flex-col justify-center items-center p-4 gap-4'>
            <img src='/images/logo_circle.png' alt='logo' className='w-24 aspect-square absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+1rem)]'></img>
            <div className='flex flex-col sm:flex-row items-center justify-center w-full gap-x-4 gap-y-2'>
                <div className='text-6xl sm:text-9xl'>404</div>
                <div className='flex justify-center items-center text-xl text-bggrey-ll text-center'>
                    Oops! We couldn't find this page!
                </div>
            </div>
            <div className='flex items-center justify-center w-full gap-4'>
                <button className='rounded-full w-24 bg-blurple hover:bg-blurple-l border border-white h-8' onClick={() => navigate(-1)}>
                    Go Back
                </button>
                <button className='rounded-full w-24 bg-blurple hover:bg-blurple-l border border-white h-8' onClick={() => navigate('/', { replace: true })}>
                    Home
                </button>
            </div>
        </div>
    </div>
}
