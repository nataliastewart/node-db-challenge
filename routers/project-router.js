const express = require("express");

const db = require("../connection"); //<<<<<<<< connection

const router = express.Router();

//-------endpoints start here--------/

//-----------GET projects---------
router.get("/", (req, res) => {
  db("project")
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve projects" });
    });
});

//----------GET project BY ID-----//
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("project")
    .where({ id })
    .first()
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve project" });
    });
});

//---------POST / INSERT project---/
router.post("/", (req, res) => {
  const newProject = req.body;
  db("project")
    .insert(newProject)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log("POST/INSERT/ error:", error);
      res.status(500).json({ message: error.message });
    });
});

//------PUT/UPDATE project -----//
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("project")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count >= 0) {
        res.status(200).json({ message: "project updated successfully" });
      } else {
        res.status(404).json({ message: "no project updated or found" });
      }
    })
    .catch((error) => {
      console.log("PUT / error", error);
    });
});

//----------DELETE project by ID----//
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("project")
    .where({ id }) // if not using a where, all records will be removed
    .del() // <----- don't forget this part
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "project deleted successfully" });
      } else {
        res.status(404).json({ message: "no projects found" });
      }
    })
    .catch((error) => {
      console.log("DELETE / error", error);
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
