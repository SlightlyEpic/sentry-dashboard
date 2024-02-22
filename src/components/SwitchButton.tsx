export type SwitchButtonProps = {
    state: boolean
    setState: React.Dispatch<React.SetStateAction<boolean>>
    disabled?: boolean
}

export default function SwitchButton({ state, setState }: SwitchButtonProps) {
    return (
    <div
        onClick={() => setState(!state)}
        className={
            'h-full aspect-[2] rounded-full overflow-hidden cursor-pointer transition-all duration-500 ' +
            (state ? 'bg-green-500 ring-1 ring-white' : 'bg-bgdark-l ring-1 ring-blurple')
        }
    >
        <div
            className={
                'h-full aspect-square bg-slate-100 rounded-full transition-all duration-500 ' +
                (state ? 'translate-x-full' : '')
            }
        />
    </div>
    );
}
