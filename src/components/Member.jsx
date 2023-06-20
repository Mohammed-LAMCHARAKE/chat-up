import React from 'react'

function Member({ member, lastMessage, onChoose }) {
  return (
    <div
      className='w-full text-left py-0.5 mb-1 focus:outline-none cursor-pointer focus-visible:bg-indigo-50 bg-slate-300/70 hover:bg-gray-300 rounded-lg overflow-hidden'
      onClick={onChoose}
    >
      <div className='flex items-center'>
        <div className='h-16 w-16 mx-3 rounded-full overflow-hidden border-4 border-slate-400'>
          <img
            src={
              member?.photoURL ||
              'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg'
            }
          />
        </div>

        <div>
          <h4 className='text-md font-semibold text-indigo-800'>
            {member?.fullName || 'Name Placeholder'}
          </h4>
          <div className='text-[13px] max-w-[80%] truncateS'>
            {lastMessage}{' '}
          </div>
          {/* <div className='text-[13px]'>{lastMessage ?? 'No way 🤙! · 11 Mar'} </div> */}
        </div>
      </div>
    </div>
  )
}

export default Member
