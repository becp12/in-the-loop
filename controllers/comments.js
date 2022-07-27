const Project = require('../models/project');

module.exports = {
    create,
    delete: deleteComment,
}

function create(req, res) {
    Project.findById(req.params.id, function(err, project) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        project.comments.push(req.body);
        project.save(function(err) {
            res.redirect(`/projects/${project._id}`);
        });
    });
};

function deleteComment(req, res) {
    Project.findOne(
        {'comments._id': req.params.id, 'comments.user': req.user._id},
        function(err, project) {
            project.comments.remove(req.params.id);
            project.save(function(err) {
                res.redirect(`/projects/${project._id}`);
            });
        }
    );
}