const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const itemRoutes = require('./routes/items');

app.use(express.json());
app.use('/items', itemRoutes);



app.use((req, res, next) => {
   return new ExpressError("Not found", 404);
})

app.use((error, req, res, next) => {
   const status = error.status || 500;
   return res.json({
      error: {
         response: error.message,
         status: status
      }
   })
})

module.exports = app;