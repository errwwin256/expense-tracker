import BalanceCard from "../components/BalanceCard";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";

export default function Home() {
  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto flex flex-col gap-10">
      {/* Top Section - Two Columns on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Left: Add Transaction */}
        <div className="flex flex-col items-start bg-gradient-to-br from-retroPink/40 to-retroYellow/40 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-retroDark/20 hover:shadow-retroPink/40 transition-all">
          <h2 className="text-xl font-semibold mb-4 text-retroDark drop-shadow-sm">
            Transaction
          </h2>
          <TransactionForm />
        </div>

        {/* Right: Overview + Current Balance (grouped in one panel) */}
        <div className="flex flex-col gap-6 bg-gradient-to-br from-retroBlue/40 to-retroPink/40 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-retroDark/20 hover:shadow-retroBlue/40 transition-all">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-retroDark drop-shadow-sm">
              Chart
            </h2>
            <ExpenseChart />
          </div>

          <div className="border-t border-retroDark/20 pt-4">
            <h2 className="text-xl font-semibold mb-4 text-retroDark drop-shadow-sm">
              Balance
            </h2>
            <BalanceCard />
          </div>
        </div>
      </div>

      {/* Bottom Section - History */}
      <div className="w-full bg-gradient-to-br from-retroYellow/40 to-retroBlue/40 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-retroDark/20 hover:shadow-retroYellow/40 transition-all">
        <h2 className="text-xl font-semibold mb-4 text-retroDark drop-shadow-sm">
          Transaction History
        </h2>
        <TransactionList />
      </div>
    </div>
  );
}
