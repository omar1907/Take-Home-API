const express = require("express");
const clientRouter = express.Router();

const {
  createClient,
  getAllClients,
  getClinetById,
  updateClient,
  deleteClient,
  getClinetWithHelpers,
} = require("../controllers/clientController");

// Route to create a new client
/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management API
 */

/**
 * @swagger
 * /api/v1/clients:
 *   post:
 *     summary: Create a new client
 *     description: This endpoint creates a new client.
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 example: 123-456-7890
 *               city:
 *                 type: string
 *                 example: New York
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       500:
 *         description: Internal Server Error
 */
clientRouter.post("/", createClient);

// Route to get all clients with pagination and search
/**
 * @swagger
 * /api/v1/clients:
 *   get:
 *     summary: Get all clients
 *     description: This endpoint retrieves all clients with pagination and optional search.
 *     tags: [Clients]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of records per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by client name or email
 *     responses:
 *       200:
 *         description: List of all clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Client'
 *                 total:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *                 current_page:
 *                   type: integer
 *       500:
 *         description: Server error
 */
clientRouter.get("/", getAllClients);

// Route to handle get, update, and delete a client by ID
/**
 * @swagger
 * /api/v1/clients/{clientId}:
 *   get:
 *     summary: Get client by ID
 *     description: This endpoint retrieves a client by its ID.
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the client
 *     responses:
 *       200:
 *         description: Client details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
clientRouter.get("/:clientId", getClinetById);

/**
 * @swagger
 * /api/v1/clients/{clientId}:
 *   put:
 *     summary: Update client by ID
 *     description: This endpoint updates a client's details by its ID.
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 example: 123-456-7890
 *               city:
 *                 type: string
 *                 example: New York
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
clientRouter.put("/:clientId", updateClient);

/**
 * @swagger
 * /api/v1/clients/{clientId}:
 *   delete:
 *     summary: Delete client by ID
 *     description: This endpoint deletes a client by its ID.
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the client
 *     responses:
 *       204:
 *         description: Client deleted successfully
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
clientRouter.delete("/:clientId", deleteClient);

// Route to get a client with related helpers
/**
 * @swagger
 * /api/v1/clients/{clientId}/helpers:
 *   get:
 *     summary: Get client with related helpers
 *     description: This endpoint retrieves a client with their related helpers.
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the client
 *     responses:
 *       200:
 *         description: Client with helpers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client:
 *                   $ref: '#/components/schemas/Client'
 *                 helpers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Helper'
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */

clientRouter.get("/:clientId/helpers", getClinetWithHelpers);

module.exports = clientRouter;
