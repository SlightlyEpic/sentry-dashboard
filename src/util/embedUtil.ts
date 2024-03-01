import { DeepPartial } from '@/types/typeMagic';

export function removeFalsyProperties<T>(obj: T): DeepPartial<T> | null {
    /* eslint-disable no-extra-boolean-cast */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    if(typeof obj !== 'object') return obj as DeepPartial<T>;
    
    let clean: any = {};
    
    for(let key in obj) {
        if(typeof obj[key] === 'object') {
            const recurse = removeFalsyProperties(obj[key]);
            if(!!recurse) clean[key] = recurse;
        } else if(!!obj[key]) {
            clean[key] = obj[key];
        }
    }

    if(Object.keys(clean).length === 0) return null;
    return clean;

    /* eslint-enable no-extra-boolean-cast */
    /* eslint-enable @typescript-eslint/no-explicit-any */
}

export function numberToHexStr(color: number = 0): string {
    return `#${color.toString(16)}`;
}
