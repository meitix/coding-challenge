import { Router } from "express";
import { productRouter } from "./products";

export const appRouter = Router();

appRouter.use("/products", productRouter);
