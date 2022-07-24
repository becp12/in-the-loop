

module.exports = {
    index,
    myIndex,
}

function index(req, res) {
    res.render('projects/live-feed', { title: 'Live Feed'})
}

function myIndex(req, res) {
    res.render('projects/my-projects', { title: 'My Projects'})
}