
interface BooleanInputProps {
    name: string;
    onSave: () => void;
    onEdit: () => void;
    isEdit: boolean;

}

const BooleanInput = ({ name, onSave, onEdit, isEdit }: BooleanInputProps) => {

    return (
        <>
            <div className='flex justify-between border border-bggrey-ll p-2 rounded-md bg-bgdark m-2'>
                {!isEdit && <>
                    <div className='place-self-center'>
                        {name}
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
                        <div className="flex justify-center align-middle items-center">
                            <input type="radio" className='bg-bggrey-ll  scale-125 accent-blurple'
                                name={name}
                                id="Yes"
                                value={"Yes"}
                            />
                            <label htmlFor="Yes" className="text-white text-center px-2 text-lg font-semibold">Yes</label>
                            
                        </div>

                        <div className="flex justify-center align-middle items-center">
                            <input type="radio" className='bg-bggrey-ll scale-125 accent-blurple'
                                name={name}
                                id="No"
                                value={"No"}
                            />
                            <label htmlFor="No" className="text-white px-2 text-center text-lg font-semibold">No</label>
                            
                        </div>
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

export default BooleanInput