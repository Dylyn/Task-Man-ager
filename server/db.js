const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite'
  },
  useNullAsDefault: true
});

// Create the tasks table
const createTasksTable = async () => {
  const exists = await db.schema.hasTable('tasks');
  if (!exists) {
    await db.schema.createTable('tasks', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.string('status').defaultTo('pending');
      table.string('priority').defaultTo('medium');
      table.string('assignee');
      table.timestamps(true, true);
    });
    console.log('Tasks table created successfully');
  } else {
    console.log('Tasks table already exists');
  }
};

// Initialize database
const initDatabase = async () => {
  try {
    await createTasksTable();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

module.exports = { db, initDatabase }; 