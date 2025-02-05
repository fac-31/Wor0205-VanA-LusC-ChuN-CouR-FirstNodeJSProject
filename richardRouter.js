const richardRouter = require('express').Router();

let counter = 1;

// Richards Page
richardRouter.get('/', (req, res) => {
  res.status(200).json({ counter: counter });
});

richardRouter.post('/', (req, res) => {
  counter += 1;
  res.status(201).json({ counter: counter });
});

module.exports = richardRouter;
