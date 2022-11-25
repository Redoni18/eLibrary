import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Signup from '@/components/auth/Signup'
import Signin from '@/components/auth/Signin'
import Users from '@/components/users/Users'
import Books from '../components/books/Books'
import ReservedBooks from '../components/books/ReservedBooks'
import ReservedListing from '../components/books/ReservedListing'
import FavouriteBooks from '../components/books/FavouriteBooks'
import FavouritesListing from '../components/books/FavouritesListing'
import CartBooks from '../components/cart/CartBooks'
import CartsListing from '../components/cart/CartsListing'
import BooksListing from '@/components/books/Listing'
import InsertBook from '@/components/books/InsertBook'
import BookDetails from '@/components/books/BookDetails'
import EditBook from '@/components/books/EditBook'
import ContactUs from '@/components/contact/ContactUs'
import MessagesListing from '@/components/contact/Listing'
import UserProfile from '@/components/user-profile/UserProfile'
import EditProfile from '@/components/user-profile/EditProfile'
import EditUser from '@/components/users/EditUser'
import NotFound from '@/components/NotFound'
import AddReview from '@/components/reviews/AddReview.vue'
import Reviews from '@/components/reviews/Reviews.vue'
import Review from '@/components/reviews/Review.vue'
import UserTypesListing from '@/components/userTypes/Listing'
import CreateUserType from '@/components/userTypes/CreateUserType'
import EditUserType from '@/components/userTypes/EditUserType'
import LocationsListing from '@/components/locations/Listing'
import AddLocation from '@/components/locations/AddLocation'
import EditLocation from '@/components/locations/EditLocation'
import Categories from '@/components/categories/Categories.vue'
import AddCategories from '@/components/categories/AddCategories.vue'
import Category from '@/components/categories/Category.vue'
import MembershipsListing from '@/components/memberships/Listing.vue'
import AddMembership from '@/components/memberships/AddMembership.vue'
import EditMembership from '@/components/memberships/EditMembership.vue'
import Memberships from '@/components/memberships/Memberships.vue'
import FacultiesListing from '@/components/faculties/Listing.vue'
import InsertFaculty from '@/components/faculties/CreateFaculty.vue'
import EditFaculty from '@/components/faculties/EditFaculty.vue'
import Request from '@/components/requests/Request'
import AddCountry from '@/components/countries/AddCountry.vue'
import CountriesListing from '@/components/countries/Listing'
import Upcomings from '@/components/books/Upcoming'
import RequestPage from '@/components/requests/RequestPage'

import AddEvent from '@/components/events/AddEvent'
import EventsListing from '@/components/events/Listing'
import EditEvent from '@/components/events/EditEvent'
import Events from '@/components/events/Events'

import CreateStaff from '@/components/staff/CreateStaff'
import StaffListing from '@/components/staff/Listing'
import EditStaff from '@/components/staff/EditStaff'
import AboutUs from '@/components/about/AboutUs'

Vue.use(Router);


import * as beforeEnter from './beforeEnter'


const router = new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup,
            beforeEnter: (to, from, next) => {
                beforeEnter.isAuthenticated(to, from, next)
            }
        },
        {
            path: '/signin',
            name: 'signin',
            component: Signin,
            beforeEnter: (to, from, next) => {
                beforeEnter.isAuthenticated(to, from, next)
            }
        },
        {
            path: '/users',
            name: 'users',
            component: Users,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/books',
            name: 'books',
            component: Books,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/favouriteBooks',
            name: 'favouriteBooks',
            component: FavouriteBooks,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/favouriteBooks/listing',
            name: 'favouriteListing',
            component: FavouritesListing,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/cartBooks',
            name: 'cartBooks',
            component: CartBooks,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/cartBooks/listing',
            name: 'cartListing',
            component: CartsListing,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/reservedBooks',
            name: 'reserved',
            component: ReservedBooks,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/reservedBooks/listing',
            name: 'reservedListing',
            component: ReservedListing,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/booksList/listing',
            name: 'booksList',
            component: BooksListing,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/books/create/:title?/:author?/:date?',
            name: 'createBooks',
            component: InsertBook,
            props: true,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/books/editBook/:id',
            name: 'editBook',
            component: EditBook,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/book/:id',
            name: 'bookDetails',
            component: BookDetails,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/books/upcomings',
            name: 'Upcomings',
            component: Upcomings,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/contact-us',
            name: 'contactUs',
            component: ContactUs,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/messages',
            name: 'messages',
            component: MessagesListing,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/editProfile/:id',
            name: 'editprofile',
            component: EditProfile,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/editUser/:id',
            name: 'editUser',
            component: EditUser,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/userProfile/:id',
            name: 'userprofile',
            component: UserProfile,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/review/add/:id/:book/:author',
            name: 'AddReview',
            component: AddReview,
            props: true,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/reviews/:id/:book/:author',
            name: 'Reviews',
            component: Reviews,
            props: true,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/review/:book/:bookId/:id',
            name: 'Review',
            component: Review,
            props: true,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/userTypes',
            name: 'UserTypes',
            component: UserTypesListing,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/insertUserType',
            name: 'InsertUserType',
            component: CreateUserType,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/userTypes/editUserType/:id',
            name: 'EditUserType',
            component: EditUserType,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/locations/listing',
            name: 'Locations',
            component: LocationsListing,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/locations/addLocation',
            name: 'AddLocation',
            component: AddLocation,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/locations/editLocation/:id',
            name: 'editLocation',
            component: EditLocation,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '*',
            name: 'notfound',
            component: NotFound
        },
        {
            path: '/categories',
            name: 'Categories',
            component: Categories,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/categories/add',
            name: 'AddCategories',
            component: AddCategories,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/category/:id',
            name: 'Category',
            component: Category,
            props: true,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/memberships',
            name: 'MembershipsListing',
            component: MembershipsListing,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/allMemberships',
            name: 'Memberships',
            component: Memberships,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/addMembership',
            name: 'AddMembership',
            component: AddMembership,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/memberships/editMembership/:id',
            name: 'EditMembership',
            component: EditMembership,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {

            path: '/faculties',
            name: 'Faculties',
            component: FacultiesListing,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/insertFaculty',
            name: 'InsertFaculty',
            component: InsertFaculty,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/countries/addCountry',
            name: 'AddCountry',
            component: AddCountry,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/countries/listing',
            name: 'Countries',
            component: CountriesListing,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {

            path: '/faculties/editFaculty/:id',
            name: 'EditFaculty',
            component: EditFaculty,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/requests',
            name: 'Request',
            component: Request,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/request',
            name: 'RequestPage',
            component: RequestPage,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/events/addEvent',
            name: 'AddEvent',
            component: AddEvent,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/events/listing',
            name: 'EventsListing',
            component: EventsListing,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/events/editEvent/:id',
            name: 'EditEvent',
            component: EditEvent,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/events',
            name: 'Events',
            component: Events,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/staff',
            name: 'StaffListing',
            component: StaffListing,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/insertStaff',
            name: 'InsertStaff',
            component: CreateStaff,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/staff/editStaff/:id',
            name: 'EditStaff',
            component: EditStaff,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/about-us',
            name: 'AboutUs',
            component: AboutUs,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },

    ]
})

export default router