import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';


const Profile = () => {
    const fileRef = useRef(null)
    const { currentUser, loading, error } = useSelector(state => state.user)
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [isText, setIsText] = useState(false);
    console.log("currentUser", currentUser)

    const dispatch = useDispatch()

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file])

    const handleFileUpload = (file) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(progress.toFixed(2))
                setFileUploadError(false);
            },
            (error) => {
                setFileUploadError(true)
                console.log(error)
            },
            () => {

                // getDownloadURL(storageRef) we can use this

                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => setFormData({ ...formData, avatar: downloadURL }))
            }
        )
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));
            toast.success('Successfully updated!');
        } catch (error) {
            dispatch(updateUserFailure(error.message))
        }
    }

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSighOut = async () => {
        try {
            dispatch(signOutUserStart())
            const res = await fetch('/api/user/signout');
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess(data));

        } catch (error) {
            dispatch(signOutUserFailure(error.message))
        }
    }

    return (
        <div className="p-3">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <h1 className="text-3xl font-semibold  my-7 text-center">Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 sm:max-w-lg mx-auto'>
                <input
                    onChange={e => setFile(e.target.files[0])}
                    type="file"
                    ref={fileRef}
                    hidden
                    accept='image/*' />
                <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile Avatar" className="mt-2 rounded-full h-24 w-24 object-cover cursor-pointer self-center" />
                <div className='text-center text-sm'>
                    {
                        fileUploadError ? (
                            <span className='text-red-700'>Error image upload (image must be less than 2mb )</span>
                        ) : filePerc > 0 && filePerc < 100.00 ? (
                            <span className='text-slate-700'>uploading {filePerc}%</span>
                        ) : filePerc == 100.00 ? (
                            <span className='text-green-700'>successfully uploaded</span>
                        ) : (
                            ''
                        )
                    }

                </div>
                <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' defaultValue={currentUser.username} onChange={handleChange} />
                <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' defaultValue={currentUser.email} onChange={handleChange} />
                <div className="relative flex items-center">
                    <input
                        type={isText ? "text" : "password"}
                        placeholder="Password"
                        className="border p-3 rounded-lg w-full"
                        id="password"
                        onChange={handleChange}
                    />
                    {!isText ? <FaEye
                        onClick={() => setIsText(!isText)}
                        className="absolute right-3 cursor-pointer"
                        size={20}
                        color="gray"
                    />
                        :
                        <FaEyeSlash
                            onClick={() => setIsText(!isText)}
                            className="absolute right-3 cursor-pointer"
                            size={20}
                            color="gray"
                        />}
                </div>

                <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "loading ..." : "update"}</button>
                <Link to="/create-listing" className='bg-green-700 text-whit text-center text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>create Listing</Link>
                {error ? <p className='text-red-700 '>{error}</p> : ''}

            </form>
            <div className='flex justify-between text-red-600 mt-5 sm:max-w-lg mx-auto'>
                <p onClick={handleDeleteUser} className='cursor-pointer'>Delete Account</p>
                <p onClick={handleSighOut} className='cursor-pointer'>Sign out</p>
            </div>
        </div >

    );
};

export default Profile;