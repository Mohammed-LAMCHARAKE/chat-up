import React, { useState } from 'react'
import useChat from '../hooks/useChat'
import useUser from '../hooks/useUser'
import DB from '../api/database'
import { arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore'
import storage from '../api/storage'

function ChatInput(props) {
  const currentUser = useUser()
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const { data } = useChat()

  const handleSendMessage = async () => {
    if (!text && !image) return
    if (image) {
      storage.upload(image, crypto.randomUUID(), async (dataURL) => {
        await DB.update('chats', data.chatId, {
          messages: arrayUnion({
            text,
            image: dataURL,
            senderId: currentUser.uid,
            date: Timestamp.now()
          })
        })
      })
    } else {
      await DB.update('chats', data.chatId, {
        messages: arrayUnion({
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }
    // Update lastMessage for sender
    await DB.update('friends', currentUser.uid, {
      [data.chatId + '.lastMessage']: text,
      [data.chatId + '.date']: serverTimestamp()
    })
    // Update lastMessage for receiver
    await DB.update('friends', data.user.id, {
      [data.chatId + '.lastMessage']: text,
      [data.chatId + '.date']: serverTimestamp()
    })

    setText('')
    setImage(null)
  }
  return (
    <div className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 shadow-2xl'>
      <div>
        <input
          id='file'
          type='file'
          hidden
          onChange={(ev) => setImage(ev.target.files[0])}
        />
        <label
          htmlFor='file'
          className='flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
            ></path>
          </svg>
        </label>
      </div>
      <div className='flex-grow ml-4'>
        <div className='relative w-full'>
          <textarea
            wrap='hard'
            className='flex w-full text-lg border rounded-xl focus:outline-none focus:border-indigo-300 py-2 px-2 h-12 overflow-hidden'
            onChange={(ev) => setText(ev.target.value)}
            value={text}
            // onKeyUp={(ev) => ev.code == 'Enter' && handleSendMessage()}
          />
          <button className='absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className='ml-2'>
        <button
          className='flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-full text-white px-2 py-3 flex-shrink-0'
          onClick={handleSendMessage}
        >
          <span className='ml-2'>
            <svg
              className='w-6 h-6 transform rotate-90'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}

export default ChatInput
