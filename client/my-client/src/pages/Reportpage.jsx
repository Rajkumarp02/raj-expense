import React, { useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { useDispatch, useSelector } from 'react-redux';
import Jspdf from './Jspdf';
import { getTotalcategory } from '../Action/expense';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function ReportPage() {
    const data = useSelector((state) => state.addExpense);
    const total = useSelector((state) => state.Totallist);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTotalcategory())
    },[])

    //months in added to labels
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const monthlyExpenses = Array(12).fill(0); //creates new array length of 12(jan-dec) ex:nov[11]=350
    const category = total?.data?.map(data => data._id)// we get total of categoryList 

    data.data?.docs?.forEach(item => {
        const monthIndex = new Date(item.date).getMonth();//we get month of expense in chart
        monthlyExpenses[monthIndex] += item.amount;//and add also amount to monthlyexpense...
    });
    
    //iterate the monthly expense
    const dataPoints = monthlyExpenses.map((expense, index) => ({
        y: expense,
        label: months[index],
    }));

   //chart of expense
    const options = {
        animationEnabled: true,
        theme: "light1",
        title: {
            text: "Expense Tracker"
        },
        axisX: {
            title: "Expense Month",
            interval: 1,
            labels: months,

        },
        axisY: {
            title: "Expense Amount",
            includeZero: true,
        },
        toolTip: {
            content: category + ":Total-{y}"
        },
        data: [{
            type: "column",
            dataPoints: dataPoints
        }]
    }
    return (
        <div className='mt-5 container'>
            <div>
                <CanvasJSChart options={options} />
            </div>
            <hr />
            <table className="table table-success table-striped mt-1 w-50">
                <thead>
                    <tr>
                        <th scope="col">category</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>

                    {total?.data?.map((data, i) => (

                        <>
                            <tr key={i}>
                                <td>{data._id}</td>
                                <td>{data.total}</td>
                            </tr>
                        </>
                    )
                    )}
                </tbody>
            </table>
            <Jspdf data={total} />
        </div>
    );
}



