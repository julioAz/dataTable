import { useState } from "react";

export default function DataTable({ rows = [] }) {
const columns = Object.keys(rows[0])
const [sortedBy, setSortedBy] = useState({
    column: columns[0],
    asc: true,
})
const [query, setQuery] = useState('')
const [count, setCount] = useState(15)

function sort(rows){
  const {column, asc} = sortedBy;

  // sort using bubble sort
  return rows.sort((a, b) => {
    if(a[column].toString() > b[column].toString()) return asc ? -1 : 1 ;
    if(b[column].toString() > a[column].toString()) return asc ? 1 : -1;

    return 0;
  });

}

// filter using indexOf
function filter (rows) {
  return rows.filter((row) => 
  columns.some((column) =>
    row[column].toLowerCase().indexOf(query.toLocaleLowerCase()) > -1
    )
  ); 
}

// function to filter with sort rows
const sortFilter = () => sort(filter(rows))

  return (
    <div className="main">
      <input placeholder="Search" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
                <th key={index}>
                  <div className="table-column"
                    onClick={() => 
                    setSortedBy((prev) => ({
                      column,
                      asc: !prev.asc,
                    }))
                  }>
                    <div>{column}</div>
                    <div>
                      {sortedBy.column === column && 
                        (sortedBy.asc ? (
                          <svg className="chevron-up" aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"></path></svg>
                        ) : (
                          <svg className="chevron-down" aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"></path></svg>
                        ))
                      }
                    </div>
                  </div>
                </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortFilter()
          .slice(0,count)
          .map((row, index) => (
            <tr key={index}>
              {columns.map((column, index) => ( 
                <td key={index}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

        {sortFilter().length > count && (
          <div>
            <button onClick={() => setCount(prev => prev + 15)}>
              More
            </button>
          </div>
        )}
    </div>
  );
}
