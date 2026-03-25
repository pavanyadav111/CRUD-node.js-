const express = require('express')
const router = express.Router()
const MenuItem = require('./../models/MenuItem')

// POST
router.post('/', async (req, res) => {
  try {
    const data = req.body
    const newMenu = new MenuItem(data)

    const response = await newMenu.save()
    console.log('data saved')

    res.status(200).json(response)   // ✅ fixed

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET all
router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find()
    res.status(200).json(data)

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET by taste
router.get('/taste/:taste', async (req, res) => {
  try {
    const taste = req.params.taste

    const allowedTaste = ['sweet', 'salty', 'sour', 'spicy']

    if (allowedTaste.includes(taste)) {
      const response = await MenuItem.find({ taste: taste })
      res.status(200).json(response)
    } else {
      res.status(404).json({ error: 'Invalid taste type' })
    }

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})


// Update Menu 
router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id; // Consistent naming
        const updatedMenuData = req.body;

        // Pass the ID as the first argument, not the Model
        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true, // Return the updated document
            runValidators: true
        });

        if (!response) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        console.log('Data updated successfully');
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete Menu Item
router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuId);

        if (!response) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        console.log('Data deleted successfully');
        // Crucial: Send a success response back to the client
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router