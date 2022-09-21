const prisma = require('../model/index');

const postNewPlace = async function (req, res) {
  try {
    const place = await prisma.users.update({
      where: { email: req.body.email },
      data: {
        places: {
          create: {
            title: req.body.title,
            address: req.body.address,
            description: req.body.description,
          },
        },
      },
    });
    res.status(200);
    res.send(place);
  } catch (error) {
    console.log('ERROR in controller/places.js at postNewPlace', error);
    res.status(500);
    res.send('failed to create new place');
  }
};

const getAllPlaces = async function (req, res) {
  try {
    const places = await prisma.places.findMany({});
    res.status(200);
    res.send(places);
  } catch (error) {
    console.log('ERROR in controller/places.js at postNewPlace', error);
    res.status(500);
    res.send('failed to create new place');
  }
};

const getPlacesByUser = async function (req, res) {
  try {
    const places = await prisma.users.findUnique({
      where: { email: req.body.email },
      select: { places: true },
    });
    res.status(200);
    res.send(places);
  } catch (error) {
    console.log('ERROR in controller/places.js at postNewPlace', error);
    res.status(500);
    res.send('failed to create new place');
  }
};

module.exports = { postNewPlace, getAllPlaces, getPlacesByUser };
