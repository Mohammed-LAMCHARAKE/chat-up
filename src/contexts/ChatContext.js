import { React, createContext, useReducer } from 'react'
import useUser from '../hooks/useUser'

export const ChatContext = createContext()

export default function ChatContextProvider({ children }) {
  const currentUser = useUser()

  const INITIAL_STATE = {
    chatId: null,
    user: {}
  }

  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.id
              ? currentUser.uid + action.payload.id
              : action.payload.id + currentUser.uid
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
