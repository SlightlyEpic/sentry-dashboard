export type StaticSwitchProps = {
    state: boolean
}

export default function StaticSwitch({ state }: StaticSwitchProps) {
    return (
    <div
        className={
            'h-full aspect-[2] rounded-full overflow-hidden cursor-not-allowed transition-all duration-500 brightness-50 ' +
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
