import { useState } from 'react';
import { Message } from '@/types/db'
import StringInput from './StringInput';
import { EmbedEditor } from './EmbedEditor';
import { EmbedViewer } from './EmbedViewer';

export type TemplateInputProps = {
    template: Message
}

export function TemplateInput({ template }: TemplateInputProps) {
    const [isEditing, setIsEditing] = useState(true);

    return <div className='flex flex-col gap-4 border border-bggrey-ll p-4 rounded-md bg-bgdark'>
        <div className='font-bold text-xl'>Name</div>
        <StringInput text={template.name} saveToRedux={() => {}} saveToServer={async () => 'Success'} />
        <div className='font-bold text-xl'>Content</div>
        <StringInput multiline text={template.content} saveToRedux={() => {}} saveToServer={async () => 'Success'} />
        <div className='border-t border-bggrey-ll' />
        {
            isEditing
            ? <EmbedEditor embed={template.embed} />
            : <EmbedViewer embed={template.embed} />
        }
        <button 
            type="button" 
            className='self-end w-32 h-10 bg-green-700 rounded-md text-md font-bold px-4 py-1 hover:bg-green-500'
            onClick={() => setIsEditing(!isEditing)}
        >
            Edit embed
        </button>
    </div>
}