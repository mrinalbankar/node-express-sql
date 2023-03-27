const express = require('express')
const app = express()
const mysql = require('mysql')

app.use(
  express.urlencoded({ extended: true }),
  express.json()
);

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'input your password',
  database: 'input your database name'
})

app.post("/create", (req, res) => {
  const name = req.body.name
  const age = req.body.age
  const department = req.body.department
  const position = req.body.position
  const wage = req.body.wage

  db.query("INSERT INTO employees (name, age, department, position, wage) VALUES (?, ?, ?, ?, ?)",
    [name, age, department, position, wage], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("employee created")
      }
    }
  )
})

app.get("/employees", (req, res)=> {
  db.query("SELECT * from employees", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.put("/update/:id", (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const age = req.body.age
  const department = req.body.department
  const position = req.body.position
  const wage = req.body.wage

  db.query("UPDATE employees SET name = ?, age = ?, department = ?, position = ?, wage = ? WHERE id = ?",
  [name, age, department, position, wage, id], (err, result) => {
    if(err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id

  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send("Record deleted")
    }
  })
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})