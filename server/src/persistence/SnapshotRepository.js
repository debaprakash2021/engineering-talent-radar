const { getDatabase } = require("../config/database");

const COLLECTION_NAME = "snapshots";

class SnapshotRepository {
  constructor() {
    this.collection = null;
  }

  getCollection() {
    if (!this.collection) {
      const db = getDatabase();
      this.collection = db.collection(COLLECTION_NAME);
    }

    return this.collection;
  }

  async saveSnapshot(source, jobs) {
    const collection = this.getCollection();

    const snapshot = {
      date: new Date().toISOString().split("T")[0],
      source,
      jobCount: jobs.length,
      jobs,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(snapshot);

    return result.insertedId;
  }

  async getLatestSnapshot(source) {
    const collection = this.getCollection();

    return await collection.findOne(
      { source },
      {
        sort: {
          createdAt: -1,
        },
      }
    );
  }

  async getSnapshotsBySource(source) {
    const collection = this.getCollection();

    return await collection
      .find({ source })
      .sort({ createdAt: -1 })
      .toArray();
  }

  async getSnapshotByDate(source, date) {
    const collection = this.getCollection();

    return await collection.findOne({
      source,
      date,
    });
  }
}

module.exports = new SnapshotRepository();