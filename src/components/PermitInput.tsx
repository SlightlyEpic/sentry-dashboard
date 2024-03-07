import { CompactRole, PermissionFlags, Permit } from '@/types/db'
import { LockClosedIcon, LockOpenIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ChevronDoubleDownIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useCallback, useReducer, useRef, useState } from 'react';
import SaveStatus, { SaveStatusProps } from './SaveStatus';
import { useAppSelector } from '@/redux/hooks';

export type PermitInputProps = {
    permit: Permit;
    save: (permit: Permit) => Promise<unknown>
}

const permissionFlags: [PermissionFlags, string][] = [
    ['MANAGE_CASES', 'Manage Cases'],
    ['MANAGE_LOCKDOWN', 'Manage Lockdown'],
    ['MANAGE_APPEALS', 'Manage Appeals'],
    ['MANAGE_SLOWMODE', 'Manage Slowmode'],
    ['MANAGE_MODMAIL_THREADS', 'Manage ModMail Threads'],
    ['MANAGE_APPLICATION_RESPONSES', 'Manage App Responses'],
    ['WARN_MEMBERS', 'Warn Members'],
    ['KICK_MEMBERS', 'Kick Members'],
    ['BAN_MEMBERS', 'Ban Members'],
    ['MUTE_MEMBERS', 'Mute Members'],
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
            newState.permissions = newState.permissions.filter(p => p !== action.payload.permission);
            newState.changed = true;
            break;
        case 'togglePermission':
            if(state.permissions.includes(action.payload.permission)) newState.permissions = newState.permissions.filter(p => p !== action.payload.permission);
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
            newState.roles = newState.roles.filter(p => p !== action.payload.roleId);
            newState.changed = true;
            break;
    }

    return newState;
}

