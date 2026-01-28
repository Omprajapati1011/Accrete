// db.js
import mysql from 'mysql2';


// Create a connection object with your MySQL credentials
const connection = mysql.createConnection({
  host: 'localhost',      
  user: 'root',         
  password: 'root',
  database: 'todo_list'      
});

// Test the connection
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});


// connection.query('SELECT * FROM users where name = "om@123" ', function (err, results) {
//      if (err) {
//     console.error('Query failed', err.message);
//     return;
//   }
//   console.log(results); 
// });

export default connection;