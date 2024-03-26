const { Pool } = require('pg');

// Directly define your database connection details here
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_db',
  password: 'password',
  port: 5432,
});

const viewDepartments = async () => {
  const res = await pool.query('SELECT * FROM department');
  console.table(res.rows);
};

const viewRoles = async () => {
  const res = await pool.query('SELECT * FROM role');
  console.table(res.rows);
};

const viewEmployees = async () => {
  const res = await pool.query('SELECT * FROM employee');
  console.table(res.rows);
};

const addDepartment = async (name) => {
  const res = await pool.query('INSERT INTO department(name) VALUES($1) RETURNING *', [name]);
  console.log(`Added new department: ${res.rows[0].name}`);
};

const addRole = async (title, salary, departmentId) => {
  const res = await pool.query('INSERT INTO role(title, salary, department_id) VALUES($1, $2, $3) RETURNING *', [title, salary, departmentId]);
  console.log(`Added new role: ${res.rows[0].title}`);
};

const addEmployee = async (firstName, lastName, roleId, managerId) => {
  const res = await pool.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
  console.log(`Added new employee: ${res.rows[0].first_name} ${res.rows[0].last_name}`);
};

const updateEmployeeRole = async (employeeId, newRoleId) => {
  const res = await pool.query('UPDATE employee SET role_id = $2 WHERE id = $1 RETURNING *', [employeeId, newRoleId]);
  console.log(`Updated employee role: ${res.rows[0].first_name} ${res.rows[0].last_name}`);
};

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
