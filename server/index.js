const morgan = require('morgan');
const Express = require('express');
const cors = require('cors');
const router = require('./router');
const prisma = require('./model/index');
const { checkAuth } = require('./middleweare/auth');

const PORT = process.env.PORT;

const app = Express();

// -> cors -> morgan (logging the requests) -> parsing the request -> checking Auth -> routing
app.use(cors());
app.use(morgan('dev'));
app.use(Express.json());
app.use('/', Express.static('build'));
app.use('/home', Express.static('build'));
app.use('/profile', Express.static('build'));
app.use('/api', checkAuth);
app.use(router);

// Bootstrap function handeling the connection to the DB and the staring of the server
(async function Bootstrap() {
  try {
    await prisma.$connect();
    console.log('connected to Database');
    app.listen(PORT, () => {
      console.log(`server running`);
    });
  } catch (error) {
    console.log('ERROR on Sart: ', error);
  }
})();
