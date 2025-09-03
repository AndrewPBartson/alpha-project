// firebase/firestoreProjects.js

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from './init'

const PROJECTS_COLLECTION = 'projects'

// when returning any existing data from Firestore db, always
// add the id as shown below

export const createProject_FS = async (projectData) => {
  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), projectData)
  return { id: docRef.id, ...projectData }
}

export const fetchAllProjects_FS = async () => {
  const snapshot = await getDocs(collection(db, PROJECTS_COLLECTION))
  console.log('snapshot', snapshot)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

// When updating a project, it already has id
// only the fields that are passed in updates are changed
export const updateProject_FS = async (id, updates) => {
  const docRef = doc(db, PROJECTS_COLLECTION, id)
  await updateDoc(docRef, updates)
}

export const deleteProject_FS = async (id) => {
  const docRef = doc(db, PROJECTS_COLLECTION, id)
  await deleteDoc(docRef)
}
