const mysql = require("mysql2/promise");
require("dotenv").config();
require("colors")


var resp = {
    triveous_assignment: null
  };
  
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    timezone: "Z",
    connectionLimit: 10 // Adjust the connection limit as per your requirement
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'placed', 'shipped', 'delivered') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`;

(async () => {
    let connection;
    try {
      // Get a connection from the pool
      connection = await pool.getConnection();
      console.log("Connected to MySQL server".bgGreen);
  
      // Execute the table creation query
      await connection.query(createTableQuery);
  
      console.log("Tables created successfully".bgCyan);
    } catch (error) {
      console.error(`Error creating tables: ${error.message}`.bgRed);
    } finally {
      // Release the connection back to the pool
      if (connection) connection.release();
    }
  })();





































// var resp = {
//     triveous_assignment : null
// }

// const connection = mysql.createConnection({
//     host : process.env.MYSQL_HOST,
//     user : process.env.MYSQL_USERNAME,
//     password : process.env.MYSQL_PASSWORD,
//     database : process.env.MYSQL_DATABASE,
//     timezone : "Z",
//     dateString : true
// });


// const connectToDB = async (dbName="triveous_assignment")=>{
//     const connection = await mysql.createConnection(config[dbName]);
//     return connection;
// };

// module.exports.initDB = async (dbName="triveous_assignment")=>{
//     resp[dbName] = await connectToDB(dbName);
// };


// module.exports.executeQuery = async (query, placeholders, dbName="triveous_assignment")=>{
//     if(!resp[dbName]){
//         await this.initDB(dbName);
//     }
//     const [results,fields] = await resp[dbName].execute(query,placeholders);
//     return results;
// }