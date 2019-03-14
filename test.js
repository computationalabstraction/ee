const ee = require("./ee");

let em1 = ee();

if(em1.emit && em1.on)
{
    if(em1.emit instanceof Function && em1.on instanceof Function)
    {

        let handler = () => console.log("Event Emitting working properly");
        em1.on("one",handler);
        em1.emit("one");
        em1.on("two", (v) => console.log("Receiving Value Properly: ",v));
        em1.emit("two",10);
        let n = 0;
        handler = () => n++;
        em1.on("three",handler);
        em1.on("three",handler);
        em1.on("three",handler);
        em1.on("three",handler);
        em1.emit("three");
        if(n == 4)
        {
            console.log("Multiple Handlers Working Properly");
        }
        else
        {
            console.log("Multiple Handlers Not Working Properly");
        }
    }
    else
    {
        console.log("Event Emitter Not Created Properly");
    }
}
else
{
    console.log("Event Emitter Not Created Properly");
}