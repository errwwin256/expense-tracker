import { useExpenses } from "../context/ExpenseContext";
import { useState } from "react";
import { Pencil, Trash2, Check, X, CalendarDays } from "lucide-react";

export default function TransactionList() {
  const { transactions, deleteTransaction, editTransaction } = useExpenses();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editDate, setEditDate] = useState("");

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditText(t.text);
    setEditAmount(t.amount);
    setEditDate(t.date || "");
  };

  const saveEdit = (id) => {
    if (!editText || !editAmount) return;
    editTransaction(id, {
      text: editText,
      amount: +editAmount,
      date: editDate,
    });
    setEditingId(null);
  };

  const formatDate = (date) => {
    if (!date) return "No date";
    const d = new Date(date);
    return d.toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold text-retroYellow mb-3 text-lg">History</h3>
      <ul className="space-y-3">
        {transactions.map((t) => (
          <li
            key={t.id}
            className={`p-4 rounded-lg text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-all ${
              t.type === "income"
                ? "bg-retroGreen/80 hover:bg-retroGreen"
                : "bg-retroPink/80 hover:bg-retroPink"
            } text-retroDark shadow-md`}
          >
            {editingId === t.id ? (
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Description"
                  className="w-full rounded p-2 text-xs border border-retroDark/30"
                />
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-full rounded p-2 text-xs border border-retroDark/30"
                />
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full rounded p-2 text-xs border border-retroDark/30"
                />
              </div>
            ) : (
              <div className="flex-1">
                <span className="font-semibold text-base">{t.text}</span>
                <div className="text-xs flex flex-wrap items-center gap-2 mt-1">
                  <span>₱{t.amount}</span>
                  <span className="flex items-center gap-1 opacity-80">
                    <CalendarDays size={12} />
                    {formatDate(t.date)}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-2 justify-end">
              {editingId === t.id ? (
                <>
                  <button
                    onClick={() => saveEdit(t.id)}
                    className="p-1.5 rounded bg-retroBlue text-white hover:opacity-80"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-1.5 rounded bg-retroPink text-white hover:opacity-80"
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(t)}
                    className="p-1.5 rounded bg-retroBlue text-white hover:opacity-80"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="p-1.5 rounded bg-retroPink text-white hover:opacity-80"
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
