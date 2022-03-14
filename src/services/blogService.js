import { db, storage } from "../firebaseApp";
import {
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const blogRef = collection(db, "Blogs");

export async function addBlog(data, currentUser) {
  try {
    const bannerUrl = await uploadFile(data, currentUser);

    // await addDoc(blogRef, {
    //   creator: { _id: currentUser.uid, name: currentUser.displayName },
    //   heading: data.heading,
    //   subHeading: data.subHeading,
    //   content: data.content,
    //   createdAt: serverTimestamp(),
    //   bannerUrl: bannerUrl,
    // });
  } catch (err) {
    console.log(err);
  }
}

export async function getAllBlogs() {
  try {
    let blogs = [];
    let docs = await getDocs(blogRef);
    docs.forEach((doc) => {
      blogs.push({ ...doc.data(), _id: doc.id });
    });
    return blogs;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteBlog(id) {
  try {
    const docRef = doc(db, "Blogs", id);
    deleteDoc(docRef);
  } catch (err) {
    console.log(err);
  }
}

export async function getBlog(id) {
  try {
    const docRef = doc(db, "Blogs", id);
    const res = await getDoc(docRef);
    return { ...res.data(), _id: res.id };
  } catch (err) {
    console.log(err);
  }
}

export async function updateBlog(id, blogData) {
  try {
    const docRef = doc(db, "Blogs", id);
    await updateDoc(docRef, blogData);
  } catch (err) {
    console.log(err);
  }
}

async function uploadFile(data, currentUser) {
  try {
    const file = data.banner[0];
    if (file) {
      const storageRef = ref(storage, `banners/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log("------");
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        async () => {
          console.log("hello");
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          if (downloadURL) {
            await addDoc(blogRef, {
              creator: { _id: currentUser.uid, name: currentUser.displayName },
              heading: data.heading,
              subHeading: data.subHeading,
              content: data.content,
              createdAt: serverTimestamp(),
              bannerUrl: downloadURL,
            });
          }
        }
      );
    } else {
      await addDoc(blogRef, {
        creator: { _id: currentUser.uid, name: currentUser.displayName },
        heading: data.heading,
        subHeading: data.subHeading,
        content: data.content,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// async function getUrl(uploadTask) {
//   await getDownloadURL(uploadTask.snapshot.ref);
//   console.log("download", downloadURL);
//   return downloadURL;
// }
