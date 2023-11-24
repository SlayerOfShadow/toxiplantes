import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const AddPlant = () => {
    const [selectCount, setSelectCount] = useState(1);
    const [allAnimals, setAllAnimals] = useState([]);

    const addSelect = () => {
        setSelectCount(selectCount + 1);
    };

    async function getAllAnimals() {
        const db = getFirestore();
      
        try {
          const animalCollection = collection(db, 'animals'); // Replace 'your_collection_name' with the actual name of your collection
      
          const querySnapshot = await getDocs(animalCollection);
      
          const animalNames = [];
      
          querySnapshot.forEach((doc) => {
            const animalData = doc.data();
            // Assuming each document in the collection has a 'name' field
            const animalName = animalData.name;
            animalNames.push(animalName);
          });
      
          setAllAnimals(animalNames);
        } catch (error) {
          console.error('Error getting animals:', error);
          throw error; // You might want to handle the error in a different way based on your application's needs
        }
      }

      useEffect(() => {
        getAllAnimals();
        console.log(allAnimals);
    }, []);

    return (
        <div>
            <form>
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
                                <option value={`dynamicOption1_${index + 1}`}>Animal</option>
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