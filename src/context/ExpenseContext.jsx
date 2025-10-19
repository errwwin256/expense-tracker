import { createContext, useState, useContext, useEffect } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save to localStorage when transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (id, updated) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
        income,
        expense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
