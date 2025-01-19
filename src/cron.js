const cron = require('node-cron');
const fetchTopStories = require('./scraper');

// Schedule scraping every 5 minutes
function startCronJob() {
  cron.schedule('*/5 * * * *', () => {
    console.log('Running scraper...');
    fetchTopStories();
  });
}

module.exports = startCronJob;
