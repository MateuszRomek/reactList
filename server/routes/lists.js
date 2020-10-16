const express = require('express');
const router = express.Router();
const listsController = require('../controllers/lists');
const isAuth = require('../middleware/isAuth');
const setCurrentList = require('../middleware/setCurrentList');
router.get('/lists', isAuth, listsController.getAllLists);
router.post('/lists', isAuth, listsController.createList);
router.put('/lists', isAuth, setCurrentList, listsController.updateList);
router.delete('/lists', isAuth, listsController.deleteList);

module.exports = router;
