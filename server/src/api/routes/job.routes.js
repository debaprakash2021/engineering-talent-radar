const express = require("express");

const JobIngestionService = require("../../ingestion/services/JobIngestionService");

const router = express.Router();

/**
 * GET /api/jobs/sync
 *
 * Fetch jobs from RemoteOK,
 * normalize them,
 * store a snapshot,
 * return summary.
 */
router.get("/sync", async (req, res) => {
  try {
    const result = await JobIngestionService.ingestRemoteOkJobs();

    res.status(200).json({
      success: true,
      message: "Snapshot created successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;