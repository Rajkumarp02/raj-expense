import React from 'react'
import Form from '../Dashboard/FormList'
import Graph from '../Dashboard/Chart'

export default function Home() {
  return (
<div class="container mt-5 p-4">
<div class="row">

    <div class="col-md-6">
    <Graph/>
    </div>
 
   <div class="col-md-6">
    <Form/>
    </div>

  </div>
  </div>
   
 
  )
}
