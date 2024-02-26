**Backend Assignment: Ecommerce API with Node.js**
This project involves building a set of API endpoints to support e-commerce operations using Node.js. It includes functionalities such as product and category listing, product details, cart management, and order processing. The API interacts with an SQL database to manage product/category data, user cart information, and order details. Additionally, token management for user authentication is implemented using JSON Web Tokens (JWT).

**Requirements**
**API Endpoints**
Category Listing: Retrieve a list of categories.
Product Listing: Retrieve a list of products with essential details based on category ID.
Product Details: Fetch detailed information of a specific product by its ID.
Cart Management: Allow users to add products to their cart, view the cart, update quantities, and remove items from the cart.
Order Placement: Handle order placement, allowing users to place an order with products from their cart.
Order History: Fetch the order history for authenticated users.
Order Details: Retrieve detailed information of a specific order by its ID.
User Authentication: Implement APIs for user registration, login, and token generation for authentication.

**Database Integration**
Use any SQL database, preferably MySQL, to store and manage product, category, user, cart, and order data. The API should perform CRUD operations on these database entities.

**User Authentication**
Implement user authentication using JSON Web Tokens (JWT). Users should be able to register, log in, and obtain a token to authenticate API requests. Implement authentication middleware to secure sensitive API endpoints, allowing only authenticated users to access certain functionalities like cart management and order placement.

**Error Handling**
Ensure appropriate error handling is in place throughout the API. Return meaningful error messages and status codes when necessary to improve usability and troubleshooting.

**Usage**
Clone the repository to your local machine.
Install dependencies using npm install.
Set up the SQL database and configure database connection details in the application.
Run the application using npm run server.
Access the API endpoints using a tool like Postman or integrate them into your frontend application.

**API Documentation**
The API documentation including the list of endpoints, request/response formats, and authentication requirements can be found in the API documentation file.

**Technologies Used**
Node.js
Express.js
JSON Web Tokens (JWT)
Bcrypt.js
Morgan
Colors
Sequelize
MySQL2
Postman (for API testing and documentation)
Git and GitHub for version control

**Contributors**
S M Ghulam Ghaus Faiyaz - Developer
