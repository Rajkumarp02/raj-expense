import './App.css';
import Auth from './pages/Auth';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Rootlayout from './Navbar/RootLayout';
import Home from './pages/Home';
import Forget from './pages/Forget';
import AddExpense from './pages/AddExpense';
import Viewexpense from './pages/Viewexpense';
import { getTotalcategory, getexpense } from './Action/expense.js';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Edit from './pages/Edit';
import Reportpage from './pages/Reportpage';
//import { currentuser } from './Action/currentuser';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getexpense())
    dispatch(getTotalcategory())
  }, [dispatch])


  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Rootlayout />}>
      <Route index element={<Home />} />
      <Route path='/Auth' element={<Auth />} />
      <Route path='/forget' element={<Forget />} />
      <Route path='/add-expense' element={<AddExpense />} />
      <Route path='/viewexpense' element={<Viewexpense />} />
      <Route path='/edit/:id' element={<Edit />} />
      <Route path='/Reportpage' element={<Reportpage />} />
    </Route>
  )

  )


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
