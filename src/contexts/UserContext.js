import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../api/FirebaseConfigs'

export const UserContext = React.createContext()

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({})

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (theNewUser) =>
      setUser(theNewUser)
    )
    return () => {
      unsubscribe()
    }
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
