import React, { useEffect, useState } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth';
import { auth,db } from '../../config/firebase';


const ProfileUpdate = () => {

  const[image,setImage] = useState(false);
  const [name,setName] = useState("");
  const [bio,setBio] = useState("");
  const [uid,setUid] = useState("");

  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
      if (user) {
        setUid(user.uid)
        const docRef = doc(db,"users",user.uid);
      }
    })
  },[])

  return (
    <div className='profile'>
      <div className="profile-container">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor='avatar'>
            <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='avatar' accept='.png, .jpg, .jpeg' hidden/>
            <img src={image? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
            Upload profile image
          </label>
          <input onChange={(e)=>setName(e.target.value)} value={name} type='text' placeholder='Your Name' required/>
          <textarea onChange={(e)=>setBio(e.target.bio)} value={bio} placeholder='Write Profile bio' required></textarea>
          <button type='submit'>Save</button>
        </form>
        <img className='profile-pic' src={image? URL.createObjectURL(image):assets.logo_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate