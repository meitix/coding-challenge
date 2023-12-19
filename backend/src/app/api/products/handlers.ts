import { StatusCodes } from "http-status-codes";

import { HandlerResult, RequestHandler } from "../helpers";
import ProductSchema from "../../model/product";
import { logger } from "../../logger";

const DEFAULT_ORDER: OrderBy = { property: "stock", dir: "desc" };

interface Filters {
  brandName?: string;
  category?: string;
}

interface OrderBy {
  property: "price" | "stock";
  dir: "asc" | "desc";
}

interface Params extends Filters {
  sort?: string;
}

const makeOrder = (sort?: string): OrderBy => {
  if (!sort) return DEFAULT_ORDER;

  const [property, dir] = sort.split("-");

  if (["price", "stock"].includes(property) && ["asc", "desc"].includes(dir)) {
    return { property, dir } as OrderBy;
  }

  return DEFAULT_ORDER;
};

// ?brandName=nike&sort=price-asc
export const getProducts: RequestHandler = async (args?: Params) => {
  const order = makeOrder(args?.sort);
  let filter: Filters = {};

  if (args?.brandName) {
    filter.brandName = args.brandName;
  }
  if (args?.category) {
    filter.category = args.category;
  }

  try {
    const products = await ProductSchema.find(filter)
      .sort({ [order.property]: order.dir })
      .exec();
    return new HandlerResult(StatusCodes.OK, products);
  } catch (e) {
    logger.log(e);
    return new HandlerResult(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * I don't recommend using the following approach
 * cause it wouldn't be efficient if the records are high.
 * I would have created a new DB schema to hold these values and update it on product creation flow.
 * Since the creation flow is out of this assignment scope I skip that part and add a buffer to prevent multiple DB reads.
 */

/** instead of a variable we'd better use a key value storage like redis for caching purposes.
 * Also this cache update should happen on the creation flow as well.
 */
let searchableValuesBuffer;
export const getSearchableProperties: RequestHandler = async () => {
  try {
    if (!searchableValuesBuffer) {
      const categories = await ProductSchema.distinct("category");
      const brands = await ProductSchema.distinct("brandName");
      searchableValuesBuffer = { categories, brands };
    }

    return new HandlerResult(StatusCodes.OK, searchableValuesBuffer);
  } catch (e) {
    logger.log(e);
    return new HandlerResult(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
