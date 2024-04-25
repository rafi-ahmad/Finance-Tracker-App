// App.js

import React,{useState,useEffect} from "react";
import api from "./services/api";
import ExpenseTracker from "./components/ExpenseTracker";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseBudgetGraph from "./components/ExpenseBudgetGraph";
import styled from "styled-components";
const AppContainer = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  background-color: #282c34;
  padding: 20px 0;
  color: white;
`;

const MainContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  width: 300px;
  max-width: calc(100% - 40px);
`;
const CardGraph = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto; /* Center the card horizontally */
  width: 1000px; /* Initial width */
  max-width: calc(100% - 40px);

  @media (max-width: 1200px) {
    width: 800px; /* Adjust width for medium screens */
  }

  @media (max-width: 900px) {
    width: 600px; /* Adjust width for small screens */
  }

  @media (max-width: 600px) {
    width: 400px; /* Adjust width for extra small screens */
  }

  @media (max-width: 400px) {
    width: calc(100% - 40px); /* Full width for very small screens */
  }
`;


const Footer = styled.footer`
  background-color: #282c34;
  color: white;
  padding: 20px 0;
  height: 100px;
`;

function App() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const fetchSavedExpenses = async () => {
      try {
        const response = await api.get("/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching saved expenses:", error);
      }
    };
    const fetchBudgets = async () => {
      try {
        const response = await api.get("/budgets");
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    fetchBudgets()
    fetchSavedExpenses();
  }, []);
  const getExpenses = (expense) =>{
     setExpenses(expense);
  }
  return (
    <AppContainer>
      <Header>
        <h1>Finance Tracker App</h1>
      </Header>
      <MainContainer>
        <Card>
          <ExpenseTracker getExpense={getExpenses} budgets={budgets} />
        </Card>
        <Card>
          <BudgetTracker myExpenses={expenses} />
        </Card>
      </MainContainer>
        <CardGraph><ExpenseBudgetGraph expenses={expenses} budgets={budgets}/></CardGraph>
      <Footer>
        <p>© 2024 Finance Tracker App. All rights reserved.</p>
      </Footer>
    </AppContainer>
  );
}

export default App;
