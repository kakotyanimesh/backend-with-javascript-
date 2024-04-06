import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
const [jokes , setJokes] = useState([])

useEffect(() =>{
  axios.get('http://localhost:3000/jokes')
  .then((response) =>{
    setJokes(response.data)
  })
  .catch((error) =>{
    console.log(error);
  })
},)
  return (
    <>
      <h1>animesh </h1>
      <p>jokes : {jokes.length}</p>

      {
        jokes.map((joke, index) =>{
          <div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.title}</p>
          </div>
        })
      }
    </>
  )
}

export default App
