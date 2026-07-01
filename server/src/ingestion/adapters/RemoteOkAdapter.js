const JobSource = require("../JobSource");
const normalizeRemoteOkJob = require("../../normalization/normalizeRemoteOkJob");

class RemoteOkAdapter extends JobSource {
  constructor() {
    super();
    this.apiUrl = "https://remoteok.com/api";
  }

  async fetchJobs() {
    try {
      const response = await fetch(this.apiUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; TalentRadar/1.0)",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `RemoteOK API request failed with status ${response.status}`
        );
      }

      const rawData = await response.json();

      // RemoteOK returns metadata as the first object.
      // Remove it before normalization.
      const jobs = rawData.slice(1);

      return jobs.map(normalizeRemoteOkJob);
    } catch (error) {
      throw new Error(`RemoteOkAdapter Error: ${error.message}`);
    }
  }
}

module.exports = RemoteOkAdapter;