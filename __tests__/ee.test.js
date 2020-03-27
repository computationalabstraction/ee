const ee = require("../src/ee");

test('Creating emitter', () => {
    let em1 = ee();
    let keys = Object.keys(em1);
    expect(keys).toContain("on");
    expect(typeof (em1.on)).toMatch(/function/);
    expect(keys).toContain("off");
    expect(typeof (em1.off)).toMatch(/function/);
    expect(keys).toContain("emit");
    expect(typeof (em1.emit)).toMatch(/function/);
});

test('on method', () => {
    let em1 = ee();
    let g = 0;
    em1.on("*", () => g++);
    let i = 0;
    em1.on("one", () => i++)
        .emit("one")
        .emit("one");
    expect(i).toBe(2);
    i = 0;
    em1.on(/one[1-9]/, () => i++)
        .emit("one1")
        .emit("one2")
        .emit("one3");
    let p1 = new Promise(resolve => {
        em1.on("async", resolve, 500);
    });
    let p2 = new Promise(resolve => {
        em1.on(/async/, resolve, true);
    });
    let p3 = new Promise(resolve => {
        em1.on("async", resolve, process.nextTick);
    });
    let p4 = new Promise(resolve => {
        em1.on(/async/, resolve, process.nextTick);
    });
    let gp1 = new Promise(resolve => {
        em1.on("*", resolve, true);
    });
    let gp2 = new Promise(resolve => {
        em1.on("*", resolve, process.nextTick);
    });
    em1.emit("async", true);
    expect(i).toBe(3);
    expect(g).toBe(6);

    return Promise.all(
    [
        expect(p1).resolves.toBe(true),
        expect(p2).resolves.toBe(true),
        expect(p3).resolves.toBe(true),
        expect(p4).resolves.toBe(true),
        expect(gp1).resolves.toBe("async"),
        expect(gp2).resolves.toBe("async")
    ]);
});

test('off method', () => {
    let em1 = ee();
    let g = 0;
    let gf = () => g++;
    em1.on("*", gf);
    em1.emit("1").emit("2").emit("3");
    expect(g).toBe(3);
    em1.off("*", gf).emit("1");
    expect(g).toBe(3);
    let i = 0;
    let iff = () => i++;
    em1.on("one", iff)
        .emit("one")
        .emit("one");
    expect(i).toBe(2);
    em1.off("one", iff).emit("one");
    expect(i).toBe(2);
    i = 0;
    em1.on(/one[1-9]/, iff)
        .emit("one1")
        .emit("one2")
        .emit("one3");
    let a = 0;
    let b = 0;
    let f1;
    let f2;
    let p = new Promise(resolve => {
        f1 = () => ++a;
        f2 = () => ++a && resolve(true);
        em1.on("async", f1, true);
        em1.on(/async/, f2, true);
    });
    em1.emit("async");
    expect(i).toBe(3);
    em1.off(/one[1-9]/, iff).emit("one1");
    expect(i).toBe(3);
    return expect(p.then((v) => {
        em1.off("async", f1);
        em1.off(/async/, f2);
        em1.on("async",()=>b++);
        em1.emit("async");
        return [a,b];
    })).resolves.toEqual([2,1]);
});

test("emit method", () => {
    let em1 = ee();
    let g = [];
    em1.on("*", (name, v) => { g[0] = name; g[1] = v });
    em1.emit("one", 10);
    em1.emit("one", 20);
    expect(g).toContain("one");
    expect(g).toContain(20);
    let i = 0;
    em1.on("one", v => i += v)
        .emit("one", 1)
        .emit("one", 2);
    expect(i).toBe(3);
    expect(g).toContain("one");
    expect(g).toContain(2);
    i = 0;
    em1.on(/one[1-9]/, v => i += v)
        .emit("one1", 10)
        .emit("one2", 20)
        .emit("one3", 30);
    expect(i).toBe(60);
    expect(g).toContain("one3");
    expect(g).toContain(30);
});