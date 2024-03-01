import { forwardRef } from 'react';

export interface StringInputProps {
    text: string
}

export default forwardRef<HTMLInputElement, StringInputProps>(
    function StringInput({ text }, ref) {
        return (
            <div className='h-12 flex gap-2 items-center text-white border border-bggrey-ll p-2 rounded-md bg-bgdark flex-grow'>
                <input 
                    defaultValue={text}
                    className='bg-transparent focus:outline-none w-full font-mono pl-2'
                    ref={ref}
                />
            </div>
        )
    }
);
