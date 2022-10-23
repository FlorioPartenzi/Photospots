const prisma = require('../model/index');

const registerUser = async function (req, res) {
  try {
    if (req.body.name && req.body.email) {
      user = {
        data: {
          name: req.body.name,
          email: req.body.email,
          createdAt: new Date().toISOString(),
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
        select: {
          email: true,
          name: true,
          createdAt: true,
          id: true,
          placeIDs: true,
          places: true,
        },
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

const getUserInfoById = async function (req, res) {
  try {
    if (req.email) {
      const id = req.params.id;
      const user = await prisma.users.findUnique({
        where: { id: id },
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

const putUserPinned = async function (req, res) {
  try {
    const place = await prisma.places.findFirst({
      where: { id: req.body.id },
    });
    const user = await prisma.users.findUnique({
      where: { email: req.email },
    });
    if (req.body.add) {
      const userId = await prisma.users.update({
        where: { email: req.email },
        data: {
          pinned: {
            connect: {
              id: place.id,
            },
          },
        },
      });
      res.send(userId);
      res.status(201);
    } else {
      const userId = await prisma.users.update({
        where: { email: req.email },
        data: {
          pinned: {
            disconnect: {
              id: place.id,
            },
          },
        },
      });
      res.send(userId);
      res.status(204);
    }
  } catch (error) {
    console.log('ERROR in controller/index.js at putUserPinned', error);
    res.status(500);
    res.send({ msg: 'failed to update user information' });
  }
};

const getUserPinned = async function (req, res) {
  try {
    const places = await prisma.users.findMany({
      where: { email: req.email },
      select: {
        pinned: {
          select: {
            id: true,
            title: true,
            description: true,
            user: { select: { name: true } },
            imgUrl: true,
            housenumber: true,
            street: true,
            city: true,
            postcode: true,
            country: true,
            lon: true,
            lat: true,
          },
        },
      },
    });
    const pinned = places[0].pinned;

    pinned.map((location) => {
      location.isPinned = true;
    });
    res.send(pinned);
    res.status(200);
  } catch (error) {
    console.log('ERROR in controller/index.js at getUserPinned', error);
    res.status(500);
    res.send({ msg: 'failed to get user pinned places' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  getUserInfoById,
  putUserPinned,
  getUserPinned,
};
