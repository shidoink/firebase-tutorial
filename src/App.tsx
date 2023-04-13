import { useState, useEffect } from 'react'
import './App.css'
import Auth from './components/Auth'
import {db, auth, storage} from './config/firebaseconfig'
import {getDocs,collection, addDoc, deleteDoc, updateDoc, doc} from 'firebase/firestore'
import {ref, uploadBytes} from 'firebase/storage'

function App() {
  const [movieList, setMovielist] = useState([])


  //new movie states
const [newMovieTitle, setNewMovieTitle]= useState('')
const [newMovieOscar, setNewMovieOscar] = useState(false)

//update title state
const [updatedTitle, setUpdatedTitle]= useState('')

//file upload state
const [fileUpload, setFileUpload] = useState(null)


  const movieCollectionRef = collection(db, 'movies')

  const getMovieList = async () =>{
    //read the data
    //set the movie list
    try{
    const data = await getDocs(movieCollectionRef)
    const filteredData =data.docs.map((doc) =>({
      ...doc.data(),
       id:doc.id
       
    }));
    setMovielist(filteredData)
    //console.log(filteredData);
    } catch (err){
      console.error(err)
    }
  };

  useEffect(()=>{
  getMovieList();
},[]);

const onSubmitMovie = async() =>{
  try{
  await addDoc(movieCollectionRef,{
    title:newMovieTitle,
    oscar: newMovieOscar,
    userId: auth?.currentUser?.uid,
  });
  getMovieList();
}catch(err){
  console.error(err)
}}

const deleteMovie = async(id:string, )=>{
  const movieDoc= doc(db,'movies', id )
  console.log(movieDoc.id)
  
  await deleteDoc(movieDoc)
  getMovieList();
}

const updateMovieTitle = async(id:string)=>{
  const movieDoc= doc(db,'movies', id )
  await updateDoc(movieDoc, {title: updatedTitle})
  getMovieList();
}
const getmovieinfo= async(id:string)=>{
  const movieDoc = doc(db, 'movies', id)
  console.log(movieDoc.id)
}

const uploadFile= async() =>{
  if (!fileUpload) return;
  const filesFolderRef = ref(storage, `projectfiles/${fileUpload.name}`);
  try{
  await uploadBytes(filesFolderRef, fileUpload)
  } catch(err){console.error(err)}
}

  return (
    <>
    <div>firebase</div>
    <Auth/>
    <div>
      <input type="text" placeholder='title' onChange = {(e)=>setNewMovieTitle(e.target.value)} />
      
      <input type="checkbox"  
      checked={newMovieOscar}
      onChange ={(e)=> setNewMovieOscar(e.target.checked)}/>
      <label htmlFor="">recieved an oscar</label>
      <button onClick={onSubmitMovie}> Submit movie</button>
    </div>
    <div>
      {movieList.map((movie)=>(
      <div>
        <h1 style ={{color:movie.oscar? 'green':'red'}}> {movie.title}</h1>

        <button onClick={()=> deleteMovie(movie.id)}> Delete Movie </button>

        <input type="text" placeholder='newtitle' onChange ={(e)=>setUpdatedTitle(e.target.value)}/>
        <button onClick={()=> updateMovieTitle(movie.id)}>updatetitle</button>
        <button onClick={()=>getmovieinfo(movie.id)}>Get movie Info</button>
      </div>
      ))}
      </div>
      <div>
        <input type="file" onChange = {(e)=> setFileUpload(e.target.files[0]) }/>
        <button onClick={uploadFile}>upload file</button>
      </div>
    
    </>
  )
}

export default App
