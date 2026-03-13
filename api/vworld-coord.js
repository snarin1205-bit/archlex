const https = require('https');
const { URL } = require('url');
const VWORLD_KEY = 'ABA41DE4-119F-3287-811B-B8CBA6E2BD30';

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
  const { address, type = 'road' } = req.query;
  const addr = encodeURIComponent(address || '');
  const url = `https://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${addr}&refine=true&simple=false&format=json&type=${type}&key=${VWORLD_KEY}`;
  try {
    const data = await fetchUrl(url);
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
  } catch(e) { res.status(500).json({ error: e.message }); }
};
