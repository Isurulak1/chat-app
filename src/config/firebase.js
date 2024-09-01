import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc,getFirestore, setDoc } from "firebase/firestore";
import {toast} from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBRBf9w_DaSKVfX4Rppa6ddj9G_eOkL2aY",
  authDomain: "chat-app-gs-161e5.firebaseapp.com",
  projectId: "chat-app-gs-161e5",
  storageBucket: "chat-app-gs-161e5.appspot.com",
  messagingSenderId: "1021246628011",
  appId: "1:1021246628011:web:476efaf6545bea90cc97ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password) => {
  try{
    const res = await createUserWithEmailAndPassword(auth,email,password)
    const user = res.user;
    await setDoc(doc(db,"users",user.uid),{
      id:user.uid,
      username:username.toLowerCase(),
      email,
      name:"",
      avatar:"",
      bio:"Hey,There i am using chat app",
      lastSeen:Date.now()
    })
    await setDoc(doc(db,"chats",user.uid),{
      chatsData:[]
    })
  }catch(error){
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async(email,password) => {
  try{
    await signInWithEmailAndPassword(auth,email,password)
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = async () => {
  try{
    await signOut(auth)
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
  await signOut(auth)
}

export{signup,login,logout,auth,db}