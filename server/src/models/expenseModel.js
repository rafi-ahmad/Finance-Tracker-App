// models/expenseModel.js

const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number
    },
    category: {
      type: String,
      enum: [
        "Food",
        "Transportation",
        "Housing",
        "Utilities",
        "Entertainment",
        "Healthcare",
        "Other",
      ],
      default: "Other",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
