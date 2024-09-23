import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='bg-blue-600'>
            <nav className='py-4 container'>
                <div className='flex justify-between'>
                    <Link to={'/'} className='text-xl text-white font-semibold'>Weather Forecast</Link>
                    <p className='text-base text-white'>Time Spent: <span className='font-semibold'>4hrs</span></p>
                </div>
            </nav>
        </header>

    )
}

export default Header