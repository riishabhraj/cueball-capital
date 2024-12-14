const express = require("express");
const router = express.Router();
const db = require("../database"); 

// Fetch all investments
router.get("/", async (req, res) => {
    try {
        let query = "SELECT * FROM investments";
        if (req.query.sort === "date") {
            query += " ORDER BY date";
        }
        const rows = await db.db.all(query);
        res.json(rows);
    } catch (error) {
        console.error("Error fetching investments:", error);
        res.status(500).json({ error: "Failed to fetch investments." });
    }
});

// Fetch investments that pass budget rules
router.get("/pass", async (req, res) => {
    try {
        const passingInvestments = await db.db.all(`
      SELECT * FROM investments
      WHERE NOT EXISTS (
        SELECT 1 FROM budget
        WHERE
          (budget.sector IS NULL OR budget.sector = investments.sector) AND
          (budget.time_period IS NULL OR investments.date BETWEEN budget.time_period AND budget.time_period) -- Modify this condition to suit your logic
          AND investments.amount > budget.amount
      )
    `);
        res.json(passingInvestments);
    } catch (error) {
        console.error("Error fetching passing investments:", error);
        res.status(500).json({ error: "Failed to fetch passing investments." });
    }
});

// Fetch investments that violate budget rules
router.get("/violations", async (req, res) => {
    try {
        const violatingInvestments = await db.db.all(`
      SELECT * FROM investments
      WHERE EXISTS (
        SELECT 1 FROM budget
        WHERE
          (budget.sector IS NULL OR budget.sector = investments.sector) AND
          (budget.time_period IS NULL OR investments.date BETWEEN budget.time_period AND budget.time_period) -- Modify this condition to suit your logic
          AND investments.amount > budget.amount
      )
    `);
        res.json(violatingInvestments);
    } catch (error) {
        console.error("Error fetching violating investments:", error);
        res.status(500).json({ error: "Failed to fetch violating investments." });
    }
});

module.exports = router;
