export default function Summary(tableContent) {
  if (tableContent == null) return
  console.log(tableContent)
  return <div className="grid rounded-md">
    <table className="table-auto m-4 rounded-md bg-white border border-gray-300">
      <thead className="">
        <tr>
          <th className="border border-gray-300 px-4 py-2">Element</th>
          <th className="border border-gray-300 px-4 py-2">Count</th>
        </tr>
      </thead>
      <tbody>
        {tableContent.tableContent.map((element, index) => {
          return (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{element.name}</td>
              <td className="border border-gray-300 px-4 py-2">{element.value}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
}
