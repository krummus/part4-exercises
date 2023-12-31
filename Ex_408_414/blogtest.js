const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('./app')
const api = require(app)
const Blog = require('../models/blog')

const listHelper = require('./utils/list_helper')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const listWithThreeBlogs = [
    {
        _id: '1',
        title: 'Bleh Blah 1',
        author: 'Edsandwich',
        url: 'http://www.bleh.blah/',
        likes: 5,
        __v: 0
    },
    {
        _id: '2',
        title: 'Howdy Hoe Neighbourino',
        author: 'Ned Flanders',
        url: 'http://www.nedflandersacademy.com/howdy_hoe_neighbourino_blog.html',
        likes: 2,
        __v: 0
    },        {
        _id: '3',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
})

describe('upload entries and test for length and content', async () => {

    test('empty blog list / array length is 0', () => {
        const result = Blog.find({})
        expect(result.length).toBe(0)
    })

    let blogObject = new Blog(listWithOneBlog[0])
    await blogObject.save()

    test('empty blog list / array length is 1', () => {
        const result = Blog.find({})
        expect(result.length).toBe(1)
    })

    /*test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('for a longer list', () => {
        const result = listHelper.totalLikes(listWithThreeBlogs)
        expect(result).toBe(17)
    }) */
})
