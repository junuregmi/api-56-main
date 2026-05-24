const slugify = require("slugify");
const cloudinarySvc = require("./cloudinary.config");
const CategoryModel = require("../models/Category.model");

class CategoryService {
  async transformForCategoryCreate(req) {
    try {
      const data = req.body; 
      
      data.slug = slugify(data.name, { 
        lower: true,
        remove: /[*+~.()'"!:@]/g,
        trim: true,
        // strict: true
      })   // data.name => Apple Category => apple-category

      data.image = null;// 
      if(req.file) {
        data.image = await cloudinarySvc.uploadSingleFile(req.file.path, '/category')
      }

      // parentId, brandId
      if (!data.parentId || data.parentId === 'null') {
        data.parentId = null
      }
      if (!data.brandId || data.brandId === "null") {
        data.brandId = null;
      }

      data.createdBy = req.loggedInUser._id;
      return data
    } catch(exception) {
      throw exception
    }
  }

  async transformForCategoryUpdate(req, existingCategory) {
    try {
      const data = req.body;
      data.image = existingCategory.image;

      if (req.file) {
        data.image = await cloudinarySvc.uploadSingleFile(
          req.file.path,
          "/category"
        );
      }

      // parentId, brandId
      if (!data.parentId || data.parentId === "null") {
        data.parentId = null;
      }
      if (!data.brandId || data.brandId === "null") {
        data.brandId = null;
      }

      data.updatedBy = req.loggedInUser._id;
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async updateSingleRowByFilter(filter, data) {
    try {
      const update = await CategoryModel.findOneAndUpdate(filter, {$set: data}, {new: true})
      return update;
    } catch(exception) {
      throw exception
    }
  }

  async store(data) {
    try {
      const category = new CategoryModel(data);
      return await category.save()
    } catch(exception) {
      throw exception
    }
  }

  async getAllRowsByFilter(filter, config={page:1, limit:20}) {
    try { 
      // console.log(config)
      let skip = (+config.page-1) * +config.limit;
      const data = await CategoryModel.find(filter)
        .populate("parentId", ["_id", "name", "slug", "image", "status"])
        .populate("brandId", ["_id", "name", "slug", "logo", "status"])
        .populate("createdBy", ["_id", "name", "email", "role", "image"])
        .populate("updatedBy", ["_id", "name", "email", "role", "image"])
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(+config.limit);
      const total = await CategoryModel.countDocuments(filter)

      return {
        data: data,
        pagination: {
          total: total,
          limit: +config.limit,
          page: +config.page,
          totalNoOfPages: Math.ceil(total / +config.limit),
        },
      }; 
    } catch(exception) {
      throw exception
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const data = await CategoryModel.findOne(filter)
        .populate("parentId", ["_id", "name", "slug", "image", "status"])
        .populate("brandId", ["_id", "name", "slug", "logo", "status"])
        .populate("createdBy", ["_id", "name", "email", "role", "image"])
        .populate("updatedBy", ["_id", "name", "email", "role", "image"]);
      return data
    } catch (exception) {
      throw exception;
    }
  }

  async deleteSingleRowByFilter(filter) {
    try {
      const data = await CategoryModel.findOneAndDelete(filter)
      return data
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new CategoryService()