import { Router } from "express";

const router = Router();

router.use("/test", (req, res) => {
  res.json({ message: "Test endpoint is working!" });
});

export default router;
