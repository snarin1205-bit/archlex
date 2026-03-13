const https=require('https'),{URL}=require('url');
const PUB='w+v6AlivQvxuJoO6iA3xxQ65s4Aan9Cm8Nszvh3/69BrQYJSwpT7npR0qGKCR10SwOfs63xhb3tLysuTPiS6dQ==';
function fetch(u){return new Promise((ok,fail)=>{const p=new URL(u);https.request({hostname:p.hostname,path:p.pathname+p.search,headers:{'User-Agent':'curl/8.7.1'}},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>ok(d||'{}'));}).on('error',fail).end();});}
module.exports=async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  const a=encodeURIComponent(req.query.address||''),k=encodeURIComponent(PUB);
  const u=`https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=1&keyword=${a}&confmKey=${k}&resultType=json`;
  try{res.setHeader('Content-Type','application/json');res.end(await fetch(u));}
  catch(e){res.status(500).end(JSON.stringify({error:e.message}));}
};
