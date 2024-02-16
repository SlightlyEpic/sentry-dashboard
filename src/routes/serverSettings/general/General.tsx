import SettingCard from '@/components/SettingCard';
import { RouteObject } from 'react-router-dom';
import { FireIcon } from '@heroicons/react/24/outline';

export const routerData: RouteObject = {
    path: 'general/',
    element: <GeneralSettings />,
}

export default function GeneralSettings() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-start h-full w-full bg-bgdark [&>*]:place-self-center">
            <SettingCard settingName='Fire' to='/fire' icon={<FireIcon className='w-8 h-8'/>} >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, provident neque! Deleniti voluptates, 
                labore veniam quo rerum obcaecati laboriosam amet nihil! Alias officiis esse iure molestiae minima cum vero dolore?
            </SettingCard>
            <SettingCard settingName='Fire' to='/fire' icon={<FireIcon className='w-8 h-8'/>} >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, provident neque! Deleniti voluptates, 
                labore veniam quo rerum obcaecati laboriosam amet nihil! Alias officiis esse iure molestiae minima cum vero dolore?
            </SettingCard>
            <SettingCard settingName='Fire' to='/fire' icon={<FireIcon className='w-8 h-8'/>} >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, provident neque! Deleniti voluptates, 
                labore veniam quo rerum obcaecati laboriosam amet nihil! Alias officiis esse iure molestiae minima cum vero dolore?
            </SettingCard>
            <SettingCard settingName='Fire' to='/fire' icon={<FireIcon className='w-8 h-8'/>} >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, provident neque! Deleniti voluptates, 
                labore veniam quo rerum obcaecati laboriosam amet nihil! Alias officiis esse iure molestiae minima cum vero dolore?
            </SettingCard>
            <SettingCard settingName='Fire' to='/fire' icon={<FireIcon className='w-8 h-8'/>} >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, provident neque! Deleniti voluptates, 
                labore veniam quo rerum obcaecati laboriosam amet nihil! Alias officiis esse iure molestiae minima cum vero dolore?
            </SettingCard>
            <SettingCard settingName='Fire' to='/fire' icon={<FireIcon className='w-8 h-8'/>} >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, provident neque! Deleniti voluptates, 
                labore veniam quo rerum obcaecati laboriosam amet nihil! Alias officiis esse iure molestiae minima cum vero dolore?
            </SettingCard>
            <SettingCard settingName='Fire' to='/fire' icon={<FireIcon className='w-8 h-8'/>} >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, provident neque! Deleniti voluptates, 
                labore veniam quo rerum obcaecati laboriosam amet nihil! Alias officiis esse iure molestiae minima cum vero dolore?
            </SettingCard>
            <SettingCard settingName='Fire' to='/fire' icon={<FireIcon className='w-8 h-8'/>} >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, provident neque! Deleniti voluptates, 
                labore veniam quo rerum obcaecati laboriosam amet nihil! Alias officiis esse iure molestiae minima cum vero dolore?
            </SettingCard>
        </div>
    )
}
