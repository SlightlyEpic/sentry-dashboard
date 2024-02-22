type AvatarProps = {
    image: string
    size: 'sm' | 'md' | 'lg' | 'xl'
    style?: string
}

export function Avatar(props: AvatarProps) {
    let sizes = {
        'sm': 'w-6 h-6 ',
        'md': 'w-8 h-8 ',
        'lg': 'w-12 h-12',
        'xl': 'w-16 h-16',
    };

    return <img src={props.image} className={'m-2 inline rounded-full ' + sizes[props.size] + ' ' + (props.style || '')} />
}
