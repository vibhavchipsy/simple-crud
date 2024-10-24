import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './styles/App.scss';
import './App.css';

function App() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Log the editIndex whenever it changes
  useEffect(() => {
    console.log("Edit index changed:", editIndex);
  }, [editIndex]); // This effect will run whenever editIndex changes

  const onSubmit = (data) => {
    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = data;
      setItems(updatedItems);
    } else {
      setItems([...items, data]);
    }

    setEditIndex(null); // Reset edit index
    reset({
      name: '',
      email: ''
    }); // Reset form fields explicitly to empty
    console.log("Form reset, editIndex reset to null"); // Log that the form was reset
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const itemToEdit = items[index];
    reset({
      name: itemToEdit.name,
      email: itemToEdit.email
    });
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
