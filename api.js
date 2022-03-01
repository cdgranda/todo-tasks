var mongoose = require("mongoose");
var express = require("express");
var TaskModel = require('./task_schema');
var router = express.Router();
var query = "mongodb+srv://cdgrandaq:familia2848@cluster0.uetp8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const db = (query);

mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    } else {
        console.log("Se ha conectado con la base de datos exitosamente");
    }
});

router.post('/create-task', function (req, res) {
    let task_id = req.body.TaskId;
    let name = req.body.Name;
    let deadline = req.body.Deadline;

    let task = {
        TaskId: task_id,
        Name: name,
        Deadline: deadline
    }
    var newTask = new TaskModel(task);

    newTask.save(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal error\n");
        }
        else {
            res.status(200).send("OK\n");
        }
    });
});

router.get('/all-tasks', function (req, res) {
    TaskModel.find(function (err, data) {
        if (err) {
            res.status(500).send("Internal error\n");
        }
        else {
            res.status(200).send(data);
        }
    });
});

module.exports = router;