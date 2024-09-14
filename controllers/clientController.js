const { StatusCodes } = require("http-status-codes");
const { Client } = require("../models");
const ResponseHandler = require("../utils/responseHandler");
const { Op } = require("sequelize");

exports.createClient = async (req, res) => {
  const { name, email, phone, city } = req.body;
  try {
    const client = await Client.create({
      name,
      email,
      phone,
      city,
    });

    res
      .status(StatusCodes.CREATED)
      .json(ResponseHandler.success("Client Created successfull..", client));
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Internal Server Error", error));
  }
};

exports.getAllClients = async (req, res) => {
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

    const { count, rows } = await Client.findAndCountAll({
      ...query,
      offset: (page - 1) * limit,
      limit: limit,
    });

    res.status(StatusCodes.OK).json(
      ResponseHandler.success("All Clients", {
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

exports.getClinetById = async (req, res) => {
  const { clientId } = req.params;
  try {
    const client = await Client.findByPk(clientId);
    if (!client)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(ResponseHandler.error("Client not found"));

    res
      .status(StatusCodes.OK)
      .json(ResponseHandler.success("Client is: ", client));
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Server error", error));
  }
};

exports.updateClient = async (req, res) => {
  const { clientId } = req.params;
  const { name, phone, city, email } = req.body;

  try {
    const client = await Client.findByPk(clientId);
    if (!client)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(ResponseHandler.error("Client not found"));

    const updatedClinet = client.update({ name, phone, city, email });
    res
      .status(StatusCodes.OK)
      .json(
        ResponseHandler.success("Client updated successfull: ", updatedClinet)
      );
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Server error", error));
  }
};

exports.deleteClient = async (req, res) => {
  const { clientId } = req.params;
  try {
    const client = await Client.findByPk(clientId);
    if (!client)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(ResponseHandler.error("Client not found"));

    await client.destroy();
    res
      .status(StatusCodes.NO_CONTENT)
      .json(ResponseHandler.success("Client deleted successfull: "));
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Server error", error));
  }
};

exports.getClinetWithHelpers = async (req, res) => {
  const { clientId } = req.params;
  try {
    const client = await Client.findByPk(clientId, {
      include: [
        {
          model: Helper,
          through: { attributes: [] },
          attributes: ["id", "name", "phone", "city", "email"],
        },
      ],
    });
    if (!client)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(ResponseHandler.error("Client not found"));

    res
      .status(StatusCodes.OK)
      .json(ResponseHandler.success("Client with helper is: ", client));
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Server error", error));
  }
};
