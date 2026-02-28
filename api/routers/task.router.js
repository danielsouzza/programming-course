const express = require('express')
const taskController = require('../controllers/task.controller')
const router = express.Router();


router.get('/', taskController.index)
router.put('/:id', taskController.update)
router.post('/', taskController.store)
router.delete('/:id', taskController.destroy)

module.exports = router