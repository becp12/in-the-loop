

module.exports = {
    index,
}

function index(req, res) {
    res.render('projects/live-feed', { title: 'Live Feed'})
}