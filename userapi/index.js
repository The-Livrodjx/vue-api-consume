var express = require("express")
var cors = require("cors")
var app = express()
var router = require("./routes/routes")
 

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

app.use("/",router);

app.listen(8686,() => {
    console.log("Servidor rodando")
});
