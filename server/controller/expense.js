import Expense from "../models/expense.js";
import mongoose from "mongoose";


//addexpense
export const addExpense =  async (req,res) => {
    const expenseData = req.body;
    const post = new Expense({...expenseData})
    try{
      await post.save();
      return res.status(200).json({status:"Succesfully Submitted"})

    }catch(err){
      console.log(err);
      return res.status(404).json({status:"coudn't posted expense"})
    }
}


//getexpense
export const getExpense = async (req,res) =>{
    const {page} = req?.query;
 try{
     const DataList = await Expense.paginate({},{limit:5, page:Number(page)});
     res.status(200).json(DataList)
    }catch(err){
      console.log(err)
     res.status(404).json("coudn't posted data")
   
    }
   
   }


  //updateexpense
export const updateExpense = async (req,res) => {
   const {id:_id} = req.params;
   const {name,amount,category} = req.body;
   

   if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(" unavailable...");
  }
  
  try{
    const update = await Expense.findByIdAndUpdate(
      _id,{
      $set:{
        name:name, amount:amount, category:category,
      }
     }, {new: true}
    );
    res.json(update);
  }catch(error) {
    res.json(error);
  }
}
   


//deleteexpense
export const deleteExpense = async (req,res) => {
  const {id:_id} =req.params;
  console.log(_id)
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("invalid id...");
  }
try{
   const DataList = await Expense.findByIdAndDelete(_id);
   return res.json(DataList)
  }catch(err){
  console.log(err)
  return res.json(err)
  }
 }



 //Totallist
 export const TotalList =  async (req,res) => {
  try {
    const Total = await Expense.aggregate(
      [
        {
        $group: {
          _id:'$category',
          total:{$sum : '$amount'}
        }
      }
      ]);
      res.send(Total);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
 }