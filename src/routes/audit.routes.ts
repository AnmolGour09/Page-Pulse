/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy
 */

/**
 * @swagger
 * /api/v1/audit:
 *   post:
 *     summary: Audit a website
 *     tags:
 *       - Audit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://github.com
 *     responses:
 *       200:
 *         description: Audit successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     status:
 *                       type: integer
 *                     responseTime:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     images:
 *                       type: integer
 *                     links:
 *                       type: integer
 *                     cached:
 *                       type: boolean
 *
 *       400:
 *         description: Invalid URL
 *
 *       502:
 *         description: Fetch failed
 *
 *       504:
 *         description: Request timeout
 */
import { Router } from "express";
import { auditWebsite } from "../controllers/audit.controller";

const router = Router();

router.post("/", auditWebsite);

export default router;