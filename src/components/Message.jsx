import React from 'react'
import useChat from '../hooks/useChat'
import useUser from '../hooks/useUser'

function Message({ message }) {
  const currentUser = useUser()
  const { data } = useChat()

  return message.senderId == currentUser.uid ? (
    <div class='col-start-6 col-end-13 p-2 rounded-lg'>
      <div class='flex items-center justify-start flex-row-reverse'>
        <div class='h-16 w-16 rounded-full bg-indigo-500 flex-shrink-0 overflow-hidden border-2 border-gray-300'>
          <img
            src={
              currentUser.photoURL ||
              'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg'
            }
          />
        </div>
        <div class='relative mr-3 text-sm bg-indigo-200 py-2 px-4 shadow rounded-xl mb-2'>
          <img src={message.image} className='rounded-xl h-full mx-auto' />
          <div className='text-gray-800 text-base whitespace-pre-line'>
            {message.text}
          </div>
          <div class='absolute w-[200%] text-right text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500 '>
            {new Date(message.date.seconds * 1000).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div class='col-start-1 col-end-8 p-3 rounded-lg'>
      <div class='flex flex-row items-center'>
        <div class='flex items-center justify-center h-14 w-14 rounded-full bg-indigo-500 flex-shrink-0 overflow-hidden'>
          <img
            src={
              data.user.photoURL ||
              'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg'
            }
          />
        </div>
        <div class='relative ml-3 text-sm bg-gray-200 py-2 px-4 shadow rounded-xl'>
          <img src={message.image} className='rounded-xl h-full mx-auto' />
          <div className='text-gray-800'>{message.text}</div>
          <div class='absolute w-[200%] text-left text-xs bottom-0 left-0 -mb-5 text-gray-500 '>
            {new Date(message.date.seconds * 1000).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
