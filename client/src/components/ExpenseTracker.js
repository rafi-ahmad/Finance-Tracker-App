import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import api from "../services/api";

const ExpenseForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const ExpenseInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ExpenseSelect = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ExpenseButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ExpenseDeleteButton = styled.button`
  background-color: ${(props) => props.color || "#e44d26"};
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const ExpenseList = styled.ul`
  list-style: none;
  padding: 0;
  height: 200px;
  overflow-y: scroll;
`;

const ExpenseItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const ExpenseTracker = ({ getExpense,budgets }) => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "Other",
  });
  const [filterDate, setFilterDate] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    const fetchSavedExpenses = async () => {
      try {
        const response = await api.get("/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching saved expenses:", error);
      }
    };
    fetchSavedExpenses();
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    if (filterDate) {
      const filtered = expenses.filter((expense) =>
        expense.date.includes(filterDate)
      );
      setFilteredExpenses(filtered);
    } else {
      setFilteredExpenses(expenses);
    }
  }, [filterDate, expenses]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      if (!newExpense.description || !newExpense.amount) return;
      // Calculate total budget
      const totalBudget = budgets.reduce(
        (total, expense) => total + expense.amount,
        0
      );

      // Calculate total expense
      const totalExpense = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );

        const categories = [
          "Food",
          "Transportation",
          "Housing",
          "Utilities",
          "Entertainment",
          "Healthcare",
          "Other",
        ];

        categories.forEach((category) => {
          // First, calculate the total amount of expenses for the current category
          const totalExpenses = [...expenses, newExpense].reduce((total, e) => {
            if (e.category === category) {
              return parseInt(total) + parseInt(e.amount);
            }
            return total;
          }, 0);

          // Then, find the budget for the current category
          const budget = budgets.find((budget) => budget.category === category);

          // Compare the total expenses with the budget amount for the current category
          if (budget && totalExpenses > budget.amount) throw new Error(
              category +
                " expenses have exceeded your budget! Total amount: " +
                totalExpenses
            ) 
           
        });

      const budget = budgets.find((budget) => budget.category === newExpense.category);
      if (!budget) {
        throw new Error("You have not created any budget lists.");
      }

     
      // Calculate remaining budget
      const remainingBudget =
        totalBudget - (totalExpense + parseInt(newExpense.amount));
      // Check if remaining budget is negative
      if (remainingBudget < 0) {
        return alert("You have exceeded your budget!");
      }
      const response = await api.post("/expenses", newExpense);
      setExpenses([...expenses, response.data]);
      getExpense([...expenses, response.data]);
      alert("Expense created successfully!");
      setNewExpense({ description: "", amount: "", category: "Other" });
    } catch (error) {
      console.error("Error creating expense:", error);
      alert(error.message);
    }
  };

  const handleDeleteExpense = (id) => {
    api
      .delete(`/expenses/${id}`)
      .then(() => {
        setExpenses(expenses.filter((expense) => expense._id !== id));
        getExpense(expenses.filter((expense) => expense._id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <ExpenseForm onSubmit={handleAddExpense}>
        <ExpenseInput
          type="text"
          value={newExpense.description}
          onChange={(e) =>
            setNewExpense({ ...newExpense, description: e.target.value })
          }
          placeholder="Description"
        />
        <ExpenseInput
          type="number"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
          placeholder="Amount"
        />
        <ExpenseSelect
          value={newExpense.category}
          onChange={(e) =>
            setNewExpense({ ...newExpense, category: e.target.value })
          }
        >
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Housing">Housing</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Other">Other</option>
        </ExpenseSelect>
        <ExpenseButton type="submit">Add Expense</ExpenseButton>
      </ExpenseForm>
      <label htmlFor="filterDate">Filter by Date:</label>
      <input
        type="date"
        id="filterDate"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />
      <h2>Expenses List</h2>
      <ExpenseList>
        {filteredExpenses.map((expense, index) => (
          <ExpenseItem key={index}>
            <span>
              {expense.description} - ${expense.amount} ({expense.category})
            </span>
            <ExpenseDeleteButton
              color="#e44d26"
              onClick={() => handleDeleteExpense(expense._id)}
            >
              <MdDelete />
            </ExpenseDeleteButton>
          </ExpenseItem>
        ))}
      </ExpenseList>
    </div>
  );
};

export default ExpenseTracker;
