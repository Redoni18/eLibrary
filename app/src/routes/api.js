const express = require('express');
const router = express.Router();
const auth = require("../helper/auth");
const multer = require('multer')


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../../../uploads");
    },
    filename: (req, file, cb) => {
      console.log(file.originalname);
      cb(null, file.originalname);
    },
  });
  
  let uploadFile = multer({
    storage: storage,
  })


/**
 * Controllers
 */
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');


/**
 * Routes
 */
router.post('/api/signup', authController.post_signup);
router.post('/api/signin', authController.post_signin);
router.get('/api/user/auth', auth.verify, authController.get_auth);

router.get('/api/books', bookController.get_books);
router.get('/api/books/:id', bookController.get_book);
router.post('/api/createBooks', uploadFile.single('bookImage'), bookController.post_book);
router.put('/api/editBook/:id', bookController.edit_book);
router.delete('/api/books/delete/:id', bookController.delete_book);


router.get('/api/users', userController.get_users);
router.get('/api/unique/:email', userController.get_unique);


module.exports = router;