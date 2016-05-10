/**
 * Include gulp task definitions from gulp folder
 */
const fs = require('fs'),
    path = require("path");

// Filters out non-javascript files. Prevents
// accidental inclusion of possible hidden files
const tasks = fs.readdirSync('./gulp/').filter(function(name) {
    return /(\.(js)$)/i.test(path.extname(name));
});

tasks.forEach(function(task) {
    require('./gulp/' + task);
});
