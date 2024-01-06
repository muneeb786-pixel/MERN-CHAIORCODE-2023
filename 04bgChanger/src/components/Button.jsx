
function Button({text,color,handleClick,textBlack}) {
  return (
    <button 
    onClick={()=>{
        handleClick(color)
    }}
    className={`text-xl capitalize  shadow-lg px-6 py-2 ${textBlack ? 'text-black':'text-white'} rounded-full`} style={{ backgroundColor:color }}
    >
        {text}
    </button>
  )
}

export default Button