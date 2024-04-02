import React from 'react'
import Form from '../Dashboard/FormList'
import Graph from '../Dashboard/Chart'
import Layout from './Layout'

export default function Home() {
  return (
    <Layout pageTitle="Home Page" pageDescription="home page about" url="https://65ac0473e8f5d6becc594df5--funny-syrniki-b736a4.netlify.app/">
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
  </Layout>
   
 
  )
}
