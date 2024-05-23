import { Request, Response } from "express";
import { ProductServices } from "./product.services";
import { zodValidation } from "./product.zod.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const productParsedData =
      zodValidation.productValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(productParsedData);

    if (result === null) {
      return res.status(400).json({
        success: false,
        message: "Product already exists!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const queryProduct: any = req.query.searchTerm;

    if (queryProduct) {
      const result = await ProductServices.getAllProductsFromDB(queryProduct);
      if (result.length > 0) {
        return res.status(200).json({
          success: true,
          message: `Products matching search term '${queryProduct}' fetched successfully!`,
          data: result,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Products not found!",
        });
      }
    }

    const result = await ProductServices.getAllProductsFromDB("");
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: error,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    const productId = req.params.productId;

    const zodParsedUpdatedData =
      zodValidation.partialProductValidationSchema.parse(updatedData);

    const result = await ProductServices.updateSingleProductFromDB(
      zodParsedUpdatedData,
      productId
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteProduct,
};
