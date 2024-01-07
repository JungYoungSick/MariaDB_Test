const express = require("express");
const next = require("next");
const mysql = require("mysql"); //! npm install mysql 2
const Result = require("postcss/lib/result");
const isDev = process.env.NODE_ENV !== 'development';
const app = next({ dev: isDev });
const handle = app.getRequestHandler()

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1216",
  database: "cart"
});

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }))

  server.post("/input", (req, res) => {
    const { name, id, password } = req.body;
    const queryStr = "Insert Into users (name, id, password) Values (?, ?, ?)"
    connection.query(queryStr, [name, id, password], (err, result, filds) => {
      if (err) {
        console.error("Error singing up:", err);
        res.status(500).json({ massage: "회원가입에 실패했습니다." });
        return
      }
      res.status(200).json({ massage: "회원가입이 완료되었습니다." });
    });
  });
  server.all('*', (req, res) => {
    return handle(req, res);
  });
  const port = 3228;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`http://localhost:${port}`)
  })
});
