import {
  doc,
  getFirestore,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  getDoc,
  onSnapshot
} from 'firebase/firestore'

class Database {
  constructor(db) {
    this.db = db
  }

  save(collectionName, data, id = null) {
    return setDoc(doc(this.db, collectionName, id ?? crypto.randomUUID()), data)
  }

  get(collectionName, id) {
    return getDoc(doc(this.db, collectionName, id))
  }

  getAll(collectionName) {
    return getDocs(collection(this.db, collectionName))
  }

  getRealTime(collectionName, id, callback) {
    return onSnapshot(doc(this.db, collectionName, id), callback)
  }

  find(collectionName, { field, value }) {
    const queryConstraint = query(
      collection(this.db, collectionName),
      where(field, '==', value)
    )
    return getDocs(queryConstraint)
  }

  update(collectionName, id, data) {
    return updateDoc(doc(this.db, collectionName, id), data)
  }
}

export default new Database(getFirestore())
