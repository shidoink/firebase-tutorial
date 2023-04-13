import React, { useState } from 'react'
import {auth, googleProvider,} from '../config/firebaseconfig'
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')
    console.log(auth?.currentUser?.email)

    const signIn= async()=>{
        try{
        await createUserWithEmailAndPassword(auth, email, password)
        }catch(err){
            console.error(err)
        }
    }
    const logout= async()=>{
        await signOut(auth)
    }

    const signInWithGoogle= async()=>{
        try{
            await signInWithPopup(auth, googleProvider)
        }catch(err){
            console.error(err)
        }
    }

  return (
    <div>
        <input type="text" onChange={(e)=> setEmail(e.target.value)} />
        <input type="password" onChange={(e)=> setPassword(e.target.value)} />
        <button onClick={signIn}>signin</button>
    <button onClick= {signInWithGoogle}>Sign In With Google</button>
    <button onClick={logout}> Logout</button>
    </div>
  )
}

export default Auth