export default function PermitInput({ permit, save }: PermitInputProps) {
    const guild = useAppSelector(state => state.guild);
    const [currPermit, dispatch] = useReducer(permitReducer, { ...permit, changed: false });
    const [permExpanded, setPermExpanded] = useState(false);
    const [rolesExpanded, setRolesExpanded] = useState(false);
    const [saveStatus, setSaveStatus] = useState<SaveStatusProps['status']>('idle');
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const roleSelectRef = useRef<HTMLSelectElement>(null);
    const [roleSaveStatus, setRoleSaveStatus] = useState<SaveStatusProps['status']>('idle');
    const [roleTimeoutId, setRoleTimeoutId] = useState<ReturnType<typeof setTimeout>>();

    const trySave = useCallback(async () => {
        if(!currPermit.changed) return;
        if(saveStatus === 'saving') return;
        clearTimeout(timeoutId);
        
        try {
            setSaveStatus('saving');
            await save(currPermit);
            setSaveStatus('success');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        } catch(err) {
            setSaveStatus('error');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        }
    }, [timeoutId, currPermit, save, saveStatus]);

    const addRole = useCallback(async (role: CompactRole) => {
        if(roleSaveStatus === 'saving') return;
        clearTimeout(roleTimeoutId);

        try {
            setRoleSaveStatus('saving');
            dispatch({ type: 'addRole', payload: { roleId: role.id } });
            await save(currPermit);
            setRoleSaveStatus('success');
            setRoleTimeoutId(setTimeout(setRoleSaveStatus, 2000, 'idle'));
            dialogRef.current?.close();
        } catch(err) {
            dispatch({ type: 'removeRole', payload: { roleId: role.id } });     // Rollback
            setRoleSaveStatus('error');
            setRoleTimeoutId(setTimeout(setRoleSaveStatus, 2000, 'idle'));
        }
    }, [currPermit, roleSaveStatus, roleTimeoutId, save]);

    const roleKeys = Object.keys(guild.data!.roles);

    return (<>
        <dialog ref={dialogRef} className='absolute'>
            <div className='flex flex-col gap-4 p-8 bg-bgdark text-white'>
                <div className='text-xl font-bold'>Choose a role</div>
                <select ref={roleSelectRef} name='templateSelect' className='custom-select' defaultValue={guild.data!.adwarning_settings.message_template?.name ?? 'No template selected'}>
                {
                    roleKeys
                        .filter(roleId => !currPermit.roles.includes(roleId))
                        .map(roleId => <option key={roleId} className='custom-option' value={roleId}>
                        {guild.data!.roles[roleId].name}
                    </option>)
                }
                </select>

                <div className='flex gap-4 justify-between p-2'>
                    <button
                        className='h-8 rounded-md bg-rose-600 hover:bg-rose-500 w-1/2'
                        onClick={() => dialogRef.current?.close()}
                    >
                        Cancel
                    </button>
                    <button className='h-8 rounded-md bg-green-600 hover:bg-green-500 w-1/2 flex items-center justify-center'>
                        {
                            roleSaveStatus === 'idle'
                            ? <div 
                                className='grow'
                                onClick={() => roleSelectRef.current?.value && addRole(guild.data!.roles[roleSelectRef.current?.value])}
                            >
                                Save
                            </div>
                            : <div className='stroke-white p-2'><SaveStatus status={roleSaveStatus} /></div>
                        }
                    </button>
                </div>
            </div>
        </dialog>
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
            <div className={'mt-2 mb-2 text-2xl font-bold flex justify-between items-center cursor-pointer '} onClick={() => setPermExpanded(s => !s)}>
                <div>Permissions</div>
                <ChevronDoubleDownIcon className={'w-6 h-6 transition-transform duration-300 ' + (permExpanded ? 'rotate-180' : '')}/>
            </div>
            <div className={
                'grid grid-cols-1 lg:grid-cols-2 h-full rounded-md overflow-clip transition-all duration-300 ease-out ' + 
                (currPermit.locked ? 'cursor-not-allowed ' : '') +
                (permExpanded ? 'max-h-[25rem] lg:max-h-[12.5rem] ' : 'max-h-0 ')
            }>
                {
                    permissionFlags.map(([flag, flagStr]) => {
                        return <div
                            className={
                                'h-10 font-mono flex gap-2 transition-colors duration-300 p-2 rounded-md select-none ' +
                                (currPermit.locked ? 'cursor-not-allowed ' : 'cursor-pointer hover:bg-blurple ')
                            }
                            onClick={() => !currPermit.locked && dispatch({ type: 'togglePermission', payload: { permission: flag } })}
                            title={currPermit.locked ? 'Cannot edit locked permits.' : ''}
                            key={flag}
                        >
                            <CheckCircleIcon className={'w-6 h-6 ' + (currPermit.permissions.includes(flag) ? '' : 'invisible ')} />
                            <div>{flagStr}</div>
                        </div>
                    })
                }
            </div>

            <div className='mt-2 mb-2 border-t border-bggrey-ll' />
            <div className='mt-2 text-2xl font-bold flex justify-between items-center cursor-pointer' onClick={() => setRolesExpanded(s => !s)}>
                <div>Roles</div>
                <ChevronDoubleDownIcon className={'w-6 h-6 transition-transform duration-300 ' + (rolesExpanded ? 'rotate-180' : '')}/>
            </div>
            <div className={
                'mt-2 flex flex-col font-mono h-full rounded-md overflow-clip transition-all duration-150 ease-linear ' + 
                (currPermit.locked ? 'cursor-not-allowed ' : '') 
                // (rolesExpanded ? 'max-h-[25rem] lg:max-h-[12.5rem] ' : 'max-h-0 ')
                }
                style={{
                    height: rolesExpanded ? `${(currPermit.roles.length * 3 + 2.5).toFixed(2)}rem` : '0'
                }}
                // style={{
                //     height: rolesExpanded ? `${(roleKeys.length * 2.5 + 2.5).toFixed(2)}rem` : '0'
                // }}
            >
                {
                    currPermit.roles.map(role => {
                        const cRole: CompactRole | undefined = guild.data!.roles[role];
                        return <div className='flex' key={role}>
                            <div className='peer flex items-center justify-center p-2 transition-all duration-300 bg-transparent hover:bg-rose-500 cursor-pointer rounded-l-md'>
                                <TrashIcon
                                    className='w-6 h-6' 
                                    onClick={() => dispatch({ type: 'removeRole', payload: { roleId: role } })} 
                                />
                            </div>
                            <div 
                                className='h-10 w-full flex items-center peer-hover:bg-blurple hover:bg-blurple rounded-r-md transition-all duration-300 p-2 '
                                style={{ color: cRole ? `#${cRole.color.toString(16)}` : '0' }}
                            >
                                <div className='w-1/2'>{cRole?.name ?? 'Unknown role'}</div>
                                <div className='hidden md:block'>{role}</div>
                            </div>
                        </div>
                    })
                }

                <div className='flex justify-end'>
                    <button
                        type="button"
                        onClick={() => {}}
                        className='flex items-center w-full sm:w-max justify-center h-10 gap-1 bg-green-700 rounded-md text-md font-bold px-4 py-1 hover:bg-green-500 '
                    >
                        <PlusCircleIcon className='w-6 h-6 translate-y-[0.07rem]' />
                        <div className='text-xl text-center' onClick={() => dialogRef.current?.showModal()}>Add Role</div>
                    </button>
                </div>
            </div>

            <div className='mt-2 mb-2 border-t border-bggrey-ll' />
            <div className='mt-2 flex items-center justify-end w-full h-8 gap-2'>
                <SaveStatus status={saveStatus} />
                <button
                    type="button"
                    onClick={trySave}
                    className={
                        'bg-green-700 rounded-md text-md font-bold px-4 py-1 ' +
                        (!currPermit.changed ? 'cursor-not-allowed brightness-50 ' : 'hover:bg-green-500 ') +
                        (saveStatus === 'saving' ? 'brightness-50 hover:bg-green-700 ' : '')
                    }
                >
                    Save
                </button>
            </div>
        </div>
    </>)
}
