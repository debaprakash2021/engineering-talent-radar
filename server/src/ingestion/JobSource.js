/**
 * JobSource
 * ----------
 * Abstract contract for every job provider.
 *
 * Every adapter (RemoteOK, LinkedIn, Greenhouse, Lever, etc.)
 * must extend this class and implement fetchJobs().
 */

class JobSource {
  /**
   * Fetch jobs from a data source.
   *
   * @returns {Promise<Array>}
   */
  async fetchJobs() {
    throw new Error(
      "fetchJobs() must be implemented by the adapter."
    );
  }
}

module.exports = JobSource;