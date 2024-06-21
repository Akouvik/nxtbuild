import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, writeBatch, query, getDocs, deleteDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};
export const storageConfig = {
  apiKey: process.env.REACT_APP_STORAGE_APIKEY,
  authDomain: process.env.REACT_APP_STORAGE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_STORAGE_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_STORAGE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_STORAGE_APPID,
};

// Initialize the default Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize the storage-specific Firebase app
const storageApp = initializeApp(storageConfig, 'storageApp');

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const storage = getStorage(firebaseApp);
export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore(firebaseApp);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};

export const getCategoriesAndDocuments = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, articles } = docSnapshot.data();
    acc[title.toLowerCase()] = articles;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('Error creating user', error);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const siginInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const SignOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const renameDocument = async (oldDocName, newDocName) => {
  const oldDocRef = doc(db, 'categories', oldDocName);
  const newDocRef = doc(db, 'categories', newDocName);

  const oldDocSnap = await getDoc(oldDocRef);

  if (oldDocSnap.exists()) {
    const data = oldDocSnap.data();

    await setDoc(newDocRef, data);

    await deleteDoc(oldDocRef);

    console.log(`Document renamed from ${oldDocName} to ${newDocName}`);
  } else {
    console.log(`No such document: ${oldDocName}`);
  }
};

export const AddPost = async (documentName, postData) => {
  const docRef = doc(db, 'Posts', documentName);
  try {
    const docSnap = await getDoc(docRef);
    postData.datePosted = new Date();
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        articles: arrayUnion(postData),
      });
    } else {
      await setDoc(docRef, {
        articles: [postData],
        title: documentName
      });
    }

    const updatedDocSnap = await getDoc(docRef);

    if (updatedDocSnap.exists()) {
      console.log('Post added successfully');
      return updatedDocSnap.data();
    } else {
      console.error('Error: Document does not exist after update');
      return null;
    }
  } catch (error) {
    console.error('Error adding post: ', error);
    throw error;
  }
};

export const uploadCoverArt = async (file) => {
  const fileName = new Date().getTime();
  const storageRef = ref(storage, 'coverart/' + fileName);
  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type
    });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Error uploading file:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          console.error('Error getting download URL:', error);
          reject(error);
        }
      }
    );
  });
};

export const DeletePost = async (documentName, postIdToDelete) => {
  const docRef = doc(db, 'Posts', documentName);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const postData = docSnap.data();
      if (postData.articles) {
        const filteredArticles = postData.articles.filter(post => post.id !== postIdToDelete);
        await updateDoc(docRef, { articles: filteredArticles });
        console.log('Post deleted successfully');
      } else {
        console.log('No articles found in the post');
      }
    } else {
      console.log('Post not found');
    }
  } catch (error) {
    console.error('Error deleting post: ', error);
  }
};

export const UpdatePost = async (documentName, postId, newContent) => {
  const docRef = doc(db, 'Posts', documentName);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const postData = docSnap.data();
      if (postData.articles) {
        const articles = postData.articles.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              content: newContent,
              updateDate: new Date()
            };
          }
          return post;
        });

        await updateDoc(docRef, {
          articles: articles
        });
        console.log('Post updated successfully');
      }
    } else {
      console.log('Post not found');
    }
  } catch (error) {
    console.error('Error updating post: ', error);
  }
};
