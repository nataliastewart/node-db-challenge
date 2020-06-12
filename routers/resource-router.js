const express = require("express");

const db = require("../connection"); //<<<<<<<< connection

const router = express.Router();

//-------endpoints start here--------/

//-----------GET resources---------
router.get("/", (req, res) => {
  db("resource")
    .then((resources) => {
      res.json(resources);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve resources" });
    });
});

//----------GET resource BY ID-----//
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("resource")
    .where({ id })
    .first()
    .then((resource) => {
      res.json(resource);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve resource" });
    });
});

//---------POST / INSERT resource---/
router.post("/", (req, res) => {
  const newresource = req.body;
  db("resource")
    .insert(newresource)
    .then((resource) => {
      res.status(201).json(resource);
    })
    .catch((error) => {
      console.log("POST/INSERT/ error:", error);
      res.status(500).json({ message: error.message });
    });
});

//------PUT/UPDATE resource -----//
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("resource")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count >= 0) {
        res.status(200).json({ message: "resource updated successfully" });
      } else {
        res.status(404).json({ message: "no resource updated or found" });
      }
    })
    .catch((error) => {
      console.log("PUT / error", error);
    });
});

//----------DELETE resource by ID----//
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("resource")
    .where({ id }) // if not using a where, all records will be removed
    .del() // <----- don't forget this part
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "resource deleted successfully" });
      } else {
        res.status(404).json({ message: "no resources found" });
      }
    })
    .catch((error) => {
      console.log("DELETE / error", error);
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
