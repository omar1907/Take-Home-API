const { StatusCodes } = require("http-status-codes");
const { Client, Helper, ClientHelper } = require("../models");
const ResponseHandler = require("../utils/responseHandler");

exports.findMatchingHelpers = async (req, res) => {
  const { clientId } = req.params;
  try {
    const client = await Client.findByPk(clientId);
    if (!client)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(ResponseHandler.error("Client not found"));

    const matchingHelpers = await Helper.findAll({
      where: { city: client.city },
    });

    res
      .status(StatusCodes.OK)
      .json(ResponseHandler("Matching helpers", matchingHelpers));
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Server error", error));
  }
};

exports.assignHelperToClient = async (req, res) => {
  const { clientId, helperId } = req.params;
  try {
    const client = await Client.findByPk(clientId);
    const helper = await Helper.findByPk(helperId);

    if (client.city !== helper.city) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          ResponseHandler.error("Client and Helper Must be in the same city")
        );
    }
    const [clientHelper, created] = await ClientHelper.findOrCreate({
      where: {
        clientId,
        helperId,
      },
    });

    if (!created)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          ResponseHandler.error("Helper is already assigned to this client")
        );

    res
      .status(StatusCodes.CREATED)
      .json(
        ResponseHandler.success(
          "Helper assigned to client successfully",
          clientHelper
        )
      );
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Server error", error));
  }
};

exports.unAssignHelperFromClient = async (req, res) => {
  const { clientId, helperId } = req.params;
  try {
    const clientHelper = await ClientHelper.findOne({
      where: {
        clientId,
        helperId,
      },
    });

    if (!clientHelper)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ResponseHandler.error("Helper is not assigned to this client"));

    await clientHelper.destroy();

    res
      .status(StatusCodes.NO_CONTENT)
      .json(
        ResponseHandler.success("Helper unassigned from client successfully")
      );
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseHandler.error("Server error", error));
  }
};
