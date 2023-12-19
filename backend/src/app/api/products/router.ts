import { Router } from "express";
import { getProducts, getSearchableProperties } from "./handlers";
import { handlerWrapper } from "../helpers";

const router = Router();

router.get("/", handlerWrapper(getProducts));
router.get("/filterValues", handlerWrapper(getSearchableProperties));

export { router as productRouter };
