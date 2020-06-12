const express = require("express");

const db = require("../connection"); //<<<<<<<< connection

const router = express.Router();

//-------endpoints start here--------/

//-----------GET newtasks---------
router.get("/", (req, res) => {
  db("newtask")
    .then((newtasks) => {
      res.json(newtasks);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve newtasks" });
    });
});

//----------GET newtask BY ID-----//
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("newtask")
    .where({ id })
    .first()
    .then((newtask) => {
      res.json(newtask);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve newtask" });
    });
});

//---------POST / INSERT newtask---/
router.post("/", (req, res) => {
  const newnewtask = req.body;
  db("newtask")
    .insert(newnewtask)
    .then((newtask) => {
      res.status(201).json(newtask);
    })
    .catch((error) => {
      console.log("POST/INSERT/ error:", error);
      res.status(500).json({ message: error.message });
    });
});

//------PUT/UPDATE newtask -----//
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("newtask")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count >= 0) {
        res.status(200).json({ message: "newtask updated successfully" });
      } else {
        res.status(404).json({ message: "no newtask updated or found" });
      }
    })
    .catch((error) => {
      console.log("PUT / error", error);
    });
});

//----------DELETE newtask by ID----//
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("newtask")
    .where({ id }) // if not using a where, all records will be removed
    .del() // <----- don't forget this part
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "newtask deleted successfully" });
      } else {
        res.status(404).json({ message: "no newtasks found" });
      }
    })
    .catch((error) => {
      console.log("DELETE / error", error);
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
