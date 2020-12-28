const express = require("express");
const app = express();

const mongoose = require("./Database/mongoose");

const List = require("./Database/models/list");
const Task = require("./Database/models/task");

// for CORS issue

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, PUT, DELETE, OPTIONS, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.listen(3000, () => {
  console.log("Server is connected on port 3000");
});

// List URLs
app.get("/lists", (req, res) => {
  List.find({})
    .then((list) => {
      res.send(list);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.post("/lists", (req, res) => {
  new List({
    title: req.body.title,
  })
    .save()
    .then((list) => {
      res.send(list);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/lists/:listId", (req, res) => {
  List.find({ _id: req.params.listId })
    .then((list) => {
      res.send(list);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.patch("/lists/:listId", (req, res) => {
  List.findOneAndUpdate({ _id: req.params.listId }, { $set: req.body })
    .then((list) => {
      res.send(list);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.delete("/lists/:listId", (req, res) => {
  const deleteTasks = (list) => {
    Task.deleteMany({ _listId: list._id })
      .then(() => {
        res.send(list);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const list = List.findByIdAndDelete(req.params.listId)
    .then((list) => {
      deleteTasks(list);
    })
    .catch((error) => {
      console.log(error);
    });
  res.status(200);
});

// Tasks URLs
app.get("/lists/:listId/tasks", (req, res) => {
  Task.find({ _listId: req.params.listId })
    .then((task) => {
      res.send(task);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/lists/:listId/tasks", (req, res) => {
  new Task({ _listId: req.params.listId, title: req.body.title })
    .save()
    .then((task) => {
      res.send(task);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOne({ _listId: req.params.listId, _id: req.params.taskId })
    .then((task) => {
      res.send(task);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndUpdate(
    { _listId: req.params.listId, _id: req.params.taskId },
    { $set: req.body }
  )
    .then((task) => {
      res.send(task);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findByIdAndDelete({ _listId: req.params.listId, _id: req.params.taskId })
    .then((task) => {
      res.send(task);
    })
    .catch((error) => {
      console.log(error);
    });
});
