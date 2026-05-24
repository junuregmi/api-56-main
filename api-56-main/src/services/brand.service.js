const slugify = require("slugify");
const cloudinarySvc = require("./cloudinary.config");
const BrandModel = require("../models/Brand.model");

class BrandService {
  async transformForBrandCreate(req) {
    try {
      const data = req.body; 
      
      data.slug = slugify(data.name, { 
        lower: true,
        remove: /[*+~.()'"!:@]/g,
        trim: true,
        // strict: true
      })   // data.name => Apple Brand => apple-brand

      data.logo = null;// 
      if(req.file) {
        data.logo = await cloudinarySvc.uploadSingleFile(req.file.path, '/brand')
      }

      data.createdBy = req.loggedInUser._id;
      return data
    } catch(exception) {
      throw exception
    }
  }

  async transformForBrandUpdate(req, existingBrand) {
    try {
      const data = req.body;
      data.logo = existingBrand.logo;

      if (req.file) {
        data.logo = await cloudinarySvc.uploadSingleFile(
          req.file.path,
          "/brand"
        );
      }

      data.updatedBy = req.loggedInUser._id;
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async updateSingleRowByFilter(filter, data) {
    try {
      const update = await BrandModel.findOneAndUpdate(filter, {$set: data}, {new: true})
      return update;
    } catch(exception) {
      throw exception
    }
  }

  async store(data) {
    try {
      const brand = new BrandModel(data);
      return await brand.save()
    } catch(exception) {
      throw exception
    }
  }

  async getAllRowsByFilter(filter, config={page:1, limit:20}) {
    try { 
      // console.log(config)
      let skip = (+config.page-1) * +config.limit;
      const data = await BrandModel.find(filter)
        .populate("createdBy", ["_id", "name", "email", "role", "image"])
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(+config.limit);
      const total = await BrandModel.countDocuments(filter)

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
      const data = await BrandModel.findOne(filter)
        .populate("createdBy", ["_id", "name", "email", "role", "image"])
      return data
    } catch (exception) {
      throw exception;
    }
  }

  async deleteSingleRowByFilter(filter) {
    try {
      const data = await BrandModel.findOneAndDelete(filter)
      return data
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new BrandService()