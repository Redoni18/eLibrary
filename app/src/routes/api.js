
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
const messageController = require('../controllers/messagesController');
const reviewsController = require('../controllers/reviewsController');
const userTypeController = require('../controllers/userTypeController');
const locationController = require('../controllers/locationController')
const categoriesController = require('../controllers/categoriesController');
const membershipController = require('../controllers/membershipController');
const staffController = require('../controllers/staffController');

/**
 * Routes
 */
router.post('/api/signup', authController.post_signup);
router.post('/api/signin', authController.post_signin);
router.post('/api/editProfile/:id', authController.edit_profile);
router.get('/api/userProfile/:id', authController.get_profile);
router.get('/api/user/auth', auth.verify, authController.get_auth);

router.get('/api/books', bookController.get_books);
router.get('/api/books/:id', bookController.get_book);
router.post('/api/createBooks', uploadFile.single('bookImage'), bookController.post_book);
router.put('/api/editBook/:id', bookController.edit_book);
router.delete('/api/books/delete/:id', bookController.delete_book);


router.get('/api/messages', messageController.get_messages)
router.post('/api/postMessage', messageController.post_messages)
router.get('/api/messages/:id', messageController.get_message)
router.delete('/api/messages/delete/:id', messageController.delete_message);


router.get('/api/userTypes', userTypeController.get_userTypes)
router.post('/api/createUserType', userTypeController.post_userType)
router.put('/api/editUserType/:id', userTypeController.edit_userType)
router.delete('/api/deleteUserType/:id', userTypeController.delete_userType)
router.get('/api/userType/:id', userTypeController.get_userType)



router.get('/api/users', userController.get_users);
router.get('/api/unique/:email', userController.get_unique);


router.post('/api/addReview', reviewsController.add_review);
router.get('/api/reviews/:id', reviewsController.reviews);
router.put('/api/editReview/:id', reviewsController.edit_review);
router.delete('/api/review/delete/:id', reviewsController.delete_review);
router.get('/api/review/:id', reviewsController.get_review)

router.get('/api/locations', locationController.get_locations)
router.post('/api/addLocation', locationController.post_location)
router.put('/api/editLocation/:id', locationController.edit_location)
router.delete('/api/deleteLocation/:id', locationController.delete_location)
router.get('/api/location/:id', locationController.get_location)

router.post('/api/category/add', categoriesController.add_categories);
router.get('/api/categories', categoriesController.get_categories);
router.get('/api/category/:id', categoriesController.get_category);
router.put('/api/category/edit/:id', categoriesController.edit_category);
router.delete('/api/category/delete/:id', categoriesController.delete_category);

router.get('/api/memberships', membershipController.get_memberships);
router.post('/api/addMembership', membershipController.post_membership);
router.put('/api/editMembership/:id', membershipController.edit_membership);
router.delete('/api/deleteMembership/:id', membershipController.delete_membership);
router.get('/api/membership/:id', membershipController.get_membership);

router.get('/api/staff', staffController.get_staffs);
router.post('/api/createStaff', staffController.post_staff);
router.get('/api/staff/:id', staffController.get_staff);
router.put('/api/editStaff/:id', staffController.edit_staff);
router.delete('/api/staff/delete/:id', staffController.delete_staff);

module.exports = router;