const express = require("express");

const db = require("../connection"); //<<<<<<<< connection

const router = express.Router();

//-------endpoints start here--------/

//-----------GET tasks---------
router.get("/", (req, res) => {
  db("task")
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve tasks" });
    });
});

//----------GET task BY ID-----//
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("task")
    .where({ id })
    .first()
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve task" });
    });
});

//---------POST / INSERT task---/
router.post("/", (req, res) => {
  const newtask = req.body;
  db("task")
    .insert(newtask)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((error) => {
      console.log("POST/INSERT/ error:", error);
      res.status(500).json({ message: error.message });
    });
});

//------PUT/UPDATE task -----//
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("task")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count >= 0) {
        res.status(200).json({ message: "task updated successfully" });
      } else {
        res.status(404).json({ message: "no task updated or found" });
      }
    })
    .catch((error) => {
      console.log("PUT / error", error);
    });
});

//----------DELETE task by ID----//
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("task")
    .where({ id }) // if not using a where, all records will be removed
    .del() // <----- don't forget this part
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "task deleted successfully" });
      } else {
        res.status(404).json({ message: "no tasks found" });
      }
    })
    .catch((error) => {
      console.log("DELETE / error", error);
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
