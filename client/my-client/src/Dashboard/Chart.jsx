import React from 'react'
import { useSelector } from 'react-redux';
import CanvasJSReact from '@canvasjs/react-charts';



var CanvasJSChart = CanvasJSReact.CanvasJSChart;



export default function Graph() {
  //const data = useSelector((state) => state.addExpense);
  const total = useSelector((state) => state.Totallist);
    
  const totalAmount = total?.data?.reduce((total, expense) => total + expense.total, 0);
  //1st
  //we get single value using reduce method
  //(0,expense(we get data for expenselist) => 0+200,initialvalue(0)) 
  //2nd
  //we get 200 from first expense.amount and then ,it will be added amount to total... now initial value is(200)
  //it will be calculated over iterarte array..


  const dataPoints =total?.data?.map((data) => ({
    name: data._id,
    y: (data.total / totalAmount) * 100, // Calculate the percentage 
  }));

  const options = {
    animationEnabled: true,
    title: {
      text: "Expense PieChart"
    },
    

    data: [{
      type: "doughnut",
      showInLegend: true,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###'%'",
      dataPoints: dataPoints
    }]
  }

  return (
    <>
      <div className="card mt-1">
        <div className="card-body ">
          <div className='chart w-75 p-4 h-25 flex justify-content max-w-xs mx-auto container'>
            <CanvasJSChart options={options} />
            <h3 className='mb-1 fs-10 title'>Total <br />
              <span className='block fw-bold text-success'>{totalAmount}$</span>
            </h3>
          </div>
        </div>
      </div>
    </>
  )
}
