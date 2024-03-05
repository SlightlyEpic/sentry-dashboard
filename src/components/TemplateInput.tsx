import { useCallback, useRef, useState } from 'react';
import { Message } from '@/types/db'
import { EmbedEditor } from './EmbedEditor';
import { EmbedViewer } from './EmbedViewer';
import { useAppDispatch } from '@/redux/hooks';
import { setMessageTemplateAT } from '@/redux/guildSlice';

export type TemplateInputProps = {
    template: Message
}

export function TemplateInput({ template }: TemplateInputProps) {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useAppDispatch();
    const viewerRef = useRef<HTMLDivElement>(null);

    const saveMessage = useCallback(async (message: Message) => {
        await dispatch(setMessageTemplateAT(message));
        setIsEditing(false);
        viewerRef.current!.scrollIntoView({ behavior: 'smooth' });
    }, [dispatch]);

    return <div ref={viewerRef} className='flex flex-col gap-4 border border-bggrey-ll p-4 rounded-md bg-bgdark'>
        {/* <div className='font-bold text-xl'>Name</div>
        <StringInput text={template.name} saveToRedux={() => {}} saveToServer={async () => 'Success'} />
        <div className='font-bold text-xl'>Content</div>
        <StringInput multiline text={template.content} saveToRedux={() => {}} saveToServer={async () => 'Success'} />
        <div className='border-t border-bggrey-ll' /> */}
        {
            isEditing
            ? <EmbedEditor message={template} save={saveMessage} />
            : <div>
                <div className='font-bold text-xl'>{ template.name }</div>
                <EmbedViewer message={template} />
            </div>
        }
        {!isEditing && <button 
            type="button" 
            className='self-end w-36 h-10 bg-green-700 rounded-md text-md font-bold px-4 py-1 hover:bg-green-500'
            onClick={() => setIsEditing(!isEditing)}
        >
            Edit Message
        </button>}
    </div>
}