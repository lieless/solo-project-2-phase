import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';

const route = express.Router();

route.post('/registration', async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const newUser = await User.create({ name, email, password: hashPassword });
      req.session.userSession = { id: newUser.id, name: newUser.name };
      return res.json({ id: newUser.id, name: newUser.name });
    }
    res.status(400).json({ message: 'Такой email уже занят' });
  } catch (err) {
    console.error(err);
  }
});

route.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password); // возвращает boolean значение
      if (checkPass) {
        req.session.userSession = { id: user.id, name: user.name };
        return res.json({ id: user.id, name: user.name });
      }
    }
    res.status(400).json({ message: 'Email или пароль не верны' });
  } catch (err) {
    console.error(err);
  }
});

route.get('/logout', async (req, res) => {
  res.clearCookie('user_sid'); // Удалить куку
  req.session.destroy(); // Завершить сессию
  res.sendStatus(200);
});

export default route;
