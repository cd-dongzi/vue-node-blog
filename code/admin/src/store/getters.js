const getters = {
    sources: state => state.app.sources,

    userName: state => state.user.name,
    userList: state =>state.user.list,
    userTotal: state =>state.user.total,

    blogTypes: state => state.blog.blogTypes,
    blogList: state => state.blog.list,
    blogTotal: state => state.blog.total
}
export default getters