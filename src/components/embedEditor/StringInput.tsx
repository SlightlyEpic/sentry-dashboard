export interface StringInputProps {
    text: string
    onChange?: (value: string) => unknown
}

export default function StringInput({ text, onChange }: StringInputProps) {
    return (
        <div className='h-12 flex gap-2 items-center text-white border border-bggrey-ll p-2 rounded-md bg-bgdark flex-grow'>
            <input 
                defaultValue={text}
                className='bg-transparent focus:outline-none w-full font-mono pl-2'
                onChange={e => {
                    if(onChange) onChange(e.target.value)
                }}
            />
        </div>
    )
}
