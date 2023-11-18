import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from './Pagination';
import { deleteExpense, getexpense } from '../Action/expense';
import { dateFormatter } from './dateFormeter';
import { Link, useNavigate } from 'react-router-dom';


export default function Viewexpense() {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.addExpense);
  const user = useSelector((state) => state.currentuserReducer);
  
  const [page, setPage] = useState(1) //we can set page(initial) at 1
  const [search, setSearch] = useState('')//search contains..
  const nav = useNavigate()

  useEffect(() => {
    dispatch(getexpense((+page))); //we can get data and also get page as string.
  }, [dispatch, page, setPage]);
  
  //delete func
  const handleDelete = (id) => {

    dispatch(deleteExpense(id))
  }

  //redirect func
  const redirect = () => {
    if (user === null) {
      alert("Please Sign in Account")
      nav('/Auth')
    }
  }

  return (
    <div className='container tableContainer table-responsive-sm'>
      <input type='search' onChange={(e) => setSearch(e.target.value)} class="form-control" placeholder='Search Containes...' />

      <table className="table table-success table-striped mt-1">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col">Date</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>

          {data?.data?.docs?.filter((item) => {
            return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);
          })
            .map((data, i) => (

              <>
                <tr key={i}>
                  <td>{data.name}</td>
                  <td>{data.amount}</td>
                  <td>{data.category}</td>
                  <td>{dateFormatter(data.date)}</td>
                  <td>
                    {
                      user? 
                    <Link to={`/edit/${data._id}`} >
                      <button type='button' className='btn btn-info'>Edit</button>
                    </Link> :
                       <button type='button' className='btn btn-info' onClick={() =>redirect()}>Edit</button>
                    }
                  </td>
                  <td>
                    {
                      user?
                    <button className='btn btn-danger' onClick={() => handleDelete(data._id)}>Delete</button>
                    :
                    <button className='btn btn-danger' onClick={() =>redirect()}>Delete</button>
                    }
                  </td>
                </tr>

              </>
            )
            )}
        </tbody>

      </table>
      {/* pagination */}
      <Pagination
        setPage={setPage}
        items={data?.data?.totalPages} />


    </div>


  )
}
