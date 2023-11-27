import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { addPlant } from "../firebase";

const AddPlant = () => {
    const [selectCount, setSelectCount] = useState(1);
    const [allAnimals, setAllAnimals] = useState([]);
    const [allAnimalsRef, setAllAnimalsRef] = useState([]);

    const addSelect = () => {
        setSelectCount(selectCount + 1);
    };

    async function getAllAnimals() {
        const db = getFirestore();
      
        try {
          const animalCollection = collection(db, 'animals'); // Replace 'your_collection_name' with the actual name of your collection
      
          const querySnapshot = await getDocs(animalCollection);
      
          const animalNames = [];
          const animalRefs = [];

          querySnapshot.forEach((doc) => {
            const animalData = doc.data();
            // Assuming each document in the collection has a 'name' field
            const animalName = animalData.name;
            const animalRef = doc.id;

            animalNames.push(animalName);
            animalRefs.push(animalRef);
          });
      
          setAllAnimals(animalNames);
          setAllAnimalsRef(animalRefs);
        } catch (error) {
          console.error('Error getting animals:', error);
          throw error; // You might want to handle the error in a different way based on your application's needs
        }
      }

      useEffect(() => {
        getAllAnimals();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Access the form data
        const formData = new FormData(event.target);
    
        // Get the plant name from the form data
        const name = formData.get('name');

        // Get the animals
        const animals = [];

        // Loop through dynamic selects and add values to the animals array
        for (let index = 1; index <= selectCount; index++) {
            const animalValue = formData.get(`dynamicSelect${index}`);
            animals.push(animalValue);
        }

        addPlant(name, animals);
      };

    return (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name: </label>
              <input type="text" id="name" name="name" />
            </div>
      
            <div className="form-group">
              <label htmlFor="image">Upload Image: </label>
              <input type="file" id="image" name="image" accept="image/*" />
            </div>
      
            <div id="dynamicSelects">
            {[...Array(selectCount)].map((_, index) => (
                <div key={index} className="form-group">
                <label htmlFor={`dynamicSelect${index + 1}`}>{`Animal ${index + 1}: `}</label>
                <select id={`dynamicSelect${index + 1}`} name={`dynamicSelect${index + 1}`}>
                    {allAnimals.map((animal, animalIndex) => (
                    <option key={animalIndex} value={allAnimalsRef[animalIndex]}>
                        {animal}
                    </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
      
            <button type="button" onClick={addSelect}>+</button>
      
            <button type="submit">Add plant</button>
          </form>
        </div>
      );
}
 
export default AddPlant