const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const userRoutes=require('./routes/usersRoutes')
const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use('/api/auth',userRoutes)

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
