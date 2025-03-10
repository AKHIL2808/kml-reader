
export default function Button({ input, clickedValue, clickedFunction }) {
  return <div className={`p-2 flex justify-center items-center  rounded-md ${clickedValue == input ? "bg-black" : "bg-slate-200"}`} >
    <button
      className={` text-sm font-bold cursor-pointer ${clickedValue == input ? "text-white" : "text-black"} `}
      value={input}
      onClick={() => {
        clickedFunction(input)
      }}
    >{input}</button>
  </ div>
}
