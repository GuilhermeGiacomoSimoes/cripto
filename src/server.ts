import express from "express";
import dotenv from "dotenv";
import { app } from "./infra/drivers/app";

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
