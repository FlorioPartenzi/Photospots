const prisma = require('../model/index');

const postNewPlace = async function (req, res) {
  try {
    const place = await prisma.users.update({
      where: { email: req.email },
      data: {
        places: {
          create: {
            title: req.body.title,
            address: req.body.address,
            description: req.body.description,
            imgUrl: req.body.imgUrl,
            housenumber: req.body.housenumber,
            street: req.body.street,
            city: req.body.city,
            postcode: req.body.postcode,
            country: req.body.country,
            lon: req.body.lon,
            lat: req.body.lat,
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

const getPlacesBySearch = async function (req, res) {
  try {
    const searchterm = req.params.searchterm;
    if (searchterm) {
      const places = await prisma.places.findMany({
        where: {
          title: { contains: searchterm },
        },
      });
      res.status(200);
      res.send(places);
    }
  } catch (error) {
    console.log('ERROR in controller/places.js at getPlacesBySearch', error);
    res.status(500);
    res.send('failed to find new place');
  }
};

module.exports = {
  postNewPlace,
  getAllPlaces,
  getPlacesByUser,
  getPlacesBySearch,
};
