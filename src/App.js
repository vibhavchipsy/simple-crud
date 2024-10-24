import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './styles/App.scss';
import logo from './logo.svg';
import './App.css';

function App() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const onSubmit = (data) => {
    if (editIndex !== null) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[editIndex] = data;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      // Create new item
      setItems([...items, data]);
    }
    reset(); // Reset form fields after submission
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    reset(items[index]);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Simple CRUD App</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && <p>Name is required</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <p>Email is required</p>}
        </div>

        <button type="submit" className="button">
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </form>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} ({item.email}){' '}
            <button className="button" onClick={() => handleEdit(index)}>Edit</button>{' '}
            <button className="button" onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
