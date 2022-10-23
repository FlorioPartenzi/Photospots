const prisma = require('../model/index');
const { addPins, sortByDistance } = require('./utils/placesUtils');

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
    const email = req.email;
    const lat = req.params.lat;
    const lng = req.params.lng;
    const places = await prisma.users.findMany({
      where: { email: email },
      select: {
        pinned: {
          select: { id: true },
        },
      },
    });
    const all = await prisma.places.findMany({
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
    });
    const newlyPinned = await addPins(all, email);
    const withPinned = sortByDistance(newlyPinned, lat, lng);
    res.status(200);
    res.send(withPinned);
  } catch (error) {
    console.log('ERROR in controller/places.js at getAllPlaces', error);
    res.status(500);
    res.send('failed to create new place');
  }
};

const getPlacesByUser = async function (req, res) {
  try {
    const places = await prisma.users.findUnique({
      where: { email: req.email },
      select: {
        places: {
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

    if (places) {
      const withPinns = await addPins(places.places, req.email);
      res.status(200);
      res.send(withPinns);
    } else {
      res.status(200);
      res.send({ msg: 'no places jet' });
    }
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
          title: { contains: searchterm, mode: 'insensitive' },
        },
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
      });
      const palcesWithPinned = await addPins(places, req.email);
      const placesSliced = palcesWithPinned.slice(0, 8);
      res.status(200);
      res.send(placesSliced);
    }
  } catch (error) {
    console.log('ERROR in controller/places.js at getPlacesBySearch', error);
    res.status(500);
    res.send('failed to find place');
  }
};

const getPlacesByDistance = async function (req, res) {
  try {
    const lat = req.params.lat;
    const lng = req.params.lng;
    if (lat && lng) {
      let places = await prisma.places.findMany({});
      places = addPins(places, req.email);
      places = places
        .sort((a, b) => {
          const distanceA = Math.abs(lng - a.lon) + Math.abs(lat - a.lat);
          const distanceB = Math.abs(lng - b.lon) + Math.abs(lat - b.lat);
          return distanceA - distanceB;
        })
        .slice(0, 8);
      res.status(200);
      res.send(places);
    }
  } catch (error) {
    console.log('ERROR in controller/places.js at getPlacesByDistance', error);
    res.status(500);
    res.send({ msg: 'failed to find places' });
  }
};

module.exports = {
  postNewPlace,
  getAllPlaces,
  getPlacesByUser,
  getPlacesBySearch,
  getPlacesByDistance,
};
