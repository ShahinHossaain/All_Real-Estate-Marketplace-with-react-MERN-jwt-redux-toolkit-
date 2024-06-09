import React from 'react';
import { ImSearch } from "react-icons/im";
import ActiveLink from '../../shared/ActiveLink';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Header = () => {

    const { currentUser } = useSelector(state => state.user)
    console.log('sata', currentUser)

    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap items-center'>
                        <span className='text-slate-500'>Rich</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>

                <form className='flex items-center bg-slate-100 rounded-lg p-2 sm:p-3'>
                    <input
                        type="text"
                        placeholder='Search...'
                        className='bg-transparent focus:outline-none w-28 sm:w-64'
                    />
                    <ImSearch className='text-slate-600' />
                </form>

                <ul className='flex gap-5'>
                    {/* <ActiveLink to='/'>
                        <li className='hidden sm:list-item text-slate-700 cursor-pointer hover:underline underline-offset-4'>Home</li>
                    </ActiveLink>

                    <ActiveLink to='/about'>
                        <li className='hidden sm:list-item text-slate-700 cursor-pointer hover:underline underline-offset-4'>About</li>
                    </ActiveLink>

                    <ActiveLink to='/sign-in'>
                        <li className='text-slate-700 cursor-pointer hover:underline underline-offset-4'>Sign in</li>
                    </ActiveLink> */}
                    <li className='hidden sm:list-item'><ActiveLink to='/' >Home</ActiveLink></li>
                    <li className='hidden sm:list-item'><ActiveLink to='/about' >About</ActiveLink></li>
                    {
                        currentUser ? <ActiveLink to='/profile'><img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar}></img></ActiveLink> : <li> <ActiveLink to='/sign-in'>Sign In</ActiveLink></li>
                    }

                </ul>
            </div>

        </header>
    );
};

export default Header;