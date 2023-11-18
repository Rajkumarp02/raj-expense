import React, { useState } from 'react'

export default function Pagination({items,setPage}) {
    const arr = Array.from(Array(items).keys()); //we can iterate arr(items)as keys..
    
    return (
    <nav aria-label="Page navigation example">
  <ul className="pagination">
    {
        arr?.map(p => (
        <li key={p} className="page-item ">
             <button onClick={(e) =>setPage(e.target.textContent)}
              className="page-link">
                {++p} {/*  start as 1,2,3...*/}
            </button>
        </li>
        ))
    }
  </ul>
</nav>
  )
}
