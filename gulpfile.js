const gulp = require('gulp');
const { series } = require('gulp');
const htmlTask = require('./config/tasks/html');

// Задача по умолчанию
exports.default = series(htmlTask);
