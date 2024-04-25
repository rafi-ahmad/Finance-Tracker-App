import React from "react";
import { Chart } from "react-google-charts";

function ExpenseBudgetGraph({ expenses, budgets }) {
  // Check if expenses and budgets data are available
  if (!expenses || !budgets || expenses.length === 0 || budgets.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  // Prepare data for the chart
  const chartData = [
    ["Category", "Expenses", "Budgets"],
    ...expenses.map(({ category, amount }) => [category, amount, null]),
    ...budgets.map(({ category, amount }) => [category, null, amount]),
  ];

  return (
    <div>
      <h2>Expense and Budget Graph</h2>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          title: "Expenses and Budgets by Category",
          chartArea: { width: "60%" },
          hAxis: { title: "Amount", minValue: 0 },
          vAxis: { title: "Category" },
          legend: "bottom",
        }}
      />
    </div>
  );
}

export default ExpenseBudgetGraph;
