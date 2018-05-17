const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dataSchema = new Schema(
  {
    countryName: String,
    countryCode: String,
    totalSites: String,
    sites: [
      {
        dataUrl: String,
        localRank: String,
        globalRank: String,
        pageViewsPerMillion: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Data', dataSchema);
