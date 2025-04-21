const express = require('express');
const cors = require('cors');
const app = express();
const employeeRoutes = require('./routes/employee.routes');

app.use(cors());
app.use(express.json());

// Route middleware
app.use('/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
