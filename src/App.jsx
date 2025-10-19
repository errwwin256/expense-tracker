import Home from "./pages/Home";
import Header from "./components/Header";
import { ExpenseProvider } from "./context/ExpenseContext";

export default function App() {
  return (
    <ExpenseProvider>
      <Header />
      <Home />
    </ExpenseProvider>
  );
}
