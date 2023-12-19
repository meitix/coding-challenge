import { Request, Response } from "express";
import { RequestHandler } from "./handlers";

export const handlerWrapper = (handler: RequestHandler) => {
  return async (req: Request, res: Response) => {
    const data = [req.params, req.body, req.query].filter(
      (d) => !!d && JSON.stringify(d) !== "{}"
    );
    const result = await handler(...data);
    let body = result.body;
    if (result.body instanceof Error) {
      body = { error: (body as Error).message };
    }
    res.status(result.status).header(result.headers).json(body);
  };
};
