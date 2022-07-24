const Project = require('../models/project');

module.exports = {
    index,
    myIndex,
    new: newProject,
    create,
}

function index(req, res) {
    Project.find({})
            .sort([['startDate', -1]])
            .populate('creator')
            .exec(function(err, projects) {
                res.render('projects/live-feed', { title: 'Live Feed', projects });
            });
};

function myIndex(req, res) {
    Project.find({ creator: req.user._id }, function(err, projects) {
        res.render('projects/my-projects', { title: 'My Projects', projects });
    });
}

function newProject(req, res) {
    const defaultProject = new Project();
    const startDt = defaultProject.startDate;
    let defaultStartDate = `${startDt.getFullYear()}-${(startDt.getMonth() + 1).toString().padStart(2, '0')}`;
    defaultStartDate += `-${startDt.getDate().toString().padStart(2, '0')}T${startDt.toTimeString().slice(0, 5)}`;
    res.render('projects/new-project', { defaultStartDate, title: 'New Project'});
}

function create(req, res) {
    req.body.complete = !!req.body.complete;
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const project = new Project(req.body);
    project.creator = res.locals.user;
    project.save(function(err) {
        if (err) return res.redirect('/projects/my/new');
        res.redirect('/projects/my');
    })
}