import React from 'react'
import 'boxicons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../Action/expense';


export default function Form() {
  const user = useSelector((state) => state.currentuserReducer);
  const nav = useNavigate();
  const data = useSelector((state) => state.addExpense);
  const dispatch = useDispatch()

  //delete-func
  const handleDelete = (id) => {
    dispatch(deleteExpense(id))
  }
  
   //we get recent 3 list...
  const recentThreeExpenses = data && data.data?.docs ? data.data.docs.slice(0, 3) : []; 
 
  //redirect func
  const redirect = () => {
    if (user === null) {
      alert("Please Sign in Account")
      nav('/Auth')
    } else {
      nav('/add-expense')
    }
  }

  return (
    <>

      <div class="card mt-1 border-1 shadow">
        <div class="card-body">
          <div className='container-sm'>
            <h1 className='fs-3 py-3 d-flex justify-content-start font-bold'>Recent-History</h1>
            <div className="table-responsive">
              <table className="table table-success table-striped mt-1">
                <thead>
                  <tr>
                    <th scope="col-">Description</th>
                    <th scope="col-">Amount</th>
                    <th scope="col-">Category</th>
                    <th scope="col-">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    recentThreeExpenses?.map((data, i) =>
                      <>
                        <tr scope="row" key={i}>
                          <td>{data.name}</td>
                          <td>{data.amount}</td>
                          <td>{data.category}</td>
                          <td><button className='btn btn-danger' onClick={() => handleDelete(data._id)}>Delete</button></td>
                        </tr>

                      </>
                    )
                  }
                </tbody>
              </table>
            </div>
            <div className='d-flex justify-content-start'>
              <button onClick={redirect} className='fw-bold btn btn-primary
     text-decoration-none'>
                AddExpense
              </button>
            </div>
          </div>
        </div>

      </div>


    </>
  )
}


