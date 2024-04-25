const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});


const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
