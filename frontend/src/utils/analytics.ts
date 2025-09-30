import { Expense } from "@/context/UserContext";

export function amountSum(expenses:Expense[]){
    let sum=0
    expenses.forEach((e)=>{
        sum=sum+e.amount
    })
    return sum
}

interface CategoryAnalysis {
    category: string;
    totalAmount: number;
    count: number;
    percentage: number;
}


export function expenseByCategory(expenses: Expense[]): CategoryAnalysis[] {
    if (!expenses.length) return [];

    const totalAmount = amountSum(expenses);
    const categoryData: { [key: string]: CategoryAnalysis } = {};

        
    expenses.forEach((expense) => {
        const { category, amount } = expense;

        if (!categoryData[category]) {
            categoryData[category] = {
                    category: category,
                    totalAmount: 0,
                    count: 0,
                    percentage: 0
                };
            }

            categoryData[category].totalAmount += amount;
            categoryData[category].count += 1;
        });

        // Calculate percentages and create result array
        const result: CategoryAnalysis[] = [];
        
        for (const category in categoryData) {
            const data = categoryData[category];
            data.percentage = Number(((data.totalAmount / totalAmount) * 100).toFixed(2));
            result.push(data);
        }

        return result;
}

export function budgetUsed(expenses:Expense[],budget:number){
    const totalAmntSpent=amountSum(expenses);
    const budgetPercent=Number((totalAmntSpent/budget)*100).toFixed(2);
    return budgetPercent;
}

interface MonthlyTransaction {
    month: string;
    totalAmount: number;
    count: number;
}

export function transactionsByMonth(expenses: Expense[]): MonthlyTransaction[] {
    if (!expenses.length) return [];

    const monthlyData: { [key: string]: MonthlyTransaction } = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    expenses.forEach((expense) => {
        const date = new Date(expense.date);
        const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {
                month: monthKey,
                totalAmount: 0,
                count: 0
            };
        }

        monthlyData[monthKey].totalAmount += expense.amount;
        monthlyData[monthKey].count += 1;
    });

    
    return Object.values(monthlyData).sort((a, b) => {
        const [aMonth, aYear] = a.month.split(' ');
        const [bMonth, bYear] = b.month.split(' ');
        
        if (aYear !== bYear) {
            return Number(bYear) - Number(aYear);
        }
        return monthNames.indexOf(bMonth) - monthNames.indexOf(aMonth);
    });
}