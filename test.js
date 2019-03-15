const ee = require("./ee");

let em1 = ee();

if(em1.emit && em1.on)
{
    if(em1.emit instanceof Function && em1.on instanceof Function)
    {
        let handler = () => console.log("Event Emitting working properly");
        em1.on("one",handler);
        em1.emit("one");

        em1.off("one",handler);
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

        n = 0;
        em1.on(/one[1-9]/,handler);
        em1.emit("one1");
        em1.emit("one4");
        em1.emit("one7");
        if(n == 3)
        {
            console.log("Regex Handlers Working Properly");
        }
        else
        {
            console.log("Regex Handlers Not Working Properly");
        }

        em1.off(/one[1-9]/,handler);
        em1.emit("one2");
        if(n == 3)
        {
            console.log("Removing Regex Handlers Working Properly");
        }
        else
        {
            console.log("Removing Regex Handlers Not Working Properly");
        }

        n = 0;
        em1.on("*",(e)=>{console.log(e);n++});
        em1.emit("x");
        em1.emit("y");
        em1.emit("z");
        em1.emit("one");
        if(n == 4)
        {
            console.log("Universal Handlers Working Properly");
        }
        else
        {
            console.log("Universal Handlers Not Working Properly");
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