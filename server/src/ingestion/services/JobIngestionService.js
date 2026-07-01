const RemoteOkAdapter = require("../adapters/RemoteOkAdapter");
const SnapshotRepository = require("../../persistence/SnapshotRepository");

class JobIngestionService {
  constructor() {
    this.remoteOkAdapter = new RemoteOkAdapter();
  }

  async ingestRemoteOkJobs() {
    try {
      // Fetch & normalize jobs
      const jobs = await this.remoteOkAdapter.fetchJobs();

      // Save immutable snapshot
      const snapshotId = await SnapshotRepository.saveSnapshot(
        "remoteok",
        jobs
      );

      return {
        success: true,
        source: "remoteok",
        snapshotId,
        jobCount: jobs.length,
        jobs,
      };
    } catch (error) {
      console.error("Job Ingestion Error:", error);

      throw new Error(error.message);
    }
  }
}

module.exports = new JobIngestionService();