
interface StringInputProps {
    text: string;
    onSave: () => void;
    onEdit: () => void;
    isEdit: boolean;
}

const StringInput = ({ text, onSave, onEdit, isEdit }: StringInputProps) => {

    return (
        <>
            <div className='flex justify-between border border-bggrey-ll p-2 rounded-md bg-bgdark m-2'>
                {!isEdit && <>
                    <div className='place-self-center'>
                        {text}
                    </div>


                    <button type="button" className='text-white self-start mt-auto bg-blurple hover:bg-bgdark
                        hover:ring-2 hover:ring-blurple-l rounded-md text-md font-bold px-4 py-1'
                        onClick={onEdit}
                    >
                        Edit
                    </button>
                </>
                }

                {isEdit &&
                    <>
                        <input type="text" className='bg-bggrey-ll rounded-md
                                focus:outline-none p-1 focus:outline-1 focus:outline-blurple-ll'
                            id={text}
                            defaultValue={text}        
                        />
                        <button type="button" className='text-white self-start mt-auto bg-blurple hover:bg-bgdark
                        hover:ring-2 hover:ring-blurple-l rounded-md text-md font-bold px-4 py-1'
                            onClick={onSave}
                        >
                            Save
                        </button>
                    </>
                }
            </div>
        </>
    )
}

export default StringInput