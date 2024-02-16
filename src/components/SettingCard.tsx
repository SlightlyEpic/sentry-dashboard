import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SettingCardProps {
    icon: ReactNode;
    settingName: string;
    buttonText: string
    children: ReactNode;
    to: string;
}

const SettingCard = ({ icon, settingName, children, to, buttonText }: SettingCardProps) => {
    return (
        <div className='w-full h-full min-w-64 bg-bgdark-l opacity-95 text-white flex flex-col rounded-md max-w-md gap-4 p-4'>
            <div className=' flex flex-row items-center gap-2'>
                {icon}
                <div className='text-3xl sm:text-4xl font-bold'>
                    {settingName}
                </div>
            </div>
            <div className='text-sm lg:text-base'>{children}</div>

            <Link
                to={to}
                className='text-white self-start mt-auto bg-blurple hover:bg-bgdark
                hover:ring-2 hover:ring-blurple-l rounded-md text-md font-bold px-4 py-2'
            >
                {buttonText}
            </Link>
        </div>
    );
};

export default SettingCard;
