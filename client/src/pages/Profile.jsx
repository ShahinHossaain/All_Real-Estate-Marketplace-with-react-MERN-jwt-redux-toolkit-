import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { currentUser } = useSelector(state => state.user)
    console.log(currentUser)
    return (
        <div className=" p-3">
            <h1 className="text-3xl font-semibold  my-7 text-center">Profile</h1>
            <form className='flex flex-col gap-4 sm:max-w-lg mx-auto'>
                <img src={currentUser.avatar} alt="Profile Avatar" className="mt-2 rounded-full h-24 w-24 object-cover cursor-pointer self-center" />
                <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' />
                <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' />
                <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' />
                <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
                <button className='bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>create Listing</button>
            </form>
            <div className='flex justify-between text-red-600 mt-5 sm:max-w-lg mx-auto'>
                <p className='cursor-pointer'>Delete Account</p>
                <p className='cursor-pointer'>Sign out</p>
            </div>

        </div>

    );
};

export default Profile;