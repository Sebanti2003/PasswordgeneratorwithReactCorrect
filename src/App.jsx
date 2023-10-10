import { useState , useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setlength]=useState(8);
  const [numberallowed,setnumberallowed]=useState(false);
  const [charallowed,setcharallowed]=useState(false);
  const [password,setpassword]=useState("");
  const passwordgenerator=useCallback(()=>{
    let pas="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberallowed)str+="0123456789";
    if(charallowed)str+="~!@$%^&*(){}'<>/~";
    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length);
      pas+=str.charAt(char);
    }
    setpassword(pas);

  },[length,numberallowed,charallowed,setpassword])
 
  //ref hook
  const passwordref=useRef(null);
  const copytoclipboard=useCallback(()=>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password),[password]});
  useEffect(()=>{
    passwordgenerator();
   },[length,numberallowed,charallowed,passwordgenerator])

  return (
    <>
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
    <div className='mx-auto bg-blue-500 text-white max-w-md w-[80%]  p-5 my-6 flex flex-col rounded-xl gap-10 border-2 border-black '>
      <h1 className='text-center font-mono text-2xl font-bold'>Password Generator</h1>
      <div className='w-full mr-2 flex justify-between items-center bg-red-600 p-2 rounded-lg gap-2'>
        <input type="text"   className='w-[80%] bg-white text-black rounded-md pl-3 py-3' placeholder='password' ref={passwordref} value={password} />
        <button className='rounded-full bg-black w-16 h-10 text-center flex justify-center pb-1 items-center' onClick={copytoclipboard}>Copy</button>
      </div>
      <div className='bg-pink-400 flex justify-between px-3 pt-3 pb-4 pr-8 text-black rounded-xl shadow-md '>
      <input type="range" name="slider" id="slider" min={0} max={20} value={length} onChange={function(e){
        setlength(e.target.value)

      }}  />
      <div>Length:{length}</div>
      </div>
      <div className='flex w-full justify-between pl-4 pr-4 text-black'>
        <label htmlFor="numbers">Numbers</label>
        <input type="checkbox" name="numbers" id="numbers" checked={numberallowed} onChange={()=>{
          setnumberallowed((prev)=>!prev)
        }} />
        <label htmlFor="characters">Characters</label>
        <input type="checkbox" name="characters" id="characters" checked={charallowed} onChange={()=>{
          setcharallowed((prev)=>!prev);
        }} />
      </div>
     
    </div>
    </div>
   
    </>
  )
}

export default App
