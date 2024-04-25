// const Budget = require("../models/budgetModel");

// const getBudgets = async () => {
//   try {
//     return await Budget.find();
//   } catch (error) {
//     console.error("Error getting budgets:", error);
//     throw error;
//   }
// };

// // Define an async function to call getBudgets and log the result
// const logBudgets = async () => {
//   try {
//     const budgets = await getBudgets();
//     console.log(budgets);
//   } catch (error) {
//     console.error("Error logging budgets:", error);
//   }
// };

// // Call the logBudgets function
// logBudgets();


let json = [
  {
    Name: "hello",
  },
];

// Create a new array by spreading the existing array and adding the new object
json = [...json, { Name: "bill" }];

console.log(Object.values({ Name: "bill" }));
