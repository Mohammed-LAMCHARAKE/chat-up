import React, { useRef } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import auth from '../api/authentication'
import useUser from '../hooks/useUser'

function Login(props) {
  const user = useUser()
  const data = useRef({ email: '', password: '' }).current
  const navigate = useNavigate()

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const response = await auth.login(data.email, data.password)
    navigate('/chat')
  }

  const handleChange = (ev) => {
    data[ev.target.name] = ev.target.value
  }

  return user?.uid ? (
    <Navigate to='/chat' />
  ) : (
    <section class='h-full'>
      <div class='grid grid-cols-1 h-screen'>
        <div class='flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24'>
          <div class='xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto'>
            <h2 class='text-3xl text-center font-bold leading-tight text-black sm:text-4xl'>
              Login
            </h2>

            <form onSubmit={handleSubmit} class='mt-8'>
              <div class='space-y-5'>
                <div>
                  {/* <label for='' class='text-base font-medium text-gray-900'>
                    Email{' '}
                  </label> */}
                  <div class='mt-2.5 relative text-gray-400 focus-within:text-gray-600'>
                    <div class='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <svg
                        class='w-5 h-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                        />
                      </svg>
                    </div>

                    <input
                      type='email'
                      name='email'
                      placeholder='Email'
                      class='block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  {/* <label for='' class='text-base font-medium text-gray-900'>
                    Password{' '}
                  </label> */}
                  <div class='mt-2.5 relative text-gray-400 focus-within:text-gray-600'>
                    <div class='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <svg
                        class='w-5 h-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'
                        />
                      </svg>
                    </div>

                    <input
                      type='password'
                      name='password'
                      placeholder='Password'
                      class='block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type='submit'
                    class='inline-flex items-center justify-center w-full px-4 py-4 text-lg font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80'
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            {/* <div class='mt-3 space-y-3'>
              <button
                type='button'
                class='relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none'
              >
                <div class='absolute inset-y-0 left-0 p-4'>
                  <svg
                    class='w-6 h-6 text-[#2563EB]'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z'></path>
                  </svg>
                </div>
                Sign up with Facebook
              </button>
            </div> */}

            <p class='mt-2 text-center text-gray-600'>
              Already have an account?{' '}
              <Link
                to='/signup'
                title=''
                class='font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline'
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
