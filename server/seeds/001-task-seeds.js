/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').truncate()
  await knex('tasks').insert([
    {
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      priority: 'medium',
      assignee: 'John Doe'
  },  
  {
      title: 'Task 2',
      description: 'Description 2',
      status: 'pending',
      priority: 'low',
      assignee: 'minecraft man'
  },
  {
      title: 'Task 3',
      description: 'Description 3',
      status: 'pending',
      priority: 'high',
      assignee: 'LBJ'
  }
  ]);
};
