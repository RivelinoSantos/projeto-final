import express from "express";

import { adminMiddleware }
from "../middlewares/adminMiddleware.js";
import { getDashboard }
from "../Controllers/adminController.js";

const router = express.Router();

router.get(
  "/admin",
  adminMiddleware,
  getDashboard
);

export default router;