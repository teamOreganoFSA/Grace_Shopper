const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/auth", require("../auth"));
router.use("/orders", require("./orders"));
router.use("/admin", require("./admin"));
router.use("/products", require("./products"));
router.use("/cart", require("./cart"));
router.use("/checkout", require("./checkout"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
