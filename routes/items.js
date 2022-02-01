const express = require('express');
const router = new express.Router();
const items = require('../fakeDb');
const ExpressError = require('../expressError');

router.get('/', (req, res) => {
   try {
      if(!items) {
         throw new ExpressError("No items found", 404)
      }
      return res.json(items);
   } catch(e) {
      next(e);
   }
})

router.get('/:name', (req, res, next) => {
   try {
      const foundItem = items.find(item => item.name === req.params.name)
      if(foundItem === undefined) {
         throw new ExpressError("Item not found", 404);
   }
   return res.json(foundItem);
   } catch(e) {
      next(e);
   }
})

router.post('/', (req, res, next) => {
   try {
      const newItem = req.body;
      if(!req.body) {
         throw new ExpressError("Information required", 400);
      }
      items.push(newItem);
      return res.status(201).json({
      added: {
         name: newItem.name,
         price: newItem.price
      }
   })
   } catch(e) {
      next(e);
   } 
})

router.patch('/:name', (req, res, next) => {
   try {
      const foundItem = items.find(item => item.name === req.params.name)
      if(foundItem === undefined) {
         throw new ExpressError("Item not found", 404);
      }
      if(!req.body.name) {
         throw new ExpressError("Name is required", 400);
      }
      foundItem.name = req.body.name;
      return res.json({ updated: foundItem });
   } catch(e) {
      next(e);
   } 
})

router.delete('/:name', (req, res, next) => {
   try {
      const foundItem = items.find(item => item.name === req.params.name)
      if(foundItem === undefined) {
         throw new ExpressError("Item not found", 404);
   }
      items.splice(foundItem, 1);
      res.json({ message: "Deleted" });
   } catch(e) {
      next(e);
   }
   
})

module.exports = router;