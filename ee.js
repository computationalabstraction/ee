function ee()
{
    let map = {};
    return {
        emit:(e,...vals)=>map[e].forEach(f => f(...vals)),
        on:(e,f)=>map[e]?map[e].push(f):(map[e]=[]).push(f)
    }
}
if(typeof(window)==undefined)module.exports = ee;