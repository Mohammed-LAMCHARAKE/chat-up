import React, { useState, useEffect, useRef } from 'react'
import useChat from '../hooks/useChat'
import useUser from '../hooks/useUser'
import ChatInput from './ChatInput'
import Sidebar from './Sidebar'
import DB from '../api/database'
import Message from './Message'

function Chat(props) {
  const user = useUser()
  const { data } = useChat()
  const [messages, setMessages] = useState([])
  const chatBoxRef = useRef()

  useEffect(() => {
    try {
      if (user?.uid) {
        const unsubscribe = DB.getRealTime(
          'chats',
          data?.chatId,
          (response) => {
            response.exists() && setMessages(response.data().messages)
          }
        )
        return () => {
          unsubscribe()
        }
      }
    } catch (ex) {
      console.log(ex)
    }
  }, [data?.chatId])

  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='grid grid-cols-4 bg-gray-200 w-full h-screen'>
      <Sidebar />
      <div className='flex flex-col flex-auto h-full col-span-3 overflow-y-hidden'>
        {data?.chatId && (
          <>
            <header className='pt-2 px-1 bg-indigo-500 border-b border-gray-200 sticky top-0 z-50'>
              <div className='flex justify-between items-center mb-3'>
                {/* <!-- Image + name --> */}
                <div className='flex items-center'>
                  <div className='h-16 w-16 mx-2 rounded-full overflow-hidden object-fill bg-white border-white border-2'>
                    <img
                      src={
                        data.user.photoURL ??
                        'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg'
                      }
                    />
                  </div>

                  <div className='pr-1'>
                    <h2 className='text-xl leading-snug text-white'>
                      {data.user?.fullName}
                    </h2>
                    <p className='block text-sm text-white font-medium'>
                      {/* {data.user?.email} */}
                    </p>
                  </div>
                </div>
                {/* <!-- Settings button --> */}
                <div className='relative inline-flex flex-shrink-0'>
                  <button className='text-gray-400 hover:text-gray-500 rounded-full focus:ring-0 outline-none focus:outline-none'>
                    <span className='sr-only'>Settings</span>
                    {/* <svg
                      className='w-6 h-6 fill-slate-300 transform transition-all hover:rotate-90'
                      viewBox='0 0 16 16'
                    >
                      <path d='m15.621 7.015-1.8-.451A5.992 5.992 0 0 0 13.13 4.9l.956-1.593a.5.5 0 0 0-.075-.611l-.711-.707a.5.5 0 0 0-.611-.075L11.1 2.87a5.99 5.99 0 0 0-1.664-.69L8.985.379A.5.5 0 0 0 8.5 0h-1a.5.5 0 0 0-.485.379l-.451 1.8A5.992 5.992 0 0 0 4.9 2.87l-1.593-.956a.5.5 0 0 0-.611.075l-.707.711a.5.5 0 0 0-.075.611L2.87 4.9a5.99 5.99 0 0 0-.69 1.664l-1.8.451A.5.5 0 0 0 0 7.5v1a.5.5 0 0 0 .379.485l1.8.451c.145.586.378 1.147.691 1.664l-.956 1.593a.5.5 0 0 0 .075.611l.707.707a.5.5 0 0 0 .611.075L4.9 13.13a5.99 5.99 0 0 0 1.664.69l.451 1.8A.5.5 0 0 0 7.5 16h1a.5.5 0 0 0 .485-.379l.451-1.8a5.99 5.99 0 0 0 1.664-.69l1.593.956a.5.5 0 0 0 .611-.075l.707-.707a.5.5 0 0 0 .075-.611L13.13 11.1a5.99 5.99 0 0 0 .69-1.664l1.8-.451A.5.5 0 0 0 16 8.5v-1a.5.5 0 0 0-.379-.485ZM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z' />
                    </svg> */}
                  </button>
                </div>
              </div>
            </header>
            <div className='flex flex-col flex-auto flex-shrink-0 bg-gray-100 h-full p-1'>
              <div className='flex flex-col h-[80%] overflow-x-hidden overflow-y-scroll'>
                <div className='flex flex-col h-full'>
                  <div className='grid grid-cols-12'>
                    {messages?.map((msg) => (
                      <Message message={msg} />
                    ))}
                  </div>
                </div>
              </div>
              <div className='sticky bottom-0'>
                <ChatInput />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Chat
