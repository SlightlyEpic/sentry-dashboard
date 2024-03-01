export interface ContentInputProps {
    text: string
    onChange?: (value: string) => unknown
}

export default function StringInput({ text, onChange }: ContentInputProps) {
    return (
        <div className='min-h-12 flex gap-2 items-center text-white border border-bggrey-ll p-2 rounded-md bg-bgdark flex-grow'>
            <textarea 
                className='w-full min-h-36 bg-transparent text-wrap outline-none px-2 font-mono'
                role='textbox'
                contentEditable
                suppressContentEditableWarning={true}
                defaultValue={text}
                onChange={e => {
                    if(onChange) onChange(e.target.value)
                }}
            />
        </div>
    )
}
