import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from './FirebaseConfigs'

class Storage {
  constructor() {
    this.storage = storage
  }
  async upload(file, refString, cb) {
    const storageRef = ref(this.storage, `images/${refString}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
      (err) => {},
      async () => {
        let URL = await getDownloadURL(uploadTask.snapshot.ref)
        cb(URL)
      }
    )
  }
}

export default new Storage()
