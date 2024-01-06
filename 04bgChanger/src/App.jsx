import { useState } from 'react'
import Button from './components/Button';


function App() {
  const [color, setColor] = useState('olive');

  const handleClick=(color)=>{
    setColor(color);
  }
  return (
    <>
    <div className='w-full h-screen duration-200'
    style={{ backgroundColor: color }}
    >
      <div className='flex flex-wrap fixed bottom-12 
      inset-x-5 items-center justify-center px-5'>
        <div className='flex flex-wrap justify-center gap-3 bg-white px-3 py-2 rounded-xl shadow-xl'>
          <Button text="red" color="red" handleClick={handleClick} textBlack={false} />
          <Button text="green" color="green" handleClick={handleClick} textBlack={false}/>
          <Button text="blue" color="blue" handleClick={handleClick} textBlack={false}/>
          <Button text="olive" color="olive" handleClick={handleClick} textBlack={false}/>
          <Button text="gray" color="gray" handleClick={handleClick} textBlack={false}/>
          <Button text="yellow" color="yellow" handleClick={handleClick} textBlack={true}/>
          <Button text="pink" color="pink" handleClick={handleClick} textBlack={true}/>
          <Button text="purple" color="purple" handleClick={handleClick} textBlack={false}/>
          <Button text="lavender" color="lavender" handleClick={handleClick} textBlack={true}/>
          <Button text="white" color="white" handleClick={handleClick} textBlack={true}/>
          <Button text="black" color="black" handleClick={handleClick} textBlack={false}/>
        </div>
      </div>

    </div>
    </>
  )
}

export default App
