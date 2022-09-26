const morgan = require('morgan');
const Express = require('express');
const cors = require('cors');
const router = require('./router');
const prisma = require('./model/index');
const { checkAuth } = require('./middleweare/auth');

const PORT = process.env.PORT;

const app = Express();
app.use(cors());
app.use(morgan('dev'));
app.use(Express.json());
app.use('/', checkAuth);
app.use(router);

(async function Bootstrap() {
  try {
    await prisma.$connect();
    console.log('connected to Database');
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
