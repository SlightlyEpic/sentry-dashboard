import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CardProps {
    icon: ReactNode;
    settingName: string;
    children: ReactNode;
    to: string;
}

const SettingCard = ({ icon, settingName, children, to }: CardProps) => {
    return (
        <div className="m-10 min-w-64 min-h-72 f h-fit bg-bgdark-l opacity-95 text-white p-2 max-w-80 flex flex-col rounded-lg">
            <div className=" p-1 sm:p-2 flex flex-row items-center">
                {icon}
                <div className="text-3xl p-1 sm:text-4xl sm:p-2 font-bold">
                    {settingName}
                </div>
            </div>
            <div className="text-sm lg:text-base p-2 pb-3">{children}</div>

            <Link
                to={to}
                className="text-white self-start bg-blurple mx-2 my-1 hover:bg-bgdark
                hover:ring-2 hover:ring-blurple-l rounded-md text-md font-bold px-4 py-2"
            >
                Edit {settingName}
            </Link>
        </div>
    );
};

export default SettingCard;
