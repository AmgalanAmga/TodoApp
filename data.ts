export type TTodo = {
  id: number;
  task: String;
  completed: Boolean;
};

export const todos: TTodo[] = [
  {
    id: 1,
    task: 'task1',
    completed: false,
  },
  {
    id: 2,
    task: 'task2',
    completed: true,
  },
  {
    id: 3,
    task: 'task3',
    completed: false,
  },
  {
    id: 4,
    task: 'task4',
    completed: true,
  },
];
