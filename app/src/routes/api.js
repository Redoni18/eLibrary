
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
const membershipController = require('../controllers/membershipController')
const facultyController = require('../controllers/facultyController')
const countryController = require('../controllers/countryController')
const requestsController = require('../controllers/requestsController');
const upcomingController = require('../controllers/upcomingController');
const staffController = require('../controllers/staffController');
const { request } = require('express');


/**
 * Routes
 */
router.post('/api/signup', authController.validate('post_signup'),authController.post_signup);
router.post('/api/signin', authController.post_signin);
router.put('/api/editProfile/:id', authController.validate('edit_profile'),authController.edit_profile);
router.put('/api/editUser/:id', authController.validate('edit_user'),authController.edit_user);
router.delete('/api/users/deleteUser/:id', authController.delete_user);
router.get('/api/userProfile/:id', authController.get_profile);
router.get('/api/userMembership/:id', authController.get_membership);
router.post('/api/user/borrow/:id', authController.borrow_books);
router.get('/api/user/getBorrowed/:id', authController.get_borrowed_books);
router.get('/api/user/auth', auth.verify, authController.get_auth);


router.get('/api/books', bookController.get_books);
router.get('/api/books/:id', bookController.get_book);
router.post('/api/createBooks', bookController.validate('post_book'), uploadFile.single('bookImage'), bookController.post_book);
router.put('/api/editBook/:id', bookController.validate('edit_book'), bookController.edit_book);
router.delete('/api/books/delete/:id', bookController.delete_book);


router.get('/api/messages', messageController.get_messages)
router.post('/api/postMessage', messageController.validate('post_messages'),messageController.post_messages)
router.get('/api/messages/:id', messageController.get_message)
router.delete('/api/messages/delete/:id', messageController.delete_message);


router.get('/api/userTypes', userTypeController.get_userTypes)
router.post('/api/createUserType', userTypeController.post_userType)
router.put('/api/editUserType/:id', userTypeController.edit_userType)
router.delete('/api/deleteUserType/:id', userTypeController.delete_userType)
router.get('/api/userType/:id', userTypeController.get_userType)



router.get('/api/users', userController.get_users);
router.get('/api/unique/:email', userController.get_unique);


router.post('/api/addReview', reviewsController.validate('post_review'), reviewsController.add_review);
router.get('/api/reviews/:id', reviewsController.reviews);
router.put('/api/editReview/:id', reviewsController.validate('edit_review'), reviewsController.edit_review);
router.delete('/api/review/delete/:id', reviewsController.delete_review);
router.get('/api/review/:id', reviewsController.get_review)

router.get('/api/locations', locationController.get_locations)
router.post('/api/addLocation', locationController.post_location)
router.put('/api/editLocation/:id', locationController.edit_location)
router.delete('/api/deleteLocation/:id', locationController.delete_location)
router.get('/api/location/:id', locationController.get_location)

router.post('/api/category/add', categoriesController.validate('add_categories'),categoriesController.add_categories);
router.get('/api/categories', categoriesController.get_categories);
router.get('/api/category/:id', categoriesController.get_category);
router.put('/api/category/edit/:id',categoriesController.validate('edit_categories') ,categoriesController.edit_category);
router.delete('/api/category/delete/:id', categoriesController.delete_category);

router.get('/api/memberships', membershipController.get_memberships);
router.post('/api/addMembership', membershipController.post_membership);
router.put('/api/editMembership/:id', membershipController.edit_membership);
router.delete('/api/deleteMembership/:id', membershipController.delete_membership);
router.get('/api/membership/:id', membershipController.get_membership);
router.put('/api/updateMembership/:id', authController.update_membership)


router.get('/api/faculties', facultyController.get_faculties);
router.post('/api/createFaculty', facultyController.post_faculty);
router.put('/api/editFaculty/:id', facultyController.edit_faculty);
router.delete('/api/deleteFaculty/:id', facultyController.delete_faculty);
router.get('/api/faculty/:id', facultyController.get_faculty);


router.get('/api/countries', countryController.get_countries);
router.post('/api/addCountry', countryController.post_country);
router.delete('/api/deleteCountry/:id', countryController.delete_country);
router.get('/api/country/:id', countryController.get_country);

router.post('/api/request/add', requestsController.validate('add_request'), requestsController.add_request);
router.get('/api/requests/:id', requestsController.get_request);
router.get('/api/requests', requestsController.get_requests);
router.delete('/api/requests/delete/:id', requestsController.delete_request);
router.put('/api/requests/edit', requestsController.validate('edit_request'), requestsController.edit_request);

router.post('/api/upcoming/add' ,upcomingController.validate('add_upcoming'), upcomingController.add_upcoming);
router.get('/api/get/upcoming/:id', upcomingController.get_upcoming);
router.get('/api/upcomings', upcomingController.get_upcomings);
router.delete('/api/upcoming/delete/:id', upcomingController.delete_upcoming);
router.put('/api/upcoming/edit', upcomingController.validate('edit_upcoming') ,upcomingController.edit_upcoming);

router.get('/api/staff', staffController.get_staffs);
router.post('/api/createStaff', staffController.post_staff);
router.get('/api/staff/:id', staffController.get_staff);
router.put('/api/editStaff/:id', staffController.edit_staff);
router.delete('/api/staff/delete/:id', staffController.delete_staff);

module.exports = router;
