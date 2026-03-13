const https=require('https'),{URL}=require('url');
const KEY='ABA41DE4-119F-3287-811B-B8CBA6E2BD30';
function fetch(u){return new Promise((ok,fail)=>{const p=new URL(u);https.request({hostname:p.hostname,path:p.pathname+p.search,headers:{'User-Agent':'curl/8.7.1'}},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>ok(d||'{}'));}).on('error',fail).end();});}
module.exports=async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  const a=encodeURIComponent(req.query.address||''),t=req.query.type||'road';
  const u=`https://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${a}&refine=true&simple=false&format=json&type=${t}&key=${KEY}`;
  try{res.setHeader('Content-Type','application/json');res.end(await fetch(u));}
  catch(e){res.status(500).end(JSON.stringify({error:e.message}));}
};
