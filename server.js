const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./database');

const mainMenu = () => {
  inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ],
  }])
  .then((answers) => {
    switch (answers.action) {
      case 'View all departments':
        viewDepartments().then(() => mainMenu());
        break;
      case 'View all roles':
        viewRoles().then(() => mainMenu());
        break;
      case 'View all employees':
        viewEmployees().then(() => mainMenu());
        break;
      case 'Add a department':
        promptForNewDepartment();
        break;
      case 'Add a role':
        promptForNewRole();
        break;
      case 'Add an employee':
        promptForNewEmployee();
        break;
      case 'Update an employee role':
        promptForEmployeeRoleUpdate();
        break;
      case 'Exit':
        console.log('Goodbye!');
        process.exit();
    }
  }).catch(err => console.error(err));
};

const promptForNewDepartment = () => {
  inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'Enter the name of the new department:',
  }])
  .then((answers) => {
    addDepartment(answers.name).then(() => mainMenu());
  });
};

const promptForNewRole = () => {
  // Example prompt, extend with additional prompts for salary and department
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the new role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary of the new role:',
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the department ID for the new role:',
    }
  ])
  .then((answers) => {
    addRole(answers.title, answers.salary, answers.departmentId).then(() => mainMenu());
  });
};

const promptForNewEmployee = () => {
  // Extend with prompts for first name, last name, role ID, and manager ID
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the new employee:',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the new employee:',
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the role ID for the new employee:',
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'Enter the manager ID for the new employee (leave blank if no manager):',
    }
  ])
  .then((answers) => {
    addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId || null).then(() => mainMenu());
  });
};

const promptForEmployeeRoleUpdate = () => {
  // Example prompt, you will need to retrieve employees and roles from the database for better user experience
  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee you want to update:',
    },
    {
      type: 'input',
      name: 'newRoleId',
      message: 'Enter the new role ID for the employee:',
    }
  ])
  .then((answers) => {
    updateEmployeeRole(answers.employeeId, answers.newRoleId).then(() => mainMenu());
  });
};

mainMenu();
