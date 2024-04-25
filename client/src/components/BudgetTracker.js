import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import api from "../services/api";

const BudgetForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const BudgetInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const BudgetButton = styled.button`
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

const BudgetsDeleteButton = styled.button`
  background-color: ${(props) => props.color || "#e44d26"};
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const CategoryBudgetList = styled.ul`
  list-style: none;
  padding: 0;
  height: 200px;
  overflow-y: scroll;
`;

const CategoryBudgetItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const CategorySelect = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

function BudgetTracker({myExpenses}) {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ category: "", amount: "" });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await api.get("/budgets");
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const handleAddBudget = async (e) => {
    e.preventDefault();
    try {
      if (!newBudget.category || !newBudget.amount) return;
      const response = await api.post("/budgets", newBudget);
      setBudgets([...budgets, response.data]);
      setNewBudget({ category: "", amount: "" });
      alert("Budget created successfully!");
    } catch (error) {
      //console.error("Error creating budget:", error);
      if (error.response.status === 400) {
        alert(error.response.data.message);
      }
      console.error(error);
    }
  };

  const calculateTotalBudget = () => {
    return budgets.reduce((total, budget) => total + budget.amount, 0);
  };

  const calculateTotalExpenses = () => {
    // Calculate total expenses by category
    // Replace this with your actual expense data and logic
  
    return  myExpenses.reduce(
    (total, expense) => total + expense.amount,
     0
     );
  };

  const remainingBudget = calculateTotalBudget() - calculateTotalExpenses();

  const deleteBudget = (id) => {
    api
      .delete(`/budgets/${id}`)
      .then(() => setBudgets(budgets.filter((todo) => todo._id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Budget Tracker</h2>
      <BudgetForm onSubmit={handleAddBudget}>
        <CategorySelect
          value={newBudget.category}
          onChange={(e) =>
            setNewBudget({ ...newBudget, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Housing">Housing</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Other">Other</option>
        </CategorySelect>
        <BudgetInput
          type="number"
          value={newBudget.amount}
          onChange={(e) =>
            setNewBudget({ ...newBudget, amount: e.target.value })
          }
          placeholder="Enter budget amount"
        />
        <BudgetButton type="submit">Set Budget</BudgetButton>
      </BudgetForm>
      <p>Total Budget: ${calculateTotalBudget()}</p>
      <p>Total Expenses: ${calculateTotalExpenses()}</p>
      <p>Remaining Budget: ${remainingBudget}</p>
      <h2>Budget List</h2>
      <CategoryBudgetList>
        {budgets.map((budget) => (
          <CategoryBudgetItem key={budget._id}>
            <span>{budget.category}</span>
            <span>${budget.amount}</span>
            <BudgetsDeleteButton onClick={() => deleteBudget(budget._id)}>
              <MdDelete />
            </BudgetsDeleteButton>
          </CategoryBudgetItem>
        ))}
      </CategoryBudgetList>
    </div>
  );
}

export default BudgetTracker;
