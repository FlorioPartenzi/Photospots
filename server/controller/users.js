const prisma = require('../model/index');

const registerUser = async function (req, res) {
  try {
    if (req.body.name && req.body.email) {
      user = {
        data: {
          name: req.body.name,
          email: req.body.email,
        },
      };
      const userAllreadyInUse = await prisma.users.findUnique({
        where: { email: req.body.email },
      });
      if (!userAllreadyInUse) {
        const newUser = await prisma.users.create(user);
        res.status(201);
        res.send(newUser);
      } else {
        res.status(204);
        res.send({ msg: 'user already in use' });
      }
    } else {
      res.status(204);
      res.send({ msg: 'failed to register' });
    }
  } catch (error) {
    console.log('ERROR in controller/index.js at registerUser', error);
    res.status(500);
    res.send({ msg: 'failed to register' });
  }
};

const loginUser = async function (req, res) {
  try {
    if (req.email) {
      const user = await prisma.users.findUnique({
        where: { email: req.email },
      });
      res.status(200);
      res.send(user);
    } else {
      res.status(204);
      res.send({ msg: 'wrong credentials' });
    }
  } catch (error) {
    console.log('ERROR in controller/index.js at loginUser', error);
    res.status(500);
    res.send({ msg: 'failed to log in' });
  }
};

const getUserInfo = async function (req, res) {
  try {
    if (req.email) {
      const user = await prisma.users.findUnique({
        where: { email: req.email },
        select: { name: true, email: true },
      });

      res.status(200);
      res.send(user);
    } else {
      res.status(204);
      res.send({ msg: 'unauthorized' });
    }
  } catch (error) {
    console.log('ERROR in controller/index.js at getUserInfo', error);
    res.status(500);
    res.send({ msg: 'failed to load user information' });
  }
};

module.exports = { registerUser, loginUser, getUserInfo };
