'use strict'

function getToDoTasks(taskList) {
    return taskList.filter(v => v.done == false || typeof v.done == "undefined");
}

function findByTag(taskList, tag) {
    return taskList.filter(v => v.tags.some(v => v == tag));
}

function findByTags(tasks, tags) {
    return tasks.reduce((ac, n) => {
        if (tags.some(k => n.tags.filter(j => j == k).length > 0))
            ac.push(n);
        return ac;
    }, []);
}

function countDone(taskList) {
    return taskList.filter(v => v.done == true && typeof v.done !== "undefined");
}

function createTask(value) {
    var tags = value.match(/@\w*/g).map(n => n.replace(/@/, ""));
    var text = value.replace(/@\w*/g, "").trim().replace("  ", " ");
    return { "text": text, "tags": tags };
}

module.exports = {
    getToDoTasks: getToDoTasks,
    findByTag: findByTag,
    findByTags: findByTags,
    countDone: countDone,
    createTask: createTask
}