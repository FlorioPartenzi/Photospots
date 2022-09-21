const express = require('express');
const morgan = require('morgan');
const router = require('./router');
const prisma = require('./model/index');

const PORT = 3001;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
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
