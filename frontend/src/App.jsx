import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/pets";

function App() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    age: "",
    weight: "",
  });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const res = await axios.get(API_URL);
    setPets(res.data);
    // console.log(pets);
  };
  console.log(pets);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPet = async () => {
    if (!form.name || !form.type) return alert("Fill all fields");
    await axios.post(API_URL, form);
    setForm({ name: "", type: "", age: "", weight: "" });
    fetchPets();
  };

  const deletePet = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchPets();
  };

  return (
    <div className="container">
      <h1>🐾 Pet Health Tracker</h1>

      <div style={{display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center'}} 
  // className="cards-container"
  >
        {pets.map((pet) => (
          <div key={pet._id} className="pet-card">
            <h2>{pet.name}</h2>

            <div className="pet-details">
              <p><strong>Type:</strong> {pet.type}</p>
              <p><strong>Age:</strong> {pet.age}</p>
              <p><strong>Weight:</strong> {pet.weight} kg</p>
            </div>

            <button
              className="btn-delete"
              onClick={() => deletePet(pet._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="form">
        <h2>Add New Pet</h2>

        <input
          name="name"
          placeholder="Pet Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="type"
          placeholder="Pet Type"
          value={form.type}
          onChange={handleChange}
        />

        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />

        <input
          name="weight"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={handleChange}
        />

        <button className="btn-submit" onClick={addPet}>
          Add Pet
        </button>
      </div>
    </div>
  );
}

export default App;
