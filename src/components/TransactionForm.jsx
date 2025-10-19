import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

export default function TransactionForm() {
  const { addTransaction } = useExpenses();
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    addTransaction({
      id: Date.now(),
      text,
      amount: +amount,
      type,
      date,
    });

    setText("");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-retroPink text-retroDark rounded-2xl p-4 mt-6 shadow-lg"
    >
      <h3 className="font-bold mb-2 text-base">Add Transaction</h3>

      <input
        type="text"
        placeholder="Description"
        className="w-full p-2 rounded mb-2 text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        className="w-full p-2 rounded mb-2 text-sm"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="date"
        className="w-full p-2 rounded mb-2 text-sm"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <select
        className="w-full p-2 rounded mb-3 text-sm"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button
        type="submit"
        className="bg-retroBlue text-retroDark w-full py-2 font-bold rounded text-sm"
      >
        Add
      </button>
    </form>
  );
}
