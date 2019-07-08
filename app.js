const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const errorHandler = require('./middlewares/error-handler');

(async () => {
  app.use(bodyParser.json());

//   const morgan = require('morgan');
//   app.use(morgan('common'));

  let port = process.env.PORT || 3000;

  const cors = require('cors');
  app.use(cors());

//   const winston = require('winston');
//   const debugLogger = winston.createLogger({
//     level: 'debug',
//     transports: [
//       //
//       // - Write to all logs with level `info` and below to `combined.log`
//       // - Write all logs error (and below) to `error.log`.
//       //
//       new winston.transports.Console({
//         format: winston.format.simple()
//       })
//     ]
//   });

  // require config files
  const dbconfig = require('./config/db-config');

  // Setting up the DB connection
  const mongoose = require('mongoose');
  mongoose.connection.on('connected', eventDetails => {
    // debugLogger.debug('Connected to DB.');
    // if (eventDetails) {
    //   debugLogger.debug('Event details:');
    //   debugLogger.debug(eventDetails);
    // }
    
    app.listen(port);
    console.log(`bill maker server is running on ${port}, connected to DB`);
  });
//   mongoose.connection.on('reconnected', eventDetails => {
//     debugLogger.debug('Attention: reconnected to DB. Event details:');
//     debugLogger.debug(eventDetails);
//   });
//   mongoose.connection.on('timeout', eventDetails => {
//     debugLogger.debug('Attention: timeout of connection to DB. Event details:');
//     debugLogger.debug(eventDetails);
//   });
//   mongoose.connection.on('disconnected', () => {
//     debugLogger.debug('Attention: disconnected form the DB.');
//   });

  let dbUrl = dbconfig.databaseUrl;
  mongoose.connect(`${dbUrl}/bill-maker`);

//   app.use('/users', require('./controllers/users-api'));

  // app.use(methodOverride());
})();
