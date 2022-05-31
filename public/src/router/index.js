import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Signup from '@/components/auth/Signup'
import Signin from '@/components/auth/Signin'
import Users from '@/components/users/Users'
import Books from '../components/books/Books'
import BooksListing from '@/components/books/Listing'
import InsertBook from '@/components/books/InsertBook'
import BookDetails from '@/components/books/BookDetails'
import EditBook from '@/components/books/EditBook'
import ContactUs from '@/components/contact/ContactUs'
import MessagesListing from '@/components/contact/Listing'
import UserProfile from '@/components/user-profile/UserProfile'
import EditProfile from '@/components/user-profile/EditProfile'
import NotFound from '@/components/NotFound'

Vue.use(Router);


import * as beforeEnter from './beforeEnter'


const router = new Router({
    routes: [
        {
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
            path: '/books/listing',
            name: 'booksList',
            component: BooksListing,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '/books/create',
            name: 'createBooks',
            component: InsertBook,
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
            path: '/userProfile/:id',
            name: 'userprofile',
            component: UserProfile,
            beforeEnter: (to, from, next) => {
                beforeEnter.authenticate(to, from, next)
            }
        },
        {
            path: '*',
            name: 'notfound',
            component: NotFound
        }
    ]
})



export default router