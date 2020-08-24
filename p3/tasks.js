'use strict'

let listaTareas = [{
        text: "Preparar práctica AW",
        tags: ["AW", "practica"]
    },
    {
        text: "Mirar fechas congreso",
        done: true,
        tags: []
    },
    {
        text: "Ir al supermercado",
        tags: ["personal"]
    },
    {
        text: "Mudanza",
        done: false,
        tags: ["personal"]
    }
];

function getToDoTasks(taskList) {
    return taskList.filter(v => v.done == false || typeof v.done == "undefined");
}

//console.log(getToDoTasks(listaTareas));

function findByTag(taskList, tag) {
    return taskList.filter(v => v.tags.some(v => v == tag));
}

//console.log(findByTag(listaTareas, "practica"));

function findByTags(tasks, tags) {
    return tasks.reduce((ac, n) => {
        if (tags.some(k => n.tags.filter(j => j == k).length > 0))
            ac.push(n);
        return ac;
    }, []);
}

//console.log(findByTags(listaTareas,["personal", "practica"]));

function countDone(taskList) {
    return taskList.filter(v => v.done == true && typeof v.done !== "undefined");
}

// console.log(countDone(listaTareas));

function createTask(value) {
    var tags = value.match(/@\w*/g).map(n => n.replace(/@/, ""));
    var text = value.replace(/@\w*/g, "").trim().replace("  ", " ");
    return { "text": text, "tags": tags };
}

// console.log(createTask("Ir al medico @personal @salud"));
// console.log(createTask("@AW            @practica Preparar práctica AW"));