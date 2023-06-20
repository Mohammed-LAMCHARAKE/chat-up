import Storage from '../api/storage'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { auth } from '../api/FirebaseConfigs'
import DB from '../api/database'

class Auth {
  async signup(fullName, email, password, photo) {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await this.editProfile(response.user, fullName, photo)
      return response.user
    } catch (ex) {
      console.log(ex)
    }
  }

  async editProfile(user, fullName, photo) {
    await Storage.upload(photo, `${user.uid}`, async (URL) => {
      await updateProfile(user, {
        displayName: fullName,
        photoURL: URL
      })
      await DB.save('users', {
        id: user.uid,
        fullName,
        email: user.email,
        photoURL: URL
      })
    })
  }

  async login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  logout() {
    return signOut(auth)
  }
}

export default new Auth()
