import { useAppDispatch } from '@/redux/hooks';
import { RouteObject, useNavigate } from 'react-router-dom';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { logout } from '@/redux/userSlice';
import { useEffect } from 'react';

export const routerData: RouteObject = {
    path: 'logout',
    element: <Logout />,
}

export default function Logout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/auth/logout')
        .then(() => {
            dispatch(logout());
            navigate('/', { replace: true });
        })
    }, [dispatch, navigate]);

    return (
        <div className='flex w-full h-full items-center justify-center'>
            <div className='flex flex-col w-full max-w-sm h-fit items-center justify-center bg-bgdark-l rounded-md p-6 gap-6'>
                <div className='text-3xl text-white'>Logging you out...</div>
                <div className='flex gap-6'>
                    <MinusCircleIcon className='animate-spin w-12 h-12 stroke-white' />
                    <MinusCircleIcon className='animate-spin animation-delay-166 w-12 h-12 stroke-white' />
                    <MinusCircleIcon className='animate-spin animation-delay-333 w-12 h-12 stroke-white' />
                </div>
            </div>
        </div>
    );
}
