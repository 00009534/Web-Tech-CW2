# **Brief Description**
_This web application was developed by 00009534 student of WIUT to fulfill the requirements of the module.
It does not represent any real company or product._

### Purpose of app:
This application is developed for Human Resource departments to manage their employees.
It allows to have a single database of employees and easily manages them.
In other words it is a light version of kinda CRM system form HR.

### How to run it:
0. Make sure you have NodeJS installed on your machine. If no download it here: https://nodejs.org/en/
1. Clone the solution (all files) to your machine.
2. Open the terminal and navigate to the folder of solution.
3. Type `npm install` to install needed dependencies.
4. Type `npm run build` or `npm run dev` to run the app in production mode or development mode respectively.

## **Installed dependencies:**
### **App deps:**
_express, axios, pug, multer, chart.js_
### **Dev deps:**
_nodemon, @types/express, eslint, eslint-config-google_

### How to use the app:
Firstly when user opens the app he/she enters the main page with general information about
employees.

There is a sidebar navigation with 4 pages. 3 of them are available for any user,
and the last one (Manage Employees) is restricted for non-admins.
Employees page also has some restrictions, like - only Admins can do something with employees or can view the details about employee.

In order to get admin access user needs to log in using Admin's credentials, which are saved in the database.
For Testing purposes credentials are available on login page.

After logging in, user will be allowed to enter certain pages as admin and do some specific actions:
1. Admin can create new employees. _(manage employees page)_
2. Admin can delete employees. _(employees page)_
3. Admins can change information about employees. _(employees page + manage employees page)_
4. Admin can view details of the employee. _(employees page => employee details page)_

### Link to gitHub repository and Glitch:
https://github.com/00009534/Web-Tech-CW2
https://glitch.com/edit/#!/hr-app?path=src%2Fapp.js%3A45%3A0

### Important notes:
When opening this app in development mode, you may face some issues with authorization:
1. After creating new employee, you may be logged out due to nodemon (dev dependency).
Why happens: after making changes to the database (adding new employee) nodemon automatically rebuilds the solution.
   Therefore, login status is also destroyed. **This does not happen in production mode**
   
2. The same issue may happens when user deletes employee or updates.