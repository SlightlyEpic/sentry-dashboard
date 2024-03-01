import { useCallback, useState } from 'react'

export type SwitchButtonProps = {
    state: boolean
    onChange: (state: boolean) => unknown
}

export default function SwitchButton({ state, onChange }: SwitchButtonProps) {
    const [currState, setCurrState] = useState(state);

    const toggle = useCallback(async () => {
        setCurrState(!currState);
        onChange(!currState)
    }, [currState, onChange]);

    return <div className='flex grow-0 w-12 h-4 gap-2'>
        <div
            onClick={toggle}
            className={
                'w-full h-full aspect-[2] rounded-full overflow-hidden transition-all duration-500 ' +
                (currState ? 'bg-green-500 ring-1 ring-white ' : 'bg-bgdark-l ring-1 ring-blurple ')
            }
        >
            <div
                className={
                    'h-full aspect-square bg-slate-100 rounded-full transition-all duration-500 ' +
                    (currState ? 'translate-x-[200%]' : '')
                }
            />
        </div>
    </div>;
}
