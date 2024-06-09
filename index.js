const express = require('express')
const app = express()

app.use(express.json())

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'todo',
  host: 'localhost',
  database: 'postgres',
  password: 'dkafjasdljf',
  port: 5432,
})

const getTasks = (request, response) => {
    pool.query('SELECT * FROM tasks ORDER BY id ASC', (error, results) => {
        if (error) {
        throw error
        }
        let tasks = [];
        response.status(200).json(results.rows.map((row)=> {
            return {
                id:row.id,
                name: row.name,
                description: row.description,
                dateCompleted: row.date_completed
            }
        }))
    })
}

const createTask = (request, response) => {
    const task = request.body
    console.log ('about to run query')
    const result = pool.query('insert into tasks (name, description) values ($1,$2)',[task.name, task.description])
    result.catch((poop)=> {
        console.log (poop)
        res.status(500).end()
    })
    result.then (()=> {
        console.log ('success!')
        response.end()
    })
}

    //TODO: get ID from URL
const editTask = (request, response) => {
    const task = request.body
    console.log ('about to run edit query', task)
    const result = pool.query('update tasks set name =$1, description=$2, date_completed=$3 where id=$4',[task.name, task.description, task.dateCompleted, task.id])
    result.catch((poop)=> {
        console.log (poop)
        res.status(500).end()
    })
    result.then (()=> {
        console.log ('success!')
        response.end()
    })
}

app.get('/api/tasks/', getTasks)

app.post('/api/tasks/', createTask)

app.put('/api/tasks/', editTask)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
