import mongoose from'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const expenseSchema =  mongoose.Schema({
    name:{type:String, required:true},
    amount:{type:Number,match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,},
    category:{type:String, required:true},
    date:{type:Date , default:Date.now},
   })

//pagination
expenseSchema.plugin(mongoosePaginate);

export default mongoose.model("Expense",expenseSchema)