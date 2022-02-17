async function wait(waitInMilliseconds) {
    await browser.sleep(waitInMilliseconds);
  };

  module.exports = wait;