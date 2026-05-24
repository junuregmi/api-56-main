const { Op } = require("sequelize");
const { UserRoles, Status } = require("../config/constants");
const bannerService = require("../services/banner.service")

class BannerController {
  async create(req, res, next) {
    try {
      const data = await bannerService.transformForBannerCreate(req);
      const banner = await bannerService.store(data);

      res.json({
        data:banner,
        message: "Banner created successfully.",
        status: "BANNER_CREATED",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      let filter = { _id: id };
      const bannerDetail = await bannerService.getSingleRowByFilter(filter);
      if (!bannerDetail) {
        throw {
          code: 404,
          message: "Banner not found",
          status: "BANNER_NOT_FOUND_ERR",
        };
      }

      const data = await bannerService.transformForBannerUpdate(req,bannerDetail);
      const updateResponse = await bannerService.updateSingleRowByFilter(
        filter,
        data
      );

      res.json({
        data: updateResponse,
        message: "Banner updated successfully",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAll(req, res, next) {
    try {
      let filter = {};

      if (req.query.q) {
        filter = {
          title: { [Op.iLike]: `%${req.query.q}%` },
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

      const { data, pagination } = await bannerService.getAllRowsByFilter(
        filter,
        { page, limit }
      );

      res.json({
        data: data,
        message: "Banner Listing",
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

      const { data, pagination } = await bannerService.getAllRowsByFilter(
        filter,
        { page, limit }
      );

      res.json({
        data: data,
        message: "Banner Listing",
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

      const bannerDetail = await bannerService.getSingleRowByFilter(filter);
      if (!bannerDetail) {
        throw {
          code: 404,
          message: "Banner not found",
          status: "BANNER_NOT_FOUND_ERR",
        };
      }

      res.json({
        data:bannerDetail,
        message: "Banner Detail",
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

      const bannerDetail = await bannerService.getSingleRowByFilter(filter);
      if (!bannerDetail) {
        throw {
          code: 404,
          message: "Banner not found",
          status: "BANNER_NOT_FOUND_ERR",
        };
      }

      const deletedData = await bannerService.deleteSingleRowByFilter(filter);
      res.json({
        data: deletedData,
        messag: "Banner Deleted successfully.",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }
}

module.exports = new BannerController()