import { useExpenses } from "../context/ExpenseContext";

export default function BalanceCard() {
  const { income, expense } = useExpenses();
  const balance = income - expense;

  return (
    <div className="mt-6 bg-retroYellow text-retroDark rounded-2xl p-4 shadow-md">
      <h2 className="font-bold text-lg mb-1">Current Balance</h2>
      <p className="text-2xl font-extrabold">₱{balance}</p>
      <div className="flex justify-between text-sm mt-2">
        <span>Income: ₱{income}</span>
        <span>Expense: ₱{expense}</span>
      </div>
    </div>
  );
}
