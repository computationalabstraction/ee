const ee = require("../src/ee");

test('Creating emitter', () => {
    let em1 = ee();
    let keys = Object.keys(em1);
    expect(keys).toContain("on");
    expect(typeof(em1.on)).toMatch(/function/);
    expect(keys).toContain("off");
    expect(typeof(em1.off)).toMatch(/function/);
    expect(keys).toContain("emit");
    expect(typeof(em1.emit)).toMatch(/function/);
});

test('on method', () => {
    let em1 = ee();
    let g = 0;
    em1.on("*",()=>g++);
    let i = 0;
    em1.on("one",()=>i++)
    .emit("one")
    .emit("one");
    expect(i).toBe(2);
    i = 0;
    em1.on(/one[1-9]/,()=>i++)
    .emit("one1")
    .emit("one2")
    .emit("one3");
    let p1 = new Promise(resolve => {
        em1.on("async",resolve,500);
    });
    let p2 = new Promise(resolve => {
        em1.on(/async/,resolve,true);
    });
    let gp = new Promise(resolve => {
        em1.on("*",resolve,true);
    });
    em1.emit("async",true);
    expect(i).toBe(3);
    expect(g).toBe(6);
    expect(p1).resolves.toBe(true);
    expect(p2).resolves.toBe(true);
    expect(gp).resolves.toBe("async");
});

test('off method', () => {
    let em1 = ee();
    let g = 0;
    let gf = () => g++;
    em1.on("*",gf);
    em1.emit("1").emit("2").emit("3");
    expect(g).toBe(3);
    em1.off("*",gf).emit("1");
    expect(g).toBe(3);
    let i = 0;
    let iff = () => i++;
    em1.on("one",iff)
    .emit("one")
    .emit("one");
    expect(i).toBe(2);
    em1.off("one",iff).emit("one");
    expect(i).toBe(2);
    i = 0;
    em1.on(/one[1-9]/,iff)
    .emit("one1")
    .emit("one2")
    .emit("one3");
    let a = 0;
    let f1;
    let f2;
    let p = new Promise(resolve => {
        f1 = () => ++a;
        f2 = () => ++a && resolve(true);
        em1.on("async",f1,true);
        em1.on(/async/,f2,true);
    });
    em1.emit("async");
    expect(i).toBe(3);
    em1.off(/one[1-9]/,iff).emit("one1");
    expect(i).toBe(3);
    expect(p.then((v) => {
        em1.off("async",f1);
        em1.off(/async/,f2);
        em1.emit("async");
        return a;
    })).resolves.toBe(2);
});

test("emit method",() => {
    let em1 = ee();
    let g = [];
    em1.on("*",(name,v)=>{g[0]=name;g[1]=v});
    em1.emit("one",10);
    em1.emit("one",20);
    expect(g).toContain("one");
    expect(g).toContain(20);
    let i = 0;
    em1.on("one",v=>i+=v)
    .emit("one",1)
    .emit("one",2);
    expect(i).toBe(3);
    expect(g).toContain("one");
    expect(g).toContain(2);
    i = 0;
    em1.on(/one[1-9]/,v=>i+=v)
    .emit("one1",10)
    .emit("one2",20)
    .emit("one3",30);
    expect(i).toBe(60);
    expect(g).toContain("one3");
    expect(g).toContain(30);    
});

// if(em1.emit && em1.on)
// {
//     if(em1.emit instanceof Function && em1.on instanceof Function)
//     {
//         let handler = () => console.log("Event Emitting working properly");
//         em1.on("one",handler);
//         em1.emit("one");

//         em1.off("one",handler);
//         em1.emit("one");

//         em1.on("two", (v) => console.log("Receiving Value Properly: ",v));
//         em1.emit("two",10);

//         let n = 0;
//         handler = () => n++;
//         em1.on("three",handler);
//         em1.on("three",handler);
//         em1.on("three",handler);
//         em1.on("three",handler);
//         em1.emit("three");
//         if(n == 4)
//         {
//             console.log("Multiple Handlers Working Properly");
//         }
//         else
//         {
//             console.log("Multiple Handlers Not Working Properly");
//         }

//         n = 0;
//         em1.on(/one[1-9]/,handler);
//         em1.emit("one1");
//         em1.emit("one4");
//         em1.emit("one7");
//         if(n == 3)
//         {
//             console.log("Regex Handlers Working Properly");
//         }
//         else
//         {
//             console.log("Regex Handlers Not Working Properly");
//         }

//         em1.off(/one[1-9]/,handler);
//         em1.emit("one2");
//         if(n == 3)
//         {
//             console.log("Removing Regex Handlers Working Properly");
//         }
//         else
//         {
//             console.log("Removing Regex Handlers Not Working Properly");
//         }

//         n = 0;
//         em1.on("*",(e)=>{console.log(e);n++});
//         em1.emit("x");
//         em1.emit("y");
//         em1.emit("z");
//         em1.emit("one");
//         if(n == 4)
//         {
//             console.log("Universal Handlers Working Properly");
//         }
//         else
//         {
//             console.log("Universal Handlers Not Working Properly");
//         }
//     }
//     else
//     {
//         console.log("Event Emitter Not Created Properly");
//     }
// }
// else
// {
//     console.log("Event Emitter Not Created Properly");
// }