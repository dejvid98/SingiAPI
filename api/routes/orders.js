const express = require("express");
const router = express.Router();

router.get("/:orderid", (req, res, next) => {
  res.status(200).json({
    message: "Order details",
    orderId: req.params.orderId
  });
});

router.delete("/:orderid", (req, res, next) => {
  res.status(200).json({
    message: "Order deleted",
    orderId: req.params.orderId
  });
});

module.exports = router;
