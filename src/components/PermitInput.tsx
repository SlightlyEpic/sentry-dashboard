import { PermissionFlags, Permit } from '@/types/db'
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import { useReducer, useState } from 'react';

export type PermitInputProps = {
    permit: Permit;
}

const permissionFlags: PermissionFlags[] = [
    'MANAGE_CASES',
    'MANAGE_LOCKDOWN',
    'MANAGE_APPEALS',
    'MANAGE_SLOWMODE',
    'MANAGE_MODMAIL_THREADS',
    'MANAGE_APPLICATION_RESPONSES',
    'WARN_MEMBERS',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'MUTE_MEMBERS',
];

type PermitReducerAction = {
    type: 'removePermission' | 'addPermission' | 'togglePermission'
    payload: {
        permission: PermissionFlags
    }
} | {
    type: 'addRole' | 'removeRole'
    payload: {
        roleId: string
    }
};

const permitReducer = (state: Permit & { changed: boolean }, action: PermitReducerAction) => {
    const newState: typeof state = {
        locked: state.locked,
        name: state.name,
        permissions: [...state.permissions],
        roles: [...state.roles],
        users: [...state.users],
        changed: state.changed
    };

    switch(action.type) {
        case 'addPermission':
            if(state.permissions.includes(action.payload.permission)) return state;
            newState.permissions.push(action.payload.permission);
            newState.changed = true;
            break;
        case 'removePermission':
            if(!state.permissions.includes(action.payload.permission)) return state;
            newState.permissions = newState.permissions.filter(p => p != action.payload.permission);
            newState.changed = true;
            break;
        case 'togglePermission':
            if(state.permissions.includes(action.payload.permission)) newState.permissions = newState.permissions.filter(p => p != action.payload.permission);
            else newState.permissions.push(action.payload.permission);
            newState.changed = true;
            break;
        case 'addRole':
            if(state.roles.includes(action.payload.roleId)) return state;
            newState.roles.push(action.payload.roleId);
            newState.changed = true;
            break;
        case 'removeRole':
            if(!state.roles.includes(action.payload.roleId)) return state;
            newState.roles = newState.roles.filter(p => p != action.payload.roleId);
            newState.changed = true;
            break;
    }

    return newState;
}

export default function PermitInput({ permit }: PermitInputProps) {
    const [currPermit, dispatch] = useReducer(permitReducer, { ...permit, changed: false });
    const [permExpanded, setPermExpanded] = useState(false);
    const [rolesExpanded, setRolesExpanded] = useState(false);

    // So from what I get mongo will conver Int64 to this form
    type idkWhereThisCameFrom = {
        low: number
        high: number
        unsigned: boolean
    }

    return (
        <div className='flex flex-col text-white border border-bggrey-ll p-4 rounded-md bg-bgdark flex-grow'>
            <div className='mb-2 flex gap-2 justify-start items-center bg-transparent w-full font-mono'>
                {
                    currPermit.locked
                    ? <LockClosedIcon className='w-6 h-6 stroke-blurple' />
                    : <LockOpenIcon className='w-6 h-6 stroke-blurple' />
                }
                <div className='font-bold text-2xl text-blurple'>{currPermit.name}</div>
            </div>

            <div className='mt-2 mb-2 border-t border-bggrey-ll' />
            <div className={'mt-2 mb-2 text-2xl font-bold flex justify-between cursor-pointer '} onClick={() => setPermExpanded(s => !s)}>
                <div>Permissions</div>
                <ChevronDoubleDownIcon className={'w-6 h-6 transition-transform duration-300 ' + (permExpanded ? 'rotate-180' : '')}/>
            </div>
            <div className={
                'grid grid-cols-2 h-full rounded-md overflow-clip transition-all duration-300 ease-linear ' + 
                (currPermit.locked ? 'cursor-not-allowed ' : '') +
                (permExpanded ? 'max-h-96 ' : 'max-h-0 ')
            }>
                {
                    permissionFlags.map(flag => {
                        return <div
                            className={
                                'font-mono flex gap-2 transition-colors duration-300 p-2 rounded-md select-none ' +
                                (currPermit.locked ? 'cursor-not-allowed ' : 'cursor-pointer hover:bg-blurple ')
                            }
                            onClick={() => !currPermit.locked && dispatch({ type: 'togglePermission', payload: { permission: flag } })}
                            title={currPermit.locked ? 'Cannot edit locked permits.' : ''}
                            key={flag}
                        >
                            <CheckCircleIcon className={'w-6 h-6 ' + (currPermit.permissions.includes(flag) ? '' : 'invisible ')} />
                            <div>{flag}</div>
                        </div>
                    })
                }
            </div>

            <div className='mt-2 mb-2 border-t border-bggrey-ll' />
            <div className='mt-2 text-2xl font-bold flex justify-between cursor-pointer' onClick={() => setRolesExpanded(s => !s)}>
                <div>Roles</div>
                <ChevronDoubleDownIcon className={'w-6 h-6 transition-transform duration-300 ' + (rolesExpanded ? 'rotate-180' : '')}/>
            </div>
            <div className={
                'mt-2 flex flex-col font-mono h-full rounded-md overflow-clip transition-all duration-0 ease-linear ' + 
                (currPermit.locked ? 'cursor-not-allowed ' : '') +
                (rolesExpanded ? 'max-h-96 ' : 'max-h-0 ')
            }>
                {
                    // currPermit.roles.map(role => <div key={role}>{role}</div>)

                    currPermit.roles.map(role => {
                        if(typeof role === 'number') return <div key={`${role}`}>{role}</div>
                        
                        const role2 = role as unknown as idkWhereThisCameFrom;
                        return <div key={`${role2.high}${role2.low}`}>{`${role2.high}${role2.low}`}</div>
                    })
                }
            </div>
        </div>
    )
}
