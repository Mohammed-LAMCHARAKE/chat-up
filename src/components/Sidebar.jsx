import { React, useState, useEffect } from 'react'
import useUser from '../hooks/useUser'
import SearchBox from './SearchBox'
import DB from '../api/database'
import auth from '../api/authentication'
import Member from './Member'
import Explore from './Explore'
import useChat from '../hooks/useChat'
import { useNavigate } from 'react-router-dom'

function Sidebar(props) {
  const user = useUser()
  const navigate = useNavigate()

  const [chats, setChats] = useState([])
  const { dispatch } = useChat()
  const [searchQuery, setSearchQuery] = useState('')
  const [exploreVisibility, setExploreVisiblity] = useState(false)

  useEffect(() => {
    if (!user?.uid) return
    const unsubscribe = DB.getRealTime('friends', user?.uid, (result) => {
      if (result.exists()) setChats(result.data())
    })

    return () => {
      unsubscribe()
    }
  }, [user?.uid])

  const handleOpenUser = (userInfo) => {
    dispatch({ type: 'CHANGE_USER', payload: userInfo })
  }

  return (
    <section class='flex flex-col antialiased text-gray-600 h-full scroll-pr-48'>
      {/* <!-- Card --> */}
      <div class='relative w-full h-full mx-auto shadow-lg bg-indigo-600 overflow-hidden'>
        {/* <!-- Card header --> */}
        <header class='bg-gradient-to-t from-indigo-600 to-fuchsia-600 py-2 px-3 border-gray-200 rounded-b-md sticky top-0'>
          <div class='flex justify-center text-center mt-2'>
            {/* <!-- Image + name --> */}
            <div class='flex flex-col justify-center items-center overflow-hidden'>
              <div className='w-32 h-32 overflow-hidden rounded-full object-contain bg-white border-4 border-slate-100'>
                <img
                  className='object-cover'
                  src={
                    user?.photoURL ||
                    'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg'
                  }
                />
              </div>

              <div class='pr-1 text-white'>
                <h2 class='text-xl leading-snug font-bold'>
                  {user?.displayName?.toUpperCase()}
                </h2>

                {user?.email}
              </div>
              <button
                className='bg-white text-indigo-600 py-0.5 px-3 rounded-md'
                onClick={async () => {
                  await auth.logout()
                  navigate('/login')
                }}
              >
                LOGOUT
              </button>
            </div>
            {/* <!-- Settings button --> */}
            {/* <div class='relative inline-flex flex-shrink-0'>
              <button class='text-gray-400 hover:text-gray-500 rounded-full focus:ring-0 outline-none focus:outline-none'>
                <span class='sr-only'>Settings</span>
                <svg class='w-6 h-6 fill-current' viewBox='0 0 16 16'>
                  <path d='m15.621 7.015-1.8-.451A5.992 5.992 0 0 0 13.13 4.9l.956-1.593a.5.5 0 0 0-.075-.611l-.711-.707a.5.5 0 0 0-.611-.075L11.1 2.87a5.99 5.99 0 0 0-1.664-.69L8.985.379A.5.5 0 0 0 8.5 0h-1a.5.5 0 0 0-.485.379l-.451 1.8A5.992 5.992 0 0 0 4.9 2.87l-1.593-.956a.5.5 0 0 0-.611.075l-.707.711a.5.5 0 0 0-.075.611L2.87 4.9a5.99 5.99 0 0 0-.69 1.664l-1.8.451A.5.5 0 0 0 0 7.5v1a.5.5 0 0 0 .379.485l1.8.451c.145.586.378 1.147.691 1.664l-.956 1.593a.5.5 0 0 0 .075.611l.707.707a.5.5 0 0 0 .611.075L4.9 13.13a5.99 5.99 0 0 0 1.664.69l.451 1.8A.5.5 0 0 0 7.5 16h1a.5.5 0 0 0 .485-.379l.451-1.8a5.99 5.99 0 0 0 1.664-.69l1.593.956a.5.5 0 0 0 .611-.075l.707-.707a.5.5 0 0 0 .075-.611L13.13 11.1a5.99 5.99 0 0 0 .69-1.664l1.8-.451A.5.5 0 0 0 16 8.5v-1a.5.5 0 0 0-.379-.485ZM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z' />
                </svg>
              </button>
            </div> */}
          </div>
          {/* <SearchBox onSearch={setSearchQuery} /> */}
        </header>
        {/* <!-- Card body --> */}

        <div class='py-3 px-2 h-full'>
          <SearchBox onSearch={setSearchQuery} />
          <h3 class='text-xs font-semibold uppercase text-gray-300 my-1'>
            Chats
          </h3>
          {/* <!-- Chat list --> */}
          <div class=' p-0.5 rounded-2xl h-[58%] overflow-y-auto'>
            {/* <!-- User --> */}
            {Object.entries(chats)
              ?.sort((a, b) => b[1].date - a[1].date)
              ?.map(
                (member, idx) =>
                  member[1].userInfo?.fullName
                    ?.toLowerCase()
                    .includes(searchQuery) && (
                    <Member
                      key={idx}
                      member={member[1].userInfo}
                      lastMessage={member[1].lastMessage}
                      onChoose={() => handleOpenUser(member[1].userInfo)}
                    />
                  )
              )}
          </div>
        </div>
        {/* <!-- Bottom right New Chat --> */}
        <button
          className='sticky bottom-1.5 left-full mr-2 inline-flex items-center text-md font-medium bg-indigo-500 text-white border-2 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2'
          onClick={() => setExploreVisiblity(true)}
        >
          <svg
            class='w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2'
            viewBox='0 0 12 12'
          >
            <path d='M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z' />
          </svg>
          <span>New Chat</span>
        </button>
      </div>
      <Explore
        visibility={exploreVisibility}
        onClose={() => setExploreVisiblity(false)}
      />
    </section>
  )
}

export default Sidebar
