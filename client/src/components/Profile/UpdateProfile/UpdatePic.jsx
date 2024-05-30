import React, { useContext, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';

const UpdatePic = () => {
    const [file, setFile] = useState(null);
    const [err, setErr] = useState('')

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const token = document.cookie.split('=')[1]
    const { updateProfilePic } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profilePic', file);
        try {
            await updateProfilePic(formData, token);
            window.history.back();
        } catch (error) {
            setErr(error.response)
        }
    };

    return (
        <div>
            <div className='w-3/6 mx-auto'>
                <div>
                    <h1 className='text-center text-2xl font-bold my-5'>Update Profile Pic</h1>
                </div>
                <div className=' flex justify-center'>
                    {
                        err && <p className='text-center font-semibold text-red-700 px-10'>{err}</p>
                    }
                </div>
                <hr className='' />
                <div className='my-3'>
                    <p className='font-semibold'>Profile Pic</p>
                    <input type="file" onChange={onFileChange} className='border outline-none p-1 px-2 rounded-lg w-full my-1' />
                </div>
                <div className='my-3'>
                    <div className='m-5 flex justify-center'>
                        <button className='w-full py-2 text-white bg-blue-500 rounded-lg text-md' onClick={handleSubmit}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePic;
