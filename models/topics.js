'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = Schema({
    content: String,
    date: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User'},
});

var Comment = mongoose.model('Comment', CommentSchema);

var TopicSchema = Schema({
    title: String,
    content: String,
    code: String,
    lang: String,
    date: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User'},
    comments: [CommentSchema]

});

module.exports = mongoose.model('Topic', TopicSchema);