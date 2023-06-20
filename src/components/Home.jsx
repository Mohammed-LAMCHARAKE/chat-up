import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import useUser from '../hooks/useUser'

function Home(props) {
  return useUser()?.uid ? (
    <Navigate to='/chat' />
  ) : (
    <section className='py-10 sm:py-15 lg:py-24 bg-indigo-600'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='grid items-center grid-cols-1 gap-12 lg:grid-cols-2'>
          <div>
            {/* <p className='text-base font-semibold tracking-wider text-blue-600 uppercase'>
                A social media for learners
              </p> */}
            <h1 className='mt-4 text-3xl font-bold text-white lg:mt-8 sm:text-6xl xl:text-7xl'>
              Connect With People From All Over The World
            </h1>

            <Link
              to='/login'
              className='inline-flex items-center px-6 py-4 mt-8 font-semibold transition-all duration-200 bg-white text-indigo-600 rounded-full lg:mt-16 hover:bg-indigo-600 hover:text-white'
              role='button'
            >
              Join for free
              <svg
                className='w-6 h-6 ml-8 -mr-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='1.5'
                  d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </Link>
          </div>

          <div>
            <img
              className='w-full'
              src='https://www.stay-app.com/hs-fs/hubfs/StayApp_June2022/images/Chat_hero.png?width=1040&height=1120&name=Chat_hero.png'
              // src='https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
