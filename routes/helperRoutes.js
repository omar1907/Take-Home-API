const express = require("express");
const helperRouter = express.Router();

const {
  createHelper,
  getAllHelpers,
  getHelperById,
  updateHelper,
  deleteHelper,
  getHelperWithClients,
} = require("../controllers/helperController");

// Route to create a new helper
/**
 * @swagger
 * tags:
 *   name: Helpers
 *   description: Helper management API
 */

/**
 * @swagger
 * /api/v1/helpers:
 *   post:
 *     summary: Create a new helper
 *     tags: [Helpers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - city
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: jane.doe@example.com
 *               phone:
 *                 type: string
 *                 example: "+0987654321"
 *               city:
 *                 type: string
 *                 example: Los Angeles
 *     responses:
 *       201:
 *         description: Helper created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Helper'
 *       500:
 *         description: Internal server error
 */
helperRouter.post("/", createHelper);

// Route to get all helpers with pagination and search
/**
 * @swagger
 * /api/v1/helpers:
 *   get:
 *     summary: Get all helpers with pagination and search
 *     tags: [Helpers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of results
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term (helper name or email)
 *     responses:
 *       200:
 *         description: List of helpers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Helper'
 *                 total:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *                 current_page:
 *                   type: integer
 *       500:
 *         description: Server error
 */
helperRouter.get("/", getAllHelpers);

// Route to handle get, update, and delete a helper by ID
/**
 * @swagger
 * /api/v1/helpers/{helperId}:
 *   get:
 *     summary: Get helper by ID
 *     tags: [Helpers]
 *     parameters:
 *       - in: path
 *         name: helperId
 *         required: true
 *         schema:
 *           type: string
 *         description: The helper ID
 *     responses:
 *       200:
 *         description: Helper data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Helper'
 *       404:
 *         description: Helper not found
 *       500:
 *         description: Server error
 */
helperRouter.get("/:helperId", getHelperById);

/**
 * @swagger
 * /api/v1/helpers/{helperId}:
 *   put:
 *     summary: Update helper by ID
 *     tags: [Helpers]
 *     parameters:
 *       - in: path
 *         name: helperId
 *         required: true
 *         schema:
 *           type: string
 *         description: The helper ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: Helper updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Helper'
 *       404:
 *         description: Helper not found
 *       500:
 *         description: Server error
 */
helperRouter.put("/:helperId", updateHelper);

/**
 * @swagger
 * /api/v1/helpers/{helperId}:
 *   delete:
 *     summary: Delete helper by ID
 *     tags: [Helpers]
 *     parameters:
 *       - in: path
 *         name: helperId
 *         required: true
 *         schema:
 *           type: string
 *         description: The helper ID
 *     responses:
 *       204:
 *         description: Helper deleted successfully
 *       404:
 *         description: Helper not found
 *       500:
 *         description: Server error
 */
helperRouter.delete("/:helperId", deleteHelper);

// Route to get a helper with their related clients
/**
 * @swagger
 * /api/v1/helpers/{helperId}/clients:
 *   get:
 *     summary: Get helper with their related clients
 *     tags: [Helpers]
 *     parameters:
 *       - in: path
 *         name: helperId
 *         required: true
 *         schema:
 *           type: string
 *         description: The helper ID
 *     responses:
 *       200:
 *         description: Helper with clients data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HelperWithClients'
 *       404:
 *         description: Helper not found
 *       500:
 *         description: Server error
 */
helperRouter.get("/:helperId/clients", getHelperWithClients);

module.exports = helperRouter;
