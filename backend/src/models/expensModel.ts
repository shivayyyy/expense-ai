import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  description: string;
  category: string;
  merchant: string;
  date: Date;
  paymentMethod:string;
  time:string
  
}

const ExpenseSchema = new Schema<IExpense>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount cannot be negative']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [30, 'Description cannot exceed 500 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    merchant: {
      type: String,
      required: [true, 'Merchant name is required'],
      trim: true
    },
     time: {
      type: String,
      required: [true, 'Time is required'],
      validate: {
        validator: function(v: string) {
          // Validate time format (HH:mm)
          return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
        },
        message: props => `${props.value} is not a valid time format! Use HH:mm format`
      },
      default: () => new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },

    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now
    },
    
    paymentMethod:{
      type:String,
      enum:{
        values:['Cash','Credit Card','Debit Card','UPI','Net Banking','UPI wallet','EMI','Cheque'],
        message: '{VALUE} is not supported'
      },
      default:'Cash'
    }
    
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for better query performance
ExpenseSchema.index({ userId: 1, date: -1 });
ExpenseSchema.index({ category: 1 });
ExpenseSchema.index({ status: 1 });

const Expense = mongoose.model<IExpense>('Expense', ExpenseSchema);

export default Expense;