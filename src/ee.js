function ee() {
    let map = { "*": [] };
    let regex = [];
    return {
        emit(e, ...vals) { map[e] ? map[e].forEach(f => f.t ? setTimeout(() => f.f(...vals), f.t) : f(...vals)) : 0; regex.forEach(o => e.match(o.p) == null ? 0 : o.f.t ? setTimeout(() => o.f.f(...vals), o.f.t) : o.f(...vals)); e != "*" ? map["*"].forEach(f => f.t ? setTimeout(() => f.f(e, ...vals), f.t) : f(e, ...vals)) : 0; return this },
        on(e, f, a) { a ? (f = { f: f, t: a ? a : 0 }) : 0; e instanceof RegExp ? regex.push({ p: e, f: f }) : map[e] ? f = map[e].push(f) : (map[e] = []).push(f); return this },
        off(e, f) { let o; e instanceof RegExp ? regex.forEach(i => e.toString() == i.p.toString() && f == i.f || i.f.t != undefined && f == i.f.f ? o = i : 0) || o ? delete regex[regex.indexOf(o)] : 0 : map[e] ? map[e].forEach(i => f == i || i.f.t != undefined && f == i.f.f  ? o = i : 0) || o ? delete map[e][map[e].indexOf(o)] : 0 : 0; return this }
    };
}
if (typeof (module) !== "undefined") module.exports = ee; 