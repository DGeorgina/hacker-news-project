import { createRouter, createWebHistory } from 'vue-router'
import PostDetails from '../views/posts/PostDetails'
import PostComments from '../views/posts/PostComments'
import Posts from '../views/posts/Posts'
import Home from '../views/Home'
import NotFound from '../views/NotFound'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/posts',
        name: 'posts',
        component: Posts
    },
    {
        path: '/posts/:id',
        name: 'postDetails',
        component: PostDetails,
        props: true
    },
    {
        path: '/postComments/:id',
        name: 'postComments',
        component: PostComments,
        props: true
    },
    {
        path: '/:catchAll(.*)',
        name: 'notFound',
        component: NotFound
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router