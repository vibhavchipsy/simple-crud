import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './styles/App.scss';
import './App.css';

function App() {
  // Initializing form methods and state from react-hook-form
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // State to hold items and the current index being edited
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Form submission handler
  const onSubmit = (data) => {
    console.log("Form data on submit:", data); // Log form data
    console.log("Current items:", items); // Log items array before updating
    console.log("Edit index before submit:", editIndex); // Log the current edit index

    if (editIndex !== null) {
      // If editing, update the item in the list
      const updatedItems = [...items];
      updatedItems[editIndex] = data;
      setItems(updatedItems);
      console.log("Updated items after edit:", updatedItems); // Log updated items list
    } else {
      // If creating a new item
      setItems([...items, data]);
      console.log("Items after new creation:", [...items, data]); // Log items list after adding a new item
    }

    setEditIndex(null); // Reset edit index
    reset(); // Reset form fields after submission
    console.log("Form reset, editIndex reset to null"); // Log that the form was reset
  };

  // Handle editing an item
  const handleEdit = (index) => {
    console.log("Editing item at index:", index); // Log the index being edited
    setEditIndex(index);
    reset(items[index]); // Populate form with item values
    console.log("Form fields populated with:", items[index]); // Log the values populated into the form
  };

  // Handle deleting an item
  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
    console.log("Deleted item at index:", index); // Log the index being deleted
    console.log("Remaining items after deletion:", items.filter((_, i) => i !== index)); // Log items after deletion
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
