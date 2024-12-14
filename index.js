const express = require('express');
const { initializeDatabase } = require('./database');
const budgetRoutes = require("./routes/budget");
const investmentRoutes = require("./routes/investments");

const app = express();
const PORT = 3000;

// Initialize the database
initializeDatabase();

app.use(express.json());
app.use("/api/budget", budgetRoutes);
app.use("/api/investments", investmentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
