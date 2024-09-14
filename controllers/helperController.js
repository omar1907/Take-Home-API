const { StatusCodes } = require("http-status-codes");
const { Helper } = require("../models");
const ResponseHandler = require("../utils/responseHandler");
const { Op } = require("sequelize");
exports.createHelper = async (req, res) => {
  const { name, email, phone, city } = req.body;
  try {
    const helper = await Helper.create({
      name,
      email,
      phone,
      city,
    });

    res
      .status(StatusCodes.CREATED)
      .json(ResponseHandler.success("Helper Created successfull..", helper));
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Internal Server Error", error));
  }
};

exports.getAllHelpers = async (req, res) => {
  const page = parseInt(req.query.page) + 1;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search;
  try {
    const query = {};
    if (search) {
      query.where = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    const { count, rows } = await Helper.findAndCountAll({
      ...query,
      offset: (page - 1) * limit,
      limit: limit,
    });

    res.status(StatusCodes.OK).json(
      ResponseHandler.success("All Helpers", {
        data: rows,
        total: count,
        pages: Math.ceil(count / limit),
        current_page: page,
      })
    );
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Server error", error));
  }
};

exports.getHelperById = async (req, res) => {
  const { helperId } = req.params;
  try {
    const helper = await Helper.findByPk(helperId);
    if (!helper)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(ResponseHandler.error("Helper not found"));

    res
      .status(StatusCodes.OK)
      .json(ResponseHandler.success("Helper is: ", helper));
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Server error", error));
  }
};

exports.updateHelper = async (req, res) => {
  const { helperId } = req.params;
  const { name, phone, city, email } = req.body;

  try {
    const helper = await Helper.findByPk(helperId);
    if (!helper)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(ResponseHandler.error("Helper not found"));

    const updatedHelper = Helper.update({ name, phone, city, email });
    res
      .status(StatusCodes.OK)
      .json(
        ResponseHandler.success("Helper updated successfull: ", updatedHelper)
      );
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Server error", error));
  }
};

exports.deleteHelper = async (req, res) => {
  const { helperId } = req.params;
  try {
    const helper = await Helper.findByPk(helperId);
    if (!helper)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(ResponseHandler.error("Helper not found"));

    await Helper.destroy();
    res
      .status(StatusCodes.NO_CONTENT)
      .json(ResponseHandler.success("Helper deleted successfull: "));
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Server error", error));
  }
};

exports.getHelperWithClients = async (req, res) => {
  const { helperId } = req.params;

  try {
    const helper = await Helper.findByPk(helperId, {
      include: [
        {
          model: Client,
          through: { attributes: [] },
          attributes: ["id", "name", "phone", "city", "email"],
        },
      ],
    });

    if (!helper)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(ResponseHandler.error("Helper not found"));

    res
      .status(StatusCodes.OK)
      .json(ResponseHandler.success("Helper with his clients: ", helper));
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Server error", error));
  }
};
