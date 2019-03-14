# <img src="./ee.png" />
This Event Emitter Implementation is about 152B(Minified and Gizipped) and 158B(Minified).

### `Usage`
It provides the same interface as Node.js Event Emitters so two methods are defined `on(event,handler)` and `emit(event,...values)`

```javascript
const ee = require("ee");
let em1 = ee();
em1.on("one",()=>console.log("one"));
em1.emit("one");
```
