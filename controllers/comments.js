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
        project.comment.push(req.body);
        project.save(function(err) {
            res.redirect(`/projects/${project._id}`);
        });
    });
};

function deleteComment(req, res) {
    Project.findOne(
        {'comment._id': req.params.id, 'comment.user': req.user._id},
        function(err, project) {
            // if (!project || err) return res.redirect(`/projects/${project._id}`);
            project.comment.remove(req.params.id);
            project.save(function(err) {
                res.redirect(`/projects/${project._id}`);
            });
        }
    );
}