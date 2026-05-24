const { UserRoles, Status } = require("../config/constants");
const brandService = require("../services/brand.service")

class BrandController {
  async create(req, res, next) {
    try {
      const data = await brandService.transformForBrandCreate(req);
      const brand = await brandService.store(data);

      res.json({
        data: brand,
        message: "Brand created successfully.",
        status: "BRAND_CREATED",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;

      let filter = { _id: id };
      if (req.loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loggedInUser._id,
        };
      }

      const brandDetail = await brandService.getSingleRowByFilter(filter);
      if (!brandDetail) {
        throw {
          code: 404,
          message: "Brand not found",
          status: "BRAND_NOT_FOUND_ERR",
        };
      }

      const data = await brandService.transformForBrandUpdate(req, brandDetail);
      const updateResponse = await brandService.updateSingleRowByFilter(
        filter,
        data
      );

      res.json({
        data: updateResponse,
        message: "Brand updated successfully",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAll(req, res, next) {
    try {
      let filter = {};
      const loggedInUser = req.loggedInUser;

      if (req.query.q) {
        filter = {
          name: new RegExp(req.query.q, "i"),
        };
      }

      if (loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: loggedInUser._id,
        };
      }

      if (req.query.status) {
        filter = {
          ...filter,
          status: req.query.status,
        };
      }

      // pagination
      let page = +req.query.page || 1;
      let limit = +req.query.limit || 20;

      const { data, pagination } = await brandService.getAllRowsByFilter(
        filter,
        { page, limit }
      );

      res.json({
        data: data,
        message: "Brand Listing",
        status: "OK",
        meta: {
          pagination,
        },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async publicListAll(req, res, next) {
    try {
      let filter = {
        status: Status.ACTIVE
      };
      if (req.query.q) {
        filter = {
          ...filter, 
          name: new RegExp(req.query.q, "i"),
        };
      }

      // pagination
      let page = +req.query.page || 1;
      let limit = +req.query.limit || 20;

      const { data, pagination } = await brandService.getAllRowsByFilter(
        filter,
        { page, limit }
      );

      res.json({
        data: data,
        message: "Brand Listing",
        status: "OK",
        meta: {
          pagination,
        },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getDetailById(req, res, next) {
    try {
      const id = req.params.id;

      let filter = { _id: id };
      if (req.loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loggedInUser._id,
        };
      }

      const brandDetail = await brandService.getSingleRowByFilter(filter);
      if (!brandDetail) {
        throw {
          code: 404,
          message: "Brand not found",
          status: "BRAND_NOT_FOUND_ERR",
        };
      }

      res.json({
        data: brandDetail,
        message: "Brand Detail",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;

      let filter = { _id: id };
      if (req.loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loggedInUser._id,
        };
      }

      const brandDetail = await brandService.getSingleRowByFilter(filter);
      if (!brandDetail) {
        throw {
          code: 404,
          message: "Brand not found",
          status: "BRAND_NOT_FOUND_ERR",
        };
      }

      const deletedData = await brandService.deleteSingleRowByFilter(filter);
      res.json({
        data: deletedData,
        messag: "Brand Deleted successfully.",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAllProductsByBrandSlug(req, res, next) {
    try {
      const brandDetail = await brandService.getSingleRowByFilter({
        slug: req.params.slug, 
        status: Status.ACTIVE
      })
      if(!brandDetail) {
        throw {code: 404, message: "Brand Not found", status: "NOT_FOUND_ERR"}
      }

      // TODO: Listing of product by the brand detail
      
    } catch(exception) {
      next(exception)
    }
  }
}

module.exports = new BrandController()