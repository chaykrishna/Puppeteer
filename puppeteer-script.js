const puppeteer = require('puppeteer');

(async () => {
    const url = 'https://example.com/'; // Replace with the actual website URL
    const maxRetries = 50; // Max number of retries (increase if needed)
    const waitTime = 10000; // Time between retries in milliseconds (10 seconds)

    let retries = 0;

    while (retries < maxRetries) {
        try {
            console.log(`Attempt ${retries + 1}: Trying to access the website...`);

            const browser = await puppeteer.launch({ headless: false }); // Open visible browser
            const page = await browser.newPage();
            await page.goto(url, { timeout: 30000, waitUntil: 'domcontentloaded' });

            console.log("Website is now online and loaded successfully!");
            await page.waitForTimeout(60000); // Keep the browser open for 60 seconds
            await browser.close();
            break; // Exit the loop when successful
        } catch (error) {
            console.error(`Attempt ${retries + 1} failed: ${error.message}`);
            retries++;
            if (retries < maxRetries) {
                console.log(`Retrying in ${waitTime / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, waitTime)); // Wait before retrying
            } else {
                console.error("Website is still down after maximum retries.");
            }
        }
    }
})();
