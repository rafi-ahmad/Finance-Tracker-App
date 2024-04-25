// controllers/expenseController.js
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const Expense = require("../models/expenseModel");

const createExpense = async (req, res) => {
  const { description, amount, category } = req.body;
 
  try {
    let id = new Date();
    const objectId = new ObjectId(id.getTime());

    const expense = new Expense({
      description,
      amount,
      category,
      userId: objectId, // Use the generated userId
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
   if (error.code === 11000) {
     // Handle duplicate key error
     res.status(400).json({ message:`Category "${error.keyValue.category}" already exists.` });
   } else {
     // Handle other errors
     res.status(500).json({ message: error.message });
   }
  }
};

const getExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExpenses = async (req, res) => {
  const { id } = req.params;

  try {
    await Expense.findByIdAndDelete(id);
    res.json({ message: "Expenses deleted successfully" });
  } catch (error) {
    console.error("Error deleting Expenses:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createExpense, getExpenses, deleteExpenses };
