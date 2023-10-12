import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import the necessary Firebase Firestore functions

const Plants = ({ firebaseApp }) => {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore(firebaseApp); // Get Firestore instance from firebaseApp
            const plantsCollection = collection(db, 'plants'); // Reference to the "Plants" collection
            const querySnapshot = await getDocs(plantsCollection); // Fetch the documents in the collection

            // Convert the querySnapshot to an array of plant objects
            const plantsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setPlants(plantsData); // Update the state with the fetched plants
        };

        fetchData();
    }, [firebaseApp]);

    return (
        <div>
            <h2>My Plants:</h2>
            <div>
                {plants.map((plant) => (
                    <div key={plant.name}>
                        {plant.name}
                        <div>
                            {plant.animals.map((animal, index) => (
                                <div key={index}>{animal}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Plants;
