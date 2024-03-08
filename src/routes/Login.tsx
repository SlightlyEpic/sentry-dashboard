import { useAppDispatch } from '@/redux/hooks';
import { RouteObject, useNavigate } from 'react-router-dom';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { login } from '@/redux/userSlice';
import { useEffect } from 'react';

export const routerData: RouteObject = {
    path: 'login',
    element: <Login />,
}

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_ORIGIN}/api/auth/`)
        .then(async res => {
            if(!res.ok) {
                // navigate('/', { replace: true });
                location.href = `${import.meta.env.VITE_API_ORIGIN}/api/auth/discord`
                return;
            }

            type AuthRes = { username: string, image: string }
            let discordUser: AuthRes = await res.json();

            dispatch(login({
                isAuthenticated: true,
                username: discordUser.username,
                image: discordUser.image
            }));

            navigate('/settings', { replace: true });
        })
    }, [dispatch, navigate]);

    return (
        <div className='flex w-full h-full items-center justify-center'>
            <div className='flex flex-col w-full max-w-sm h-fit items-center justify-center bg-bgdark-l rounded-md p-6 gap-6'>
                <div className='text-3xl text-white'>Logging you in...</div>
                <div className='flex gap-6'>
                    <MinusCircleIcon className='animate-spin w-12 h-12 stroke-white' />
                    <MinusCircleIcon className='animate-spin animation-delay-1/6 w-12 h-12 stroke-white' />
                    <MinusCircleIcon className='animate-spin animation-delay-2/6 w-12 h-12 stroke-white' />
                </div>
            </div>
        </div>
    );
}
