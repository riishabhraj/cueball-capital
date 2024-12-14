# Cueball Capital
Cueball Capital is a platform for analyzing investments, budget allocations, and sectors 
in the financial sector. This repository includes the backend logic implemented with Node.js, 
Express, and SQLite for storing and managing investment and budget data.

## Features
Investment Routes: Fetch, filter, and analyze investments.
Budget Management: Track budgets for different sectors and time periods.
Sector-based Analysis: Compute the remaining budget for each sector after considering investments.
Trend Analysis: Visualize investment patterns over time.

## Folder Structure
``` json 
/cueball-capital
  ├── data/           # Dataset files (CSV/JSON)
  ├── db/             # SQLite database files
  ├── routes/         # API routes for investments and budgets
  ├── database.js     # Database connection and setup
  ├── index.js        # Main server file
  ├── package.json    # Project dependencies and metadata
  ├── package-lock.json
```

## Setup
Clone this repository.
Run npm install to install the required dependencies.
Configure your database if needed.
Start the server with npm start.

## Endpoints
### Investment Routes
GET /api/investments: Fetch all investments.
GET /api/investments/pass: Fetch investments that pass budget rules.
GET /api/investments/violations: Fetch investments that violate budget rules.

### Budget Routes
GET /api/budget: Fetch all budget data.

## Example Usage
Fetch all investments:

``` json 
curl -X GET http://localhost:3000/api/investments
```

Fetch investments that pass budget rules:
``` 
curl -X GET http://localhost:3000/api/investments/pass
```

## JSON Data Sample
Budget Example:

``` json 
{
  "ID": 1,
  "Amount": 75,
  "Time Period": "Month",
  "Sector": "FinTech"
}
```
Investment Example:

``` json 
{
  "ID": 1,
  "Date": "2020-06-01",
  "Amount": 10,
  "Sector": "BigData"
}
```

## Technologies Used
Node.js: JavaScript runtime.
Express.js: Web framework for building APIs.
SQLite: Lightweight database for managing investment and budget data.

## Contributing
Feel free to fork this repository and submit issues or pull requests to contribute to the project!
