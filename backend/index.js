const express = require("express"); //importing express for creating server , handle req's(GET,POST..), cors
const cors = require("cors"); //Cross-Origin Resource Sharing (Gives different Ports-5000not 5173)

const app = express(); //server obj 
app.use(core());
app.use(express.json()); //convert incoming JSON => js OBJ

app.post("api/leads",(req, res) =>{
    console.log(req.body);
    res.json({ message: "Lead received" });
});
app.listen(5000, () => {
    console.log("server running on : 5000 port")
})