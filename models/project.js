const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
}, {
    timestamps: true
});

const projectSchema = new Schema({
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    image: String,
    startDate: {
        type: Date,
        default: function() {
            let today = new Date();
            return today;
        }
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Easy', 'Intermediate', 'Experienced'],
    },
    description: String,
    complete: {
        type: Boolean,
        default: false,
    },
    comment: [commentSchema],
    }, {
    timestamps: true
  });

module.exports = mongoose.model('Project', projectSchema);