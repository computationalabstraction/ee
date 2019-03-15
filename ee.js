function ee()
{
    let map = {"*":[]};
    let regex = [];
    return {
        emit:(e,...vals)=>{map[e]?map[e].forEach(f => f(...vals)):0;regex.forEach(o=>e.match(o.p)==null?0:o.f(...vals));e!="*"?map["*"].forEach(f=>f(e,...vals)):0},
        on:(e,f)=>e instanceof RegExp?regex.push({p:e,f:f}):map[e]?map[e].push(f):(map[e]=[]).push(f),
        off:(e,f)=>{
            let o;
            if(e instanceof RegExp) {
                for(let i of regex) e.toString()==i.p.toString()&&f==i.f?o=i:0;
                if(o) delete regex[regex.indexOf(o)];
            }
            else if(map[e]) {
                for(let i of map[e]) f==i?o=i:0;
                if(o) delete map[e][map[e].indexOf(o)];
            }
        }
    };
} 
if(typeof(window) === "undefined") module.exports = ee;