import { useEffect, useState } from 'react'
import './App.css'
import Button from "./componenets/Button"
import { handleFileRead } from './config/handleFileRead'
import Summary from './componenets/Summary'
import Content from './componenets/Content'

function App() {
  const [clicked, setClicked] = useState("Content")
  const [fileContent, setFileContent] = useState(null)
  const [summary, setSummary] = useState(null)
  useEffect(() => {
    if (fileContent == null) return
    const value = main(fileContent)
    setSummary(value.elements)
  }, [fileContent])
  return (
    <>
      <div className="border border-slate-500 overflow-hidden h-30 rounded-md m-4 flex flex-col justify-center items-center" >
        <div>
          <input
            className='cursor-pointer'
            onChange={async (e) => {
              try {
                const data = await handleFileRead(e.target.files[0])
                setFileContent(data)
              } catch (error) {
                console.log(error)
              }
            }}
            type="file"
            accept='.kml' />
          <p className='text-slate-500 text-sm'>Select only .kml file</p>
        </div>
      </div>
      <div className='flex m-4'>
        <div className='m-2' >
          <Button input="Content" clickedValue={clicked} clickedFunction={setClicked} />
        </div>
        <div className='m-2' >
          <Button input="Summary" clickedValue={clicked} clickedFunction={setClicked} />
        </div>
        <div className='m-2' >
          <Button input="Details" clickedValue={clicked} clickedFunction={setClicked} />
        </div>
      </div>
      {clicked == "Content" && fileContent != null && <div className='border rounded-md m-4 p-2 h-screen'>
        <Content xmlDoc={fileContent} />
      </div>}
      {clicked == "Summary" && <div className='rounded-md'>
        <Summary tableContent={summary} />
      </div>}
      {clicked == "Details" && <div>
        details
      </div>}
    </>
  )
}

export default App


function main(textXml) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(textXml, "text/xml")
  const point = Array.from(xmlDoc.getElementsByTagName("Point")).length
  const lineString = Array.from(xmlDoc.getElementsByTagName("LineString")).length
  const linearRing = Array.from(xmlDoc.getElementsByTagName("LinearRing")).length
  const polygon = Array.from(xmlDoc.getElementsByTagName("Polygon")).length
  const multigeometry = Array.from(xmlDoc.getElementsByTagName("MultiGeometry")).length
  const model = Array.from(xmlDoc.getElementsByTagName("Model")).length
  const arrayOfElements = [{ "name": "Point", "value": point }, { "name": "LineString", "value": lineString }, { "name": "LineRing", "value": linearRing }, { "name": "Polygon", "value": polygon }, { "name": "MultiGeometry", "value": multigeometry }, { "name": "Model", "value": model }]
  return { elements: arrayOfElements }
}
