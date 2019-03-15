# <img src="https://docs.google.com/drawings/d/e/2PACX-1vSPq_udC6oTFuvUhLAGffrWMsAx_x3NcK9v9DupscmQhwEbjksaNNmNynVdnwSJw2IS05ZyCQV6d2lL/pub?w=372&h=236" />
A **powerful** but **concise** Event Emitter implementation which is about **306B**(Minified and Gzipped) follows the same **interface** and **semantics** of Node.js Event Emitters with some extra features such as *regex based event matching* and *universal handlers*

### `Installation`
If using on `Node.js`
```
npm install conciseee
```
If using on `Browser`
```
<script src="https://unpkg.com/conciseee"></script>
```

### `Usage`
It provides the same interface as Node.js Event Emitters. EE provides an emitter factory through which you can obtain an emitter instance. There are three methods defined on the emitter instance `on(event,handler)`,`off(event,handler)` and `emit(event,...values)`

```javascript
const ee = require("conciseee");
let em1 = ee();

// Basic
em1.on("one",()=>console.log("one"));
em1.emit("one");

// With values
em1.on("two",v => console.log(v));
em1.emit("two","Hello World!");

// Regex based 
em1.on(/one[1-9]/,()=>console.log("1"));
em1.emit("one1");
em1.emit("one4");
em1.emit("one7");

// Removing handlers
let h = ()=>console.log("Remove me!");
em1.on("three",h);
em1.emit("three");
em1.off("three",h);
em1.emit("three");

// Universal Handlers
em1.on("*",e => console.log("Event: "+e));
em1.emit("one");
em1.emit("two");
em1.emit("one5");
em1.emit("x");
em1.emit("y");
```