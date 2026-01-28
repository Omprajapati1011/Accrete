import express from 'express'
import connection from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.static(__dirname));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'om.html'));
});



// get the data
app.get('/todo_list', (req, res) => {
  connection.query('select * from todos', (err, result) => {
     if(err){
        console.log("select query not wrok", err.message);
        return res.status(500).json(err);
     }
     res.json(result);
  });
});




// insert the data
app.post('/todo_list', (req, res) => {
    const {task} = req.body;
  connection.query('insert into todos (task) values (?)', [task], (err, result) => {
     if(err){
        console.log("insert query not wrok", err.message);
        return res.status(500).json(err);
     }
     res.json({message: "task added"});
  });
});


// delete the task
app.delete('/todo_list/:id', (req, res) => {
    connection.query('delete from todos where id = ?', [req.params.id], (err) => {
        if(err){
        console.log("delete query not wrok", err.message);
        return res.status(500).json(err);
     }
     res.json({ message: 'Task deleted' });
    })
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})