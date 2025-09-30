import mongoose, { Document } from "mongoose";
export interface IExpense extends Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    description: string;
    category: string;
    merchant: string;
    date: Date;
    paymentMethod: string;
    time: string;
}
declare const Expense: mongoose.Model<IExpense, {}, {}, {}, mongoose.Document<unknown, {}, IExpense, {}, {}> & IExpense & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Expense;
//# sourceMappingURL=expensModel.d.ts.map