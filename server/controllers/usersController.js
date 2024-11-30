const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(`${name}, email: ${email}, password: ${password}`);
  
    try {
      // Проверка, существует ли пользователь с таким email
      const existingUser = await prisma.user.findUnique({
        where: { email }, // Используем "where" для уникального поиска
      });
  
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }
  
      // Хэширование пароля
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Создание пользователя
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
  
      console.log("user: ",user);
      return res.status(201).json(user);
    } catch (error) {
        console.log(error.message)
      res.status(400).json({ error: error.message });
    }
  };
  

const getUsers=async(req,res)=>{
    try {
        const users = await prisma.user.findMany();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports={register,getUsers}