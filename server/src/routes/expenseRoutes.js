// routes/expenseRoutes.js

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

router.post("/expenses",expenseController.createExpense);
router.get("/expenses", expenseController.getExpenses);
router.delete("/expenses/:id", expenseController.deleteExpenses);

module.exports = router;
