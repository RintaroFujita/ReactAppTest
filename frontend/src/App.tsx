import React, { useState } from 'react';
import './App.css';

type Task = {
  id: number;
  title: string;
  category: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '' && newCategory.trim() !== '') {
      const task: Task = {
        id: tasks.length + 1,
        title: newTask,
        category: newCategory,
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setNewCategory('');

      if (!categories.includes(newCategory)) {
        setCategories([...categories, newCategory]);
      }
    }
  };

  const handleDeleteTask = (id: number, category: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);

   
    const tasksWithSameCategory = tasks.filter((task) => task.category === category);
    if (tasksWithSameCategory.length === 1 && categories.includes(category)) {
      const updatedCategories = categories.filter((cat) => cat !== category);
      setCategories(updatedCategories);
      setSelectedCategory('All');
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredTasks = selectedCategory === 'All'
    ? tasks
    : tasks.filter((task) => task.category === selectedCategory);

  return (
    <div className="App">
      <header className="App-header">
        <h1>タスク管理アプリ</h1>
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="task-list">
          {filteredTasks.map((task) => (
            <div className="task-item" key={task.id}>
              <span>{task.title}</span>
              <span className="category">{task.category}</span>
              <button onClick={() => handleDeleteTask(task.id, task.category)}>削除</button>
            </div>
          ))}
        </div>
        <div className="task-input">
          <input
            type="text"
            value={newTask}
            onChange={handleInputChange}
            placeholder="タスクを入力"
          />
          <input
            type="text"
            value={newCategory}
            onChange={handleCategoryChange}
            placeholder="カテゴリを入力"
          />
          <button onClick={handleAddTask}>タスクを追加</button>
        </div>
      </header>
    </div>
  );
}

export default App;
