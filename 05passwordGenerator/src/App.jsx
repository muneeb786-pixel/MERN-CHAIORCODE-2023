import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isnumber, setIsNumber] = useState(false);
  const [isCharacters, setIsCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGen = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXZYabcdefghijklmnopqrstuvwxyz"
    if (isnumber) str += '0123456789'
    if(isCharacters) str += '~!@#$%^&*()_+|}{:?;.,><'
    let pass = ""
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass);
  }, [
    length,
    isnumber,
    isCharacters,
    setPassword,
  ]);
  const passwordRef = useRef(null);
  const copyToClip = () =>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }

  useEffect(()=>{
    passwordGen()
  },
    [length,isnumber,isCharacters,passwordGen]
  )


  return (
    <>
      <div
        className="w-full  max-w-md mx-auto text-orange-500 rounded-lg shadow-md 
     bg-gray-500 px-4 py-3 my-8"
      >
        <h1 className="text-white text-center text-lg">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
          className=" outline-none bg-blue-700 px-3 py-0.5 shrink-0 text-white "
          onClick={copyToClip}
          >copy</button>
        </div>
        <div className="flex gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e)=>{
              setLength(e.target.value)
            }}
            className="cursor-pointer"
            />
            <label >Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input 
            id="number"
            type="checkbox"
            defaultChecked={isnumber}
            onChange={()=> setIsNumber(prev => !prev)}
            />
            <label htmlFor="number" >Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input 
            id="character"
            type="checkbox"
            defaultChecked={isCharacters}
            onChange={()=> setIsCharacters(prev => !prev)}
            />
            <label htmlFor="character" >Characters</label>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
