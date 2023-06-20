import React from 'react'

function SearchBox({ onSearch }) {
  return (
    <div className='mt-2.5 relative text-gray-400 focus-within:text-gray-600'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <svg
          className='w-5 h-5 text-gray-500 dark:text-gray-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          ></path>
        </svg>
      </div>
      <input
        type='search'
        placeholder='Search...'
        className='block w-full py-3 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-400 rounded-full bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
        onKeyUp={(ev) => onSearch(ev.target.value)}
      />
    </div>
  )
}

export default SearchBox
