import React from 'react'
import { jsPDF } from "jspdf";

export default function Jspdf({data}) {

//we get data from parent component

//report func
const getReport = () => {
    const doc = new jsPDF();
    doc.text("Expense List", 10, 10);
  
    let y = 30;// it will be set vertical align for pdf

data?.data?.map((data) => {
      doc.text(`Category: ${data._id}, Total: $${data.total}`, 10, y);
      y += 10;
     });


doc.save("expenseList_report.pdf");

}

  return (
    <div>
      <button className='btn btn-danger ' onClick={getReport}>Download Report</button>
    </div>
  )
}
