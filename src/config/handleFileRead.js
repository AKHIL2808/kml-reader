export function handleFileRead(file) {
  // console.log(file)
  return new Promise((resolve, reject) => {

    const reader = new FileReader()
    reader.onload = (event) => {
      const data = (event.target.result)
      // console.log(data)
      resolve(data)
    }
    reader.onerror = () => {
      reject("Error reading the file. Please try again.");
    };
    reader.readAsText(file)
  })
}
