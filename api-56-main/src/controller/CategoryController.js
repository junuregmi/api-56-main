const { UserRoles, Status } = require("../config/constants");
const categoryService = require("../services/category.service")

class CategoryController {
  async create(req, res, next) {
    try {
      const data = await categoryService.transformForCategoryCreate(req);
      const category = await categoryService.store(data);

      res.json({
        data: category,
        message: "Category created successfully.",
        status: "CATEGORY_CREATED",
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

      const categoryDetail = await categoryService.getSingleRowByFilter(filter);
      if (!categoryDetail) {
        throw {
          code: 404,
          message: "Category not found",
          status: "CATEGORY_NOT_FOUND_ERR",
        };
      }

      const data = await categoryService.transformForCategoryUpdate(req, categoryDetail);
      const updateResponse = await categoryService.updateSingleRowByFilter(
        filter,
        data
      );

      res.json({
        data: updateResponse,
        message: "Category updated successfully",
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
          $or: [
            { name: new RegExp(req.query.q, "i") },
            { description: new RegExp(req.query.q, "i") }
          ],
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

      const { data, pagination } = await categoryService.getAllRowsByFilter(
        filter,
        { page, limit }
      );

      res.json({
        data: data,
        message: "Category Listing",
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

      const { data, pagination } = await categoryService.getAllRowsByFilter(
        filter,
        { page, limit }
      );

      res.json({
        data: data,
        message: "Category Listing",
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

      const categoryDetail = await categoryService.getSingleRowByFilter(filter);
      if (!categoryDetail) {
        throw {
          code: 404,
          message: "Category not found",
          status: "CATEGORY_NOT_FOUND_ERR",
        };
      }

      res.json({
        data: categoryDetail,
        message: "Category Detail",
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

      const categoryDetail = await categoryService.getSingleRowByFilter(filter);
      if (!categoryDetail) {
        throw {
          code: 404,
          message: "Category not found",
          status: "CATEGORY_NOT_FOUND_ERR",
        };
      }

      const deletedData = await categoryService.deleteSingleRowByFilter(filter);
      res.json({
        data: deletedData,
        messag: "Category Deleted successfully.",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAllProductsByCategorySlug(req, res, next) {
    try {
      const categoryDetail = await categoryService.getSingleRowByFilter({
        slug: req.params.slug, 
        status: Status.ACTIVE
      })
      if(!categoryDetail) {
        throw {code: 404, message: "Category Not found", status: "NOT_FOUND_ERR"}
      }

      // TODO: Listing of product by the category detail
      
    } catch(exception) {
      next(exception)
    }
  }
}

module.exports = new CategoryController()