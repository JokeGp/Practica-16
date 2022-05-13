const express = require("express"); // importmos la dependencia
const app = express(); // declaramos una app de express

const port = process.env.PORT || 3000; //setteamos el puerto para que escuche el servidor

app.use("/assets", express.static(__dirname + "/public")); // le decimos a la app que tuilize de directorio virtual statico nuestro directorio local de nombre public

//app.use();

app.set("view engine", "ejs");

//primera ruta (esta al nivel de la raiz /), hello world!
app.get("/", function (req, res) {
  res.send(
    `<html><head><link href=assets/style.css type=text/css rel=stylesheet /></head>
    <body><h1>hello world!</h1></body></html>`
  );
  // modificamos el html de la ruta raiz para agregarle la referencia a
  // nuestro archivo CSS con nuestros estilos
});

app.get(`/person/:id`, (req, res) => {
  res.render("person", {
    ID: req.params.id,
    // Querystring: req.query.qrst,
    SMS: req.query.message,
    TIME: req.query.time,
  });
});

app.get(`/student`, (req, res) => {
  res.render(`index`);
});

app.post("/student",express.urlencoded({ extended: false }),(req, res) => {
  res.send(`Fisrt Name es ${req.body.fname}, Last Name es: ${req.body.lname}`);
});


app.post(`/personjson`, express.json({ type: `*/*` }), (req, res) => {
  console.log(`Object contains`, (req.body));
  console.log(`Nombre:`, req.body.firstName);
  console.log(`Apellido`, req.body.lastName);
});

app.listen(port); //levantar el server y ponerlo en escucha
