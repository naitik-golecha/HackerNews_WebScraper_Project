const axios = require('axios');
const cheerio = require('cheerio');
const pool = require('./database');

const HN_URL = 'https://news.ycombinator.com/';

async function scrapeHackerNews() {
  try {
    // Fetch the HTML content from Hacker News
    const { data: html } = await axios.get(HN_URL);

    // Load the HTML into cheerio
    const $ = cheerio.load(html);

    // Extract story details
    const stories = [];
    $('.athing').each((_, element) => {
      const title = $(element).find('.titleline > a').text();
      const url = $(element).find('.titleline > a').attr('href') || '';
      const author = $(element).next().find('.hnuser').text();
      const points = parseInt($(element).next().find('.score').text().replace(' points', ''), 10) || 0;

      stories.push({ title, url, author, points });
    });

    // Save stories into MySQL
    const connection = await pool.getConnection();
    for (const story of stories) {
      await connection.query(
        `INSERT IGNORE INTO stories (title, url, author, points) VALUES (?, ?, ?, ?)`,
        [story.title, story.url, story.author, story.points]
      );
    }
    connection.release();

    console.log(`${stories.length} stories scraped and saved successfully!`);
  } catch (error) {
    console.error('Error scraping Hacker News:', error.message);
  }
}

module.exports = scrapeHackerNews;
