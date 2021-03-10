import express from 'express';
import mongoose from 'mongoose';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import jwtCheck from '../middleware/jwtCheck.js';

const router = express.Router();

const generateJWT = (user) => {
  const data = {
    _id: user._id,
    name: user.name,
    email: user.email,
    approved: user.approved,

  };
  const signature = process.env.SIGNATURE;
  const expiration = '1h';

  return jwt.sign({ data }, signature, { expiresIn: expiration });
};

router.post('/signup', async (req, res) => {
  const hashedPassword = await argon2.hash(req.body.password);

  const userRecord = await User.create({
    _id: mongoose.Types.ObjectId(),
    password: hashedPassword,
    username: req.body.username,
    email: req.body.email,
  });

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    username: userRecord.username,
    email: userRecord.email,
  }));
});

router.post('/login', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const userRecord = await User.findOne({ username: req.body.username });
  if (!userRecord) {
    res.status(401);
    res.end(JSON.stringify({ token: undefined, error: 'User not found', authenicated: false }));
    return 0;
  }

  const correctPassword = await argon2.verify(userRecord.password, req.body.password);

  if (!correctPassword) {
    res.status(401);
    res.end(JSON.stringify({ token: undefined, error: 'Incorrect password', authenicated: false }));
    return 0;
  }

  if (!userRecord.approved) {
    res.status(401);
    res.end(JSON.stringify({ token: undefined, error: 'User not approved', authenicated: false }));
    return 0;
  }

  const token = generateJWT(userRecord);
  userRecord.jwtToken = token;
  userRecord.save();

  res.cookie('token', token, { httpOnly: true });
  res.end(JSON.stringify({
    user: {
      email: userRecord.email,
      name: userRecord.name,
    },
    token,
  }));
  return 0;
});

router.get('/authenicated', jwtCheck, (req, res) => {
  res.end(JSON.stringify({ authenicated: true }));
});

router.delete('/logout', jwtCheck, async (req, res) => {
  if (req.statusCode !== 401) {
    await User.findByIdAndUpdate(req.jwtPayload.data._id, { jwtToken: '' });
    res.status(200);
    res.end(JSON.stringify({ message: 'Logout Successful' }));
  }
});

export default router;
