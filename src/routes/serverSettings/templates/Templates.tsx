import { RouteObject } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
// import * as api from '@/apiInterface/guildSettings';
import { TemplateInput } from '@/components/TemplateInput';

export const routerData: RouteObject = {
    path: 'templates/',
    element: <TemplatesSettings />,
}

export default function TemplatesSettings() {
    const guild = useAppSelector(state => state.guild);

    return (
        <div className="flex flex-col h-fit w-full text-white p-4 gap-8">
            <div className='self-center text-2xl lg:text-4xl font-bold bg-blurple p-2 border border-white select-none rounded-md mb-4 text-center'>
                Templates Settings
            </div>
            <div className='flex flex-col gap-4'>
                {
                    guild.data!.templates.messages.map(t => <TemplateInput key={t.id} template={t} />)
                }
            </div>
        </div>
    )
}
