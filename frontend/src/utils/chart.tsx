"use client";

import { useUser } from "@/context/UserContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";




import { Expense } from "@/context/UserContext";

type WeeklyExpense = {
  day: string;
  expense: number;
};

type MonthlyExpense = {
  week: string;
  expense: number;
};

type YearlyExpense = {
  month: string;
  expense: number;
};



type ExpenseAreaChartProps = {
  selectedData: 'weekly' | 'monthly' | 'yearly';
};








export default function ExpenseAreaChart({selectedData}:ExpenseAreaChartProps) {
    const {viewExpenses}=useUser()
    const {year,month}=getCurrentMonthYear()

    let data: WeeklyExpense[] | MonthlyExpense[] | YearlyExpense[];

switch (selectedData) {
  case "weekly":
    data = getWeeklyExpenses(viewExpenses);
    break;
  case "monthly":
    data = getMonthlyExpenses(viewExpenses, year, month);
    console.log(data)
    break;
  case "yearly":
  default:
    data = getYearlyExpenses(viewExpenses, year);
    break;
}
const xDataKey = selectedData === "weekly" 
  ? "day" 
  : selectedData === "monthly" 
    ? "week" 
    : "month";

  console.log(month,year)
  return (
    
        <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xDataKey} />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="expense" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>

  );
}

function getWeeklyExpenses(expenses: Expense[]) {
  // Initialize empty totals for each day
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totals: Record<string, number> = {};
  days.forEach(day => (totals[day] = 0));

  // Sum expenses by weekday
  expenses.forEach(exp => {
    const d = new Date(exp.date);
    const dayName = days[d.getDay()]; // 0=Sun, 1=Mon...
    totals[dayName] += exp.amount;
  });

  // Convert into array for Recharts
  return days.map(day => ({
    day,
    expense: totals[day],
  }));
}


function getYearlyExpenses(expenses: Expense[], year: number) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const totals: Record<string, number> = {};
  months.forEach(m => (totals[m] = 0));

  expenses.forEach(exp => {
    const d = new Date(exp.date);
    if (d.getFullYear() === year) {
      const monthName = months[d.getMonth()]; // 0 = Jan
      totals[monthName] += exp.amount;
    }
  });

  return months.map(m => ({
    month: m,
    expense: totals[m],
  }));
}

function getMonthlyExpenses(expenses: Expense[], year: number, month: number) {
  // month is 0-based (0 = Jan, 1 = Feb...)
  const totals: Record<string, number> = { "Week 1": 0, "Week 2": 0, "Week 3": 0, "Week 4": 0, "Week 5": 0 };

  expenses.forEach(exp => {
    const d = new Date(exp.date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate(); // day of month
      const weekNumber = Math.ceil(day / 7); // 1-5
      totals[`Week ${weekNumber}`] += exp.amount;
    }
  });

  return Object.keys(totals).map(week => ({
    week,
    expense: totals[week],
  }));
}


function getCurrentMonthYear() {
  const now = new Date();
  return {
    month: now.getMonth(), // 0 = Jan
    year: now.getFullYear(),
  };

  
}


