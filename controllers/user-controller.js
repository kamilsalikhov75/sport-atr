import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.js';

export async function register(req, res) {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      name: req.body.name,
      email: req.body.email,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user.id,
      },
      'sport-code',
      {
        expiresIn: '30d',
      }
    );

    res.json({
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось зарегистрироваться');
  }
}

export async function login(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    res.json({
      token,
    });
  } catch (error) {
    onsole.log(error);
    res.status(500).send('Не удалось авторизоваться');
  }
}

export async function getUser(req, res) {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json({ userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}

export function checkToken(req, res, next) {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123');

      req.userId = decoded._id;
      next();
    } catch (err) {
      return res.status(403).json({
        message: 'Нет доступа',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
    });
  }
}
