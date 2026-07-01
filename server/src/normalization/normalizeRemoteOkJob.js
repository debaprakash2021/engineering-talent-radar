/**
 * normalizeRemoteOkJob
 * ---------------------
 * Converts the raw RemoteOK job object into the
 * application's standardized Job model.
 */

function normalizeRemoteOkJob(rawJob) {
  return {
    id: rawJob.id,

    title: rawJob.position,

    company: rawJob.company,

    companyLogo: rawJob.company_logo || null,

    companyLogoUrl: rawJob.company_logo_url || null,

    location: rawJob.location || "Worldwide",

    description: rawJob.description || "",

    applyUrl: rawJob.apply_url || rawJob.url || null,

    tags: Array.isArray(rawJob.tags)
      ? rawJob.tags.map((tag) => tag.toLowerCase().trim())
      : [],

    salaryMin:
      typeof rawJob.salary_min === "number" && rawJob.salary_min > 0
        ? rawJob.salary_min
        : null,

    salaryMax:
      typeof rawJob.salary_max === "number" && rawJob.salary_max > 0
        ? rawJob.salary_max
        : null,

    postedAt: rawJob.date || null,

    source: "remoteok",
  };
}

module.exports = normalizeRemoteOkJob;