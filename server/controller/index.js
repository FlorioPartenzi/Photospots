const prisma = require('../model/index');

const registerUser = async function (req, res) {
  try {
    if (req.body.name && req.body.email && req.body.password) {
      user = {
        data: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      };
      const userAllreadyInUse = await prisma.users.findUnique({
        where: { email: req.body.email },
      });
      if (!userAllreadyInUse) {
        const newUser = await prisma.users.create(user);
        res.send(newUser);
        res.status(201);
      } else {
        res.send({ msg: 'user allready in use' });
        res.status(204);
      }
    } else {
      res.send({ msg: 'failed to register' });
      res.status(204);
    }
  } catch (error) {
    console.log('ERROR in controller/index.js at registerUser', error);
    res.send({ msg: 'failed to register' });
    res.status(500);
  }
};

const loginUser = async function (req, res) {
  console.log(req.body);
  try {
    if (req.body.email && req.body.password) {
      const user = await prisma.users.findUnique({
        where: { email: req.body.email },
      });
      if (user && user.password === req.body.password) {
        res.send(user);
        res.status(200);
      } else {
        res.send({ msg: 'wrong credentials' });
        res.status(204);
      }
    } else {
      res.send({ msg: 'wrong credentials' });
      res.status(204);
    }
  } catch (error) {
    console.log('ERROR in controller/index.js at loginUser', error);
    res.send({ msg: 'failed to log in' });
    res.status(500);
  }
};

const getUserInfo = async function (req, res) {
  try {
    const user = await prisma.users.findUnique({
      where: { email: req.body.email },
      select: { name: true, email: true },
    });
    res.status(200);
    res.send(user);
  } catch (error) {
    console.log('ERROR in controller/index.js at getUserInfo', error);
    res.send({ msg: 'failed to load user information' });
    res.status(500);
  }
};

module.exports = { registerUser, loginUser, getUserInfo };
