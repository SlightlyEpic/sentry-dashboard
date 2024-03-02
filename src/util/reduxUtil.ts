import { useAppDispatch } from '@/redux/hooks';

// This will return a promise which rejects if the dispatch call isnt fulfilled
// or pass through the return value otherwise
// ~ Idk how to type dispatchCall, i cant figure out the generics dispatch uses
// ~ The union is just to remoind me in the future what the goal was
/* eslint-disable-next-line */
export async function dispatchWhichRejects(dispatchCall: ReturnType<ReturnType<typeof useAppDispatch>> | any) {
    const res = await dispatchCall;
    if(res.meta.requestStatus === 'rejected') {
        console.log('Dispatch rejected:', res);
        throw res.error;
    }
    return res;
}
