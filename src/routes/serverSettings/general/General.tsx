import BooleanInput from '@/components/BooleanInput';
import StringInput from '@/components/StringInput';
import { useState } from 'react';
import { RouteObject } from 'react-router-dom';

export const routerData: RouteObject = {
    path: 'general/',
    element: <GeneralSettings />,
}



export default function GeneralSettings() {
    const [isEdit, setEdit] = useState(false);

    const onEdit = () => {
        setEdit(!isEdit);
    }

    const onSave = () => {
        setEdit(!isEdit);
    }

    const prefix = 'p';
    return (
        <div className="flex flex-col h-fit w-full text-white">

            <div className='self-center h-fit w-fit p-2 m-2 text-4xl'>General Settings</div>

            <div className='p-2 m-2'>

                <div className='items-center p-2 m-2'>
                    <div className='text-xl p-2 m-2'>Prefix</div>
                    
                    <StringInput onSave={onSave} onEdit={onEdit} isEdit={isEdit} text={prefix} />
                </div>

                <div className='items-center p-2 m-2'>
                    <div className='text-xl p-2 m-2'>Moderation Stats</div>
                    <BooleanInput onSave={onSave} onEdit={onEdit} isEdit={isEdit} name={prefix} />

                    

                </div>
                <div className='items-center p-2 m-2'>
                    
                    <div className='text-xl p-2 m-2'>Compact Response</div>
                    
                    <div className='flex justify-between border border-bggrey-ll p-2 rounded-md bg-bgdark m-2'>
                        <div className='mr-2 place-self-center'>
                            abcdefg
                        </div>
                        
                        
                        <button type="button" className='text-white self-start mt-auto bg-blurple hover:bg-bgdark
                                            hover:ring-2 hover:ring-blurple-l rounded-md text-md font-bold px-4 py-1'
                        >
                            Edit
                        </button>
                    </div>
                </div>
                <div className='items-center justify-start flex p-2 m-2 text-xl'>
                    <div className='p-2 m-2'>
                        Premium
                        
                    </div>
                    <div>
                        YES
                    </div>
                </div>
            </div>

        </div>
    )
}
