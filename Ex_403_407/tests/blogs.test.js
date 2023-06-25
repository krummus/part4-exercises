const listHelper = require('../utils/list_helper')

const emptyBlogList = []

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
        author: 'Ed Sandwich',
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
    },
    {
        _id: '3',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
    }
]

const listWithFourBlogs = [
    {
        _id: '1',
        title: 'Bleh Blah 1',
        author: 'Ed Sandwich',
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
    },
    {
        _id: '3',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
    },
    {
        _id: '4',
        title: 'Array Methods',
        author: 'Edsger W. Dijkstra',
        url: 'https://lodash.com/docs/4.17.15',
        likes: 20,
        __v: 0
    },
]

const listWithFiveBlogs = [
    {
        _id: '1',
        title: 'Bleh Blah 1',
        author: 'Ed Sandwich',
        url: 'http://www.bleh.blah/',
        likes: 5,
        __v: 0
    },
    {
        _id: '2',
        title: 'Howdy Hoe Neighbourino',
        author: 'Ned Flanders',
        url: 'http://www.nedflandersacademy.com/howdy_hoe_neighbourino_blog.html',
        likes: 16,
        __v: 0
    },
    {
        _id: '3',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
    },
    {
        _id: '4',
        title: 'Array Methods',
        author: 'Edsger W. Dijkstra',
        url: 'https://lodash.com/docs/4.17.15',
        likes: 20,
        __v: 0
    },
    {
        _id: '5',
        title: 'Neddyroony quotes',
        author: 'Ned Flanders',
        url: 'https://nedflandersgang/doc/fakeaddress',
        likes: 15,
        __v: 0
    },
]

describe('dummy blogs', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)

        const result2 = listHelper.dummy(listWithOneBlog)
        expect(result2).toBe(1)
    })
})

describe('total likes', () => {

    test('empty blog list / array length is 0', () => {
        const result = listHelper.totalLikes(emptyBlogList)
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('for a longer list', () => {
        const result = listHelper.totalLikes(listWithThreeBlogs)
        expect(result).toBe(17)
    })
})

describe('favourite blog', () => {

    test('empty blog list / array length is 0', () => {
        const result = listHelper.favouriteBlog(emptyBlogList)
        expect(result).toEqual({ 'author': undefined, 'likes': undefined })
    })

    test('when list has only one blog, the only blog is the favorite', () => {
        const result = listHelper.favouriteBlog(listWithOneBlog)
        expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 5 })
    })

    test('for a bigger blog list', () => {
        const result = listHelper.favouriteBlog(listWithThreeBlogs)
        expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 10 })
    })
})

describe('most blogs', () => {

    test('empty blog list / array length is 0', () => {
        const result = listHelper.mostBlogs(emptyBlogList)
        expect(result).toEqual({ 'author': undefined, 'blogs': undefined })
    })

    test('when list has only one blog, the only the author and blog numbers 1 is returned', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'blogs': 1 })
    })

    test('multiple blogs returns only the 1st author and 1 blog', () => {
        const result = listHelper.mostBlogs(listWithThreeBlogs)
        expect(result).toEqual({ 'author': 'Ed Sandwich', 'blogs': 1 })
    })

    test('blog list with 2 entries for 1 author', () => {
        const result = listHelper.mostBlogs(listWithFourBlogs)
        expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'blogs': 2 })
    })
})

describe('most likes on blogs', () => {

    test('empty blog list / array length is 0', () => {
        const result = listHelper.mostLikes(emptyBlogList)
        expect(result).toEqual(undefined)
    })

    test('when list has only one blog, the only the author and blog numbers 1 is returned', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 5 })
    })

    test('multiple blogs returns only the 1st author and 1 blog', () => {
        const result = listHelper.mostLikes(listWithThreeBlogs)
        expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 10 })
    })

    test('blog list with 4 entries for 3 author, 1 author with 2 entries', () => {
        const result = listHelper.mostLikes(listWithFourBlogs)
        expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 30 })
    })

    test('blog list with 5 entries for 3 authors, 2 authors with 2 entries', () => {
        const result = listHelper.mostLikes(listWithFiveBlogs)
        expect(result).toEqual({ 'author': 'Ned Flanders', 'likes': 31 })
    })
})