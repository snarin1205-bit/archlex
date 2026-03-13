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
  const x = parseFloat(req.query.x), y = parseFloat(req.query.y), d = 0.0001;
  const bbox = `${(x-d).toFixed(6)},${(y-d).toFixed(6)},${(x+d).toFixed(6)},${(y+d).toFixed(6)}`;
  const url = `https://api.vworld.kr/req/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=lt_c_lp_pa&bbox=${bbox}&srsname=EPSG:4326&output=application/json&key=${VWORLD_KEY}`;
  try {
    const data = await fetchUrl(url);
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
  } catch(e) { res.status(500).json({ error: e.message }); }
};
