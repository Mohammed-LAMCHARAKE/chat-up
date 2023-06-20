import { React, useState, useEffect } from 'react'
import SearchBox from './SearchBox'
import DB from '../api/database'
import useUser from '../hooks/useUser'

function Explore({ visibility, onClose }) {
  const user = useUser()
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const getUsers = async () => {
    const response = await DB.getAll('users')
    let usersList = []
    for (const doc of response.docs) {
      if (doc.data().id != user?.uid) usersList.push(doc.data())
      else continue
    }

    setUsers(usersList)
  }

  const handleAddFriend = async (selectedUser) => {
    const combinedID =
      user.uid > selectedUser.id
        ? user.uid + selectedUser.id
        : selectedUser.id + user.uid
    const response = await DB.get('chats', combinedID)
    // console.log(response.exists())
    if (!response.exists()) {
      await DB.save('chats', { messages: [] }, combinedID)

      await DB.update('friends', selectedUser.id, {
        [combinedID + '.userInfo']: {
          id: user.uid,
          fullName: user.displayName,
          photoURL: user.photoURL
        }
        // [combinedID + '.date']: serverTimestamp()
      })
      await DB.update('friends', user.uid, {
        [combinedID + '.userInfo']: {
          id: selectedUser.id,
          fullName: selectedUser.fullName,
          photoURL: selectedUser.photoURL
        }
        // [combinedID + '.date']: serverTimestamp()
      })
    }
  }

  useEffect(() => {
    getUsers()
  }, [user?.uid])

  return (
    visibility && (
      // <div className='absolut h-screen flex p-5 top-0 bottom-0 z-[100%] bg-gray-200'>
      <div className='flex justify-center items-center bg-gray-300 backdrop-blur-md bg-white/5 bg-opacity-10 overflow-hidden fixed top-0 bottom-0 right-0 left-0 z-[100]'>
        <div class='mx-auto h-[90%] min-w-[55%] rounded-2xl border bg-white p-2 shadow-xl sm:p-6'>
          <SearchBox onSearch={setSearchQuery} />

          <div class='my-4 flex items-center justify-between '>
            <h5 class='text-xl font-bold leading-none text-gray-500 dark:text-white'>
              SEARCH
            </h5>

            <button
              class='text-lg font-medium text-white bg-red-500 rounded-full px-2 hover:bg-red-600'
              onClick={onClose}
            >
              Close{' '}
            </button>
          </div>
          <div class='overflow-y-auto max-h-[85%]'>
            <ul class='overflow-hidden h-[80%]'>
              {users?.map(
                (user, idx) =>
                  user.fullName?.toLowerCase().includes(searchQuery) && (
                    <li
                      class='py-2 px-3 mb-1 rounded-xl bg-slate-50 hover:bg-slate-100'
                      key={idx}
                    >
                      <div class='flex items-center space-x-3'>
                        <div class=''>
                          <img
                            class='h-24 w-24 rounded-full border object-cover'
                            src={
                              user.photoURL ||
                              'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg'
                            }
                          />
                        </div>
                        <div
                          class='min-w-0 flex-1 cursor-pointer'
                          onClick={() => {
                            handleAddFriend(user)
                            onClose()
                          }}
                        >
                          <p class='truncate text-xl font-semibold text-indigo-600'>
                            {user.fullName}
                          </p>
                          <p class='truncate text-lg text-gray-500 dark:text-gray-400'>
                            {user.email}
                          </p>
                        </div>
                        {/* <div
                          class='inline-flex items-center justify-center p-3 rounded-full bg-indigo-100 hover:bg-indigo-400 cursor-pointer'
                          onClick={() => handleAddFriend(user)}
                        >
                          <svg
                            viewBox='0 0 640 512'
                            className='w-6 h-6 hover:fill-white'
                          >
                            <path d='M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z' />
                          </svg>
                        </div> */}
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  )
}

export default Explore
