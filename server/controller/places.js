const prisma = require('../model/index');

const postNewPlace = async function (req, res) {
  try {
    const user = await prisma.users.update({
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
    res.send('place');
  } catch (error) {
    console.log('ERROR in controller/places.js at postNewPlace', error);
    res.status(500);
    res.send('failed to create new place');
  }
};

module.exports = { postNewPlace };
