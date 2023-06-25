const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Bleh Blah 1',
        author: 'Edsandwich',
        url: 'http://www.bleh.blah/',
        likes: 5
    },
    {
        title: 'Howdy Hoe Neighbourino',
        author: 'Ned Flanders',
        url: 'http://www.nedflandersacademy.com/howdy_hoe_neighbourino_blog.html',
        likes: 2
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
    }
]

beforeEach(async () => {
    let blogObject = new Blog(initialBlogs[0])
    await Blog.deleteMany({})
    for (let currBlog in initialBlogs) {
        blogObject = new Blog(initialBlogs[currBlog])
        await blogObject.save()
    }
})

describe('tests for initial testing', () => {
    test('returns are in json', async () => {
        await api
            .get('/api/blogs')
            .expect('Content-Type', /application\/json/)
    })

    test('Blogs returned have the same length ', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('Existance of ID property', async () => {
        const response = await api.get('/api/blogs')
        const serverBlogs = response.body
        expect(serverBlogs[0].id).toBeDefined()
    })

    test('Addition of Blog Makes New', async () => {
        const newBlog = {
            title: 'Joe Rogan',
            author: 'Wikipedia contributors',
            url: 'https://en.wikipedia.org/wiki/Joe_Rogan',
            likes: 8,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsFromServer = await Blog.find({})

        expect(blogsFromServer).toHaveLength(initialBlogs.length + 1)
    })
})

describe('unique tests for blog environments', () => {
    test('Undefined likes returning 0', async () => {
        const newBlogWithoutLikes = {
            title: 'Charting the COVID-19 spread in Australia',
            author: 'Inga Ting, Nathanael Scott, Michael Workman and Stephen Hutcheon',
            url: 'https://www.abc.net.au/news/2020-03-17/coronavirus-cases-data-reveals-how-covid-19-spreads-in-australia/12060704',
        }

        await api
            .post('/api/blogs')
            .send(newBlogWithoutLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsFromServer = await Blog.find({})

        expect(blogsFromServer.find(bl => bl.title === 'Charting the COVID-19 spread in Australia').likes).toBe(0)
    })

    test('Blogs with no title or URL return a bad requrest', async () => {
        const newBlogWithoutDetails = {
            author: 'Michael Janda',
            likes: 3
        }

        await api
            .post('/api/blogs')
            .send(newBlogWithoutDetails)
            .expect('Content-Type', /application\/json/)
            .expect(400)
            .catch((err) => {console.log(err)})
    })
})

describe('Testing Removal of Content - Delete', () => {
    test('Returns correct code for id that doesnt exist', async () => {

        const madeUpID = '61ffeca8daefe2fa82b9b111'

        await api
            .get(`/api/blogs/${madeUpID}`)
            .expect(404)
            .expect('Content-Type', /application\/json/)
    })

    test('invalid ID for fetching', async () => {

        const invalidID = '61ffeca8daefe2fa82b9b'

        await api
            .get(`/api/blogs/${invalidID}`)
            .expect(404)
            .expect('Content-Type', /application\/json/)
    })

    test('succeeds if status code 204 is returned', async () => {

        const newBlog = {
            title: 'Joe Rogan',
            author: 'Wikipedia contributors',
            url: 'https://en.wikipedia.org/wiki/Joe_Rogan',
            likes: 8,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsFromServer = await Blog.find({})
        const blogsAtEnd = blogsFromServer.map(blog => blog.toJSON())
        const idToDelete = blogsAtEnd.find(bl => bl.title === 'Joe Rogan').id
        const afterPostLength = blogsAtEnd.length

        await api
            .delete(`/api/blogs/${idToDelete}`)
            .expect(204)

        const blogsFromServerAfterDelete = await Blog.find({})

        expect(blogsFromServerAfterDelete.length).toBe(afterPostLength-1)
    })
})

describe('Testing Update of Content', () => {

    test('succeeds if status code 204 is returned', async () => {

        const existingBlogs = await Blog.find({})
        const idToUpdate = existingBlogs[0].id
        const updatedBlog = {
            title: existingBlogs[0].title,
            author: existingBlogs[0].author,
            url: existingBlogs[0].url,
            likes: 10
        }

        await api
            .put(`/api/blogs/${idToUpdate}`)
            .send(updatedBlog)
            .expect(204)

        const blogsFromServer = await Blog.find({})
        expect(blogsFromServer[0].likes).toBe(10)
    })
})

afterAll(() => {
    mongoose.connection.close()
})