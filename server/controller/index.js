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
        await prisma.users.create(user);
        res.send('registered User');
        res.status(201);
      } else {
        res.send('user allready in use');
        res.status(204);
      }
    } else {
      res.send('failed to register');
      res.status(204);
    }
  } catch (error) {
    console.log('ERROR in controller/index.js at registerUser', error);
    res.send('failed to register');
    res.status(500);
  }
};

const loginUser = async function (req, res) {
  try {
    if (req.body.email && req.body.password) {
      const user = await prisma.users.findUnique({
        where: { email: req.body.email },
      });
      if (user && user.password === req.body.password) {
        res.send('logged in user');
        res.status(200);
      } else {
        res.send('wrong credentials');
        res.status(204);
      }
    } else {
      res.send('wrong credentials');
      res.status(204);
    }
  } catch (error) {
    console.log('ERROR in controller/index.js at loginUser', error);
    res.send('failed to log in');
    res.status(500);
  }
};

const getUserInfo = async function (req, res) {
  try {
    const user = await prisma.users.findUnique({
      where: { email: req.body.email },
      select: { name: true, email: true },
    });
    res.send(user);
    res.status(200);
  } catch (error) {
    console.log('ERROR in controller/index.js at getUserInfo', error);
    res.send('failed to load user information');
    res.status(500);
  }
};

module.exports = { registerUser, loginUser, getUserInfo };
