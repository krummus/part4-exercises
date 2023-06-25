const _ = require ('lodash')

const dummy = (blogs) => {
    if (blogs) {
        return Number(1)
    }
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes,0)
}

const maxLikes = (reigningBlog, currBlog) => {
    return reigningBlog.likes >= currBlog.likes ? reigningBlog : currBlog
}

const favouriteBlog = (blogs) => {
    var topBlog = blogs.reduce((reigningBlog, currBlog) => {
        return maxLikes(reigningBlog, currBlog)
    },[])
    return { 'author': topBlog.author, 'likes': topBlog.likes }
}

const mostBlogs = (blogs) => {
    const tagArray = _.chain(_.map(blogs,'author')).countBy().toPairs().value()
    const adjustedTagArray = _.maxBy(tagArray,_.last)
    if (adjustedTagArray) {
        return { author: adjustedTagArray[0], blogs: adjustedTagArray[1] }
    }else{
        return { author: undefined, blogs: undefined }
    }
}

const mostLikes = (blogs) => {
    const arrayAuthorLikes = _.map(blogs, blog => _.pick(blog, 'author', 'likes'))
    const arrayGroupBy = _.chain(arrayAuthorLikes).groupBy('author').map(function(items,author) {
        return {
            author: author,
            likes: _.sum(_.map(items,'likes'))
        }}).value()

    const adjustedTagArray = _.maxBy(arrayGroupBy,'likes')
    return adjustedTagArray
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}