var express = require("express");

var router = express.Router();

// var burger = require("../models/burger");



// router.get("/", function(req, res) {
//   burger.all(function(data) {
//     var hbsObject = {
//       burgers: data
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });

router.post("/api/burgers", function(req, res) {
  burger.create(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
    res.json({ id: result.insertId });
  });
});

// router.put("/api/burger/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   burger.update(
//     {
//       devoured: true
//     },
//     condition,
//     function(result) {
//       if (result.changedRows === 0) {
//         return res.status(404).end();
//       }
//       res.status(200).end();
//     }
//   );
// });

// Export routes for server.js to use.
module.exports = router;
