import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useExpenses } from "../context/ExpenseContext";
import { useEffect, useState } from "react";

export default function ExpenseChart() {
  const { income, expense } = useExpenses();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = income + expense;
  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const COLORS = ["#81c784", "#ff77a8"]; // pastel green & pink

  // ✅ Show numeric value inside each slice
  const renderValueLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="#222"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
      >
        ₱{value.toLocaleString()}
      </text>
    );
  };

  // ✅ Custom tooltip to show amount + percentage
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percent = ((item.value / total) * 100).toFixed(1);
      return (
        <div className="bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg px-3 py-2 shadow-md text-sm text-gray-800">
          <p className="font-semibold">{item.name}</p>
          <p>
            ₱{item.value.toLocaleString()} ({percent}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-6 bg-gradient-to-br from-retroBlue/40 to-retroYellow/40 rounded-2xl p-5 shadow-lg border border-retroDark/20 backdrop-blur-md">
      <h3 className="font-bold text-retroDark mb-3 text-lg">Overview</h3>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 60 : 40}
              outerRadius={isMobile ? 90 : 80}
              isAnimationActive={true}
              animationDuration={1000}
              labelLine={false}
              label={renderValueLabel}
            >
              {data.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={COLORS[i]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            {!isMobile && (
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{
                  fontSize: "13px",
                  marginTop: "10px",
                  color: "#333",
                }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Total summary text */}
      <div className="text-center text-sm text-retroDark mt-3 font-medium">
        Total: ₱{total.toLocaleString()}
      </div>
    </div>
  );
}
