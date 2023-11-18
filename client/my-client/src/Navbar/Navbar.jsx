import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { currentuser } from '../Action/currentuser'
import decode from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function Navbar() {

  const user = useSelector((state) => state.currentuserReducer);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const tokenUser = user?.token
    if (tokenUser) {
      const decoded = decode(tokenUser)
      if (decoded.exp * 1000 < new Date().getTime()) {
        handleLogout()
      }
    }
    dispatch(currentuser(JSON.parse(localStorage.getItem('profile'))))

  }, [dispatch])

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/')
    dispatch(currentuser(null))
  }



  return (
    <>
      <nav class="navbar navbar-expand-lg  navbar-light bg-info shadow-sm">
        <div class="container">
          <h1 class="navbar-brand fw-bolder text-white rounded">Expense Tracker</h1>
          <button class="navbar-toggler shadow-none border-0"
            type="button"
            onClick={toggleCollapse}
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item mx-2">
                <Link to='/' class='nav-item nav-link text-danger fw-bold btn btn-outline-warning'>
                  DashBoard
                </Link>
              </li>

              <li class="nav-item mx-2">
                <Link to='/viewexpense' class='nav-item nav-link text-danger fw-bold btn btn-outline-warning'>
                  Expense-List
                </Link>
              </li>

              <li class="nav-item mx-2">
                <Link to='/Reportpage' class='nav-item nav-link text-danger fw-bold btn btn-outline-warning'>
                  ReportPage
                </Link>
              </li>
              <div className="nav-item  mx-2">
                {user === null ?
                  <Link to='/Auth' class='nav-item nav-link text-danger fw-bold btn btn-outline-warning'>
                    Signin
                  </Link> :
                  <>
                    <button class='signin' onClick={handleLogout}>
                      Logout
                      <Avatar backgroundColor='rgb(20, 194, 194)' color='white' width='36px' borderRadius='40px' px='10px' py='7px' textDecoration='none'> {user?.result?.name.charAt(0).toUpperCase()}</Avatar>
                    </button>
                  </>
                }
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>

  )
}