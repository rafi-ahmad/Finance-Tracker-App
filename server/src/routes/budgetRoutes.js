// routes/budgetRoutes.js

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const budgetController = require("../controllers/budgetController");

const router = express.Router();

router.post("/budgets", budgetController.setBudget);
router.get("/budgets", budgetController.getBudgets);
router.delete("/budgets/:id",budgetController.deleteBudgets);

module.exports = router;
