import { StatusCodes } from "http-status-codes";
import { getProducts, getSearchableProperties } from "./handlers";
import ProductSchema from "../../model/product";

jest.mock("../../model/product");

describe("getProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return products with default sorting when no parameters are provided", async () => {
    const mockFind = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([
            {
              gtin: "1234567890132",
              brandName: "Aurora",
              stock: 150,
              category: "shirt",
              color: "gray",
              name: "Aurora Gray Shirt",
              image: "shirt.png",
              price: 65,
            },
          ]),
        }),
      }),
    });
    (ProductSchema.find as jest.Mock).mockImplementationOnce(mockFind);
    const result = await getProducts();
    expect(result.status).toBe(StatusCodes.OK);
    expect(ProductSchema.find).toHaveBeenCalledWith({});
  });

  it("should return products with specified sorting and filtering", async () => {
    const mockFind = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([
            {
              gtin: "1234567890132",
              brandName: "Aurora",
              stock: 150,
              category: "shirt",
              color: "gray",
              name: "Aurora Gray Shirt",
              image: "shirt.png",
              price: 65,
            },
          ]),
        }),
      }),
    });

    (ProductSchema.find as jest.Mock).mockImplementationOnce(mockFind);

    const result = await getProducts({
      brandName: "Aurora",
      category: "shirt",
      sort: "price-asc",
    });

    expect(result.status).toBe(StatusCodes.OK);
    expect(mockFind).toHaveBeenCalledWith({
      brandName: "Aurora",
      category: "shirt",
    });
    expect(mockFind().sort).toHaveBeenCalledWith({ price: "asc" });
  });
});
describe("getSearchableProperties", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle internal server error", async () => {
    (ProductSchema.distinct as jest.Mock).mockReturnValue({
      lean: jest
        .fn()
        .mockReturnValue({
          exec: jest
            .fn()
            .mockRejectedValueOnce(new Error("Internal Server Error")),
        }),
    });
    const result = await getSearchableProperties();

    expect(result.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toBeUndefined();
  });
  it("should return searchable properties from buffer if buffer is present", async () => {
    const data = {
      categories: ["shoes", "clothing"],
      brands: ["nike", "adidas"],
    };
    (ProductSchema.distinct as jest.Mock).mockImplementation(
      (field: string) => {
        const res = field === "category"
          ? data.categories
          : field === "brandName"
          ? data.brands
          : undefined;

          return {lean: () => ({exec: () => res}) }
      }
    );
    
    // first call
    await getSearchableProperties();
    expect(ProductSchema.distinct).toHaveBeenCalledTimes(2);

    //second call
    const result = await getSearchableProperties();
    expect(result.status).toBe(StatusCodes.OK);
    expect(result.body).toEqual(data);
    expect(ProductSchema.distinct).toHaveBeenCalledTimes(2);
  });
});
