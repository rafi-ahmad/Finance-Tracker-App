// controllers/budgetController.js
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Budget = require("../models/budgetModel");


const setBudget = async (req, res) => {
  const { category, amount } = req.body;
  let id = new Date();
  const objectId = new ObjectId(id.getTime());
  // Create a new budget object using the data from the request body
  const newBudget = new Budget({
    category: category,
    amount: amount,
    userId: objectId,
  });
  try {
    // Save the new budget to the database
    await newBudget.save();
    // Send the newly created budget as a JSON response
    res.status(201).json(newBudget);
  } catch (error) {
   if (error.code === 11000) {
     // Handle duplicate key error
     res
       .status(400)
       .json({
         message: `Category "${error.keyValue.category}" already exists.`,
       });
   } else {
     // Handle other errors
     res.status(500).json({ message: error.message });
   }
  }
};

const getBudgets = async (req, res) => {
  try {
    const userId = req.userId;
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBudgets = async (req, res) => {
   const { id } = req.params;

   try {
     await Budget.findByIdAndDelete(id);
     res.json({ message: "Budget deleted successfully" });
   } catch (error) {
     console.error("Error deleting Budget:", error.message);
     res.status(500).json({ error: "Server error" });
   }
};

module.exports = { setBudget, getBudgets,deleteBudgets};
