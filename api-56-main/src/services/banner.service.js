const slugify = require("slugify");
const cloudinarySvc = require("./cloudinary.config");
const BannerModel = require("../models/Banner.model");

class BannerService {
  async transformForBannerCreate(req) {
    try {
      const data = req.body; 
      
      data.image = null;// 
      if(req.file) {
        data.image = await cloudinarySvc.uploadSingleFile(req.file.path, '/banner')
      }

      data.createdBy = JSON.stringify(req.loggedInUser._id);
      return data
    } catch(exception) {
      throw exception
    }
  }

  async transformForBannerUpdate(req, existingBanner) {
    try {
      const data = req.body;
      data.image = existingBanner.image;

      if (req.file) {
        data.image = await cloudinarySvc.uploadSingleFile(
          req.file.path,
          "/banner"
        );
      }

      data.updatedBy = JSON.stringify(req.loggedInUser._id);
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async updateSingleRowByFilter(filter, data) {
    try {
      // const update = await BannerModel.findOneAndUpdate(filter, {$set: data}, {new: true})
      // return update;
      const update = await BannerModel.update(data, { where: filter})
      return await this.getSingleRowByFilter(filter);
    } catch(exception) {
      throw exception
    }
  }

  async store(data) {
    try {
      const banner = await BannerModel.create(data)
      return banner
    } catch(exception) {
      throw exception
    }
  }

  async getAllRowsByFilter(filter, config={page:1, limit:20}) {
    try { 
      const skip = (config.page - 1) * config.limit;

      const {rows, count}= await BannerModel.findAndCountAll({
        where: filter, 
        offset: skip, 
        limit: config.limit
      })

      return {
        data: rows,
        pagination: {
          total: count,
          limit: +config.limit,
          page: +config.page,
          countNoOfPages: Math.ceil(count / +config.limit),
        },
      }; 
    } catch(exception) {
      throw exception
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const data = await BannerModel.findOne({
        where: filter
      })
      return data
    } catch (exception) {
      throw exception;
    }
  }

  async deleteSingleRowByFilter(filter) {
    try {
      const data = await BannerModel.destroy({where: filter})
      return data
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new BannerService()