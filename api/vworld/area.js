const https=require('https'),{URL}=require('url');
const KEY='ABA41DE4-119F-3287-811B-B8CBA6E2BD30';
function fetch(u){return new Promise((ok,fail)=>{const p=new URL(u);https.request({hostname:p.hostname,path:p.pathname+p.search,headers:{'User-Agent':'curl/8.7.1'}},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>ok(d||'{}'));}).on('error',fail).end();});}
module.exports=async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  const x=+req.query.x,y=+req.query.y,d=0.0001;
  const b=`${(x-d).toFixed(6)},${(y-d).toFixed(6)},${(x+d).toFixed(6)},${(y+d).toFixed(6)}`;
  const u=`https://api.vworld.kr/req/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=lt_c_lp_pa&bbox=${b}&srsname=EPSG:4326&output=application/json&key=${KEY}`;
  try{res.setHeader('Content-Type','application/json');res.end(await fetch(u));}
  catch(e){res.status(500).end(JSON.stringify({error:e.message}));}
};
