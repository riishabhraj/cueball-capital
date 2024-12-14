const express = require("express");
const router = express.Router();
const db = require("../database");  

// Fetch all budget rules
router.get("/", async (req, res) => {
    try {
        const rows = await db.db.all("SELECT * FROM budget");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching budget rules:", error); 
        res.status(500).json({ error: "Failed to fetch budget rules." });
    }
});

module.exports = router;
