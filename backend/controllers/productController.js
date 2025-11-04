const Product = require("../models/productModel");

const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dhxyqjgao",
  api_key: "264238275145247",
  api_secret: "M5un1_dPWYGZRru4iqkuVvwFX4o",
  secure: true,
});

// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      brand,
      availableStatus,
      price,
      onlinePrice,
      dealerPrice,
      dealerName,
      paymentMode,
    } = req.body;
    let imageFileUrl = req.file?.filename;

    // Upload to Cloudinary if an image is provided
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              return reject(error); // Reject the promise on error
            }
            resolve(result); // Resolve the promise on success
          }
        );
        stream.end(req.file.buffer); // Buffer from Multer
      });

      imageFileUrl = result.secure_url; // Store the URL of the uploaded image
    }

    // Create a new product instance
    const newProduct = new Product({
      title,
      description,
      brand,
      availableStatus,
      price,
      onlinePrice,
      imageFile: imageFileUrl, // Save the image URL
      dealerPrice,
      dealerName,
      paymentMode,
    });

    // Save the product
    await newProduct.save();
    res.status(201).json(newProduct); // Send response after saving
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error creating product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      brand,
      availableStatus,
      price,
      onlinePrice,
      dealerPrice,
      dealerName,
      paymentMode,
    } = req.body;
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the product fields
    product.title = title;
    product.description = description;
    product.brand = brand;
    product.price = price;
    product.availableStatus = availableStatus;
    product.onlinePrice = onlinePrice;
    product.dealerPrice = dealerPrice;
    product.dealerName = dealerName;
    product.paymentMode = paymentMode;

    // Upload new image to Cloudinary if a new file is provided
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              return reject(error); // Reject the promise on error
            }
            resolve(result); // Resolve the promise on success
          }
        );
        stream.end(req.file.buffer); // Buffer from Multer
      });

      product.imageFile = result.secure_url; // Update the image URL
    }

    // Save the updated product
    await product.save();
    res.json(product); // Send response after saving
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};

const getProducts = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
   

    const { search, filterDell, filterHp, filterLenovo, priceRange, ...otherFilters } =
      req.query;
    const allowedFilters = ["filterDell", "filterHp", "filterLenovo", "priceRange"];
    const allowedQueryParams = ["page", "search", ...allowedFilters];

    const invalidKeys = Object.keys(otherFilters).filter(
      (key) => !allowedQueryParams.includes(key)
    );

    if (invalidKeys.length > 0) {
      return res.status(400).json({
        error: `Invalid filter keys: ${invalidKeys.join(
          ", "
        )}. Allowed filters are: ${allowedFilters.join(", ")}.`,
      });
    }

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    const selectedBrands = [];
    if (filterDell === "true") selectedBrands.push("Dell");
    if (filterHp === "true") selectedBrands.push("HP");
    if (filterLenovo === "true") selectedBrands.push("Lenovo");
    if (selectedBrands.length > 0) {
      query.brand = { $in: selectedBrands };
    }

 // Price range filter
 if (priceRange) {
  switch (priceRange) {
    case "under15000":
      query.price = { $lt: 15000 };
      break;
    case "16000to20000":
      query.price = { $gte: 16000, $lte: 20000 };
      break;
    case "25000to30000":
      query.price = { $gte: 25000, $lte: 30000 };
      break;
    case "35000to40000":
      query.price = { $gte: 35000, $lte: 40000 };
      break;
    case "45000to50000":
      query.price = { $gte: 45000, $lte: 50000 };
      break;
    case "above50000":
      query.price = { $gt: 50000 };
      break;
    default:
      break;
  }
}

    const total = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(limit);

    if (products.length === 0 && page > 1) {
      return res.status(404).json([]);
    }

    res.json({ products, total });
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

// Export the controller functions
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
