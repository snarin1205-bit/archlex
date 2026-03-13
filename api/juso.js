const https = require('https');
const { URL } = require('url');
const PUBLIC_KEY = 'w+v6AlivQvxuJoO6iA3xxQ65s4Aan9Cm8Nszvh3/69BrQYJSwpT7npR0qGKCR10SwOfs63xhb3tLysuTPiS6dQ==';

function fetchUrl(u) {
  return new Promise((ok, fail) => {
    const pu = new URL(u);
    https.request({ hostname: pu.hostname, path: pu.pathname + pu.search, headers: { 'User-Agent': 'curl/8.7.1' } }, r => {
      let d = ''; r.on('data', c => d += c); r.on('end', () => ok(d || '{}'));
    }).on('error', fail).end();
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const addr = encodeURIComponent(req.query.address || '');
  const key = encodeURIComponent(PUBLIC_KEY);
  const url = `https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=1&keyword=${addr}&confmKey=${key}&resultType=json`;
  try {
    const data = await fetchUrl(url);
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
  } catch(e) { res.status(500).json({ error: e.message }); }
};
