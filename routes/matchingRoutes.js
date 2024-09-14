const express = require("express");
const matchingRouter = express.Router();

const {
  findMatchingHelpers,
  assignHelperToClient,
  unAssignHelperFromClient,
} = require("../controllers/matchingController");

/**
 * @swagger
 * /api/v1/client-helpers/clients/{clientId}/helpers/matching:
 *   get:
 *     summary: Find matching helpers for a client based on the city
 *     tags: [Client Helpers]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The client ID
 *     responses:
 *       200:
 *         description: List of matching helpers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Helper'
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
matchingRouter.get("/clients/:clientId/helpers/matching", findMatchingHelpers);

/**
 * @swagger
 * /api/v1/client-helpers/clients/{clientId}/helpers/{helperId}:
 *   post:
 *     summary: Assign a helper to a client
 *     tags: [Client Helpers]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The client ID
 *       - in: path
 *         name: helperId
 *         required: true
 *         schema:
 *           type: string
 *         description: The helper ID
 *     responses:
 *       201:
 *         description: Helper assigned to client successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientHelper'
 *       400:
 *         description: Client and Helper must be in the same city or Helper is already assigned
 *       500:
 *         description: Server error
 */
matchingRouter.post(
  "/clients/:clientId/helpers/:helperId",
  assignHelperToClient
);

/**
 * @swagger
 * /api/v1/client-helpers/clients/{clientId}/helpers/{helperId}:
 *   delete:
 *     summary: Unassign a helper from a client
 *     tags: [Client Helpers]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The client ID
 *       - in: path
 *         name: helperId
 *         required: true
 *         schema:
 *           type: string
 *         description: The helper ID
 *     responses:
 *       204:
 *         description: Helper unassigned from client successfully
 *       400:
 *         description: Helper is not assigned to this client
 *       500:
 *         description: Server error
 */
matchingRouter.delete(
  "/clients/:clientId/helpers/:helperId",
  unAssignHelperFromClient
);

module.exports = matchingRouter;
