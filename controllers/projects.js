const Project = require('../models/project');

module.exports = {
    index,
    myIndex,
    new: newProject,
    create,
    show,
    delete: deleteProject,
    update,
    edit,
}

function index(req, res) {
    Project.find({})
            .sort('-startDate')
            .populate('creator')
            .exec(function(err, projects) {
                res.render('projects/live-feed', { title: 'Live Feed', projects });
            });
};

function myIndex(req, res) {
    Project.find({ creator: req.user._id })
            // .sort([['complete']])
            .exec(function(err, projects) {
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

function show(req, res) {
Project.findById(req.params.id)
        .populate('creator')
        .exec(function(err, project) {
            res.render('projects/show', { title: project.title, project })
        });
};

function deleteProject(req, res) {
    Project.findOneAndDelete({_id: req.params.id, creator: req.user._id})
        .populate('creator')
        .exec(function(err) {
            res.redirect('/projects/my');
        }
    )
};

function update(req, res) {
    Project.findOneAndUpdate({_id: req.params.id, creator: req.user},
        // update object with updated properties
        req.body,
        // options object with new: true to make sure updated doc is returned
        {new: true})
        .populate('creator')
        .exec(function(err, project) {
            if (err || !project) return res.redirect('/projects');
            res.redirect(`/projects/${project._id}`);
        }
    )
}

function edit(req, res) {
    Project.findById(req.params.id)
        .populate('creator')
        .exec(function(err, project) {
            const dt = project.startDate;
            // Format the date for the value attribute of the input
            let startDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
            startDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
            if (err) return res.redirect('/projects/edit');
            res.render('projects/update', {title: 'Update Project', project, startDate})
    })
}