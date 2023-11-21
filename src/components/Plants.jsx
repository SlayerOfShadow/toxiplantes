import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, getDoc } from 'firebase/firestore'; // Import the necessary Firebase Firestore functions
import { getUrl } from '../firebase';
import { Link, Route } from 'react-router-dom';

const Plants = ({ firebaseApp }) => {
    const [plants, setPlants] = useState([]);
    const [plantUrls, setPlantUrls] = useState([]);
    const [animalNames, setAnimalNames] = useState([[]]);

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

    const getAnimal = async (ref) => {
        try {
            const snapshot = await getDoc(ref);
            if (snapshot.exists) {
                const animalData = snapshot.data();
                const animalName = animalData.name;
                return animalName;
            } else {
                console.log("Document does not exist");
                return null;
            }
        } catch (error) {
            console.error("Error getting document:", error);
            return null;
        }
    }

    useEffect(() => {
        fetchData();
    }, [firebaseApp]);

    const getImgUrls = async () => {
        const imgUrls = [];
        for (const plant of plants) {
            const url = await getUrl(plant.imageUrl);
            imgUrls.push(url);
        }
        setPlantUrls(imgUrls);
    };

    const fetchAnimalNames = async () => {
        const names = await Promise.all(
            plants.map(async (plant) => {
                const animalNamesForPlant = await Promise.all(
                    plant.animals.map(async (animalRef) => await getAnimal(animalRef))
                );
                return animalNamesForPlant;
            })
        );
        setAnimalNames(names);
    };

    useEffect(() => {
        getImgUrls();
        fetchAnimalNames();
    }, [plants]);
    
    return (
        <div className="plants">
            <h2>My Plants:</h2>
            <div className="all-plants">
                {plants.map((plant, index) => (
                    <div className="plant-name" key={plant.name}>
                        {plant.name}
                        <div className="plant-animals">
                            {animalNames[index] && (
                                <ul>
                                    {animalNames[index].map((animal, animalIndex) => (
                                        <li key={animalIndex}>{animal}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <img className="plant-image" src={plantUrls[index]} alt='' />
                    </div>
                ))}
                <Link to="/add-plant">
                    <button>ADD A PLANT</button>
                </Link>
            </div>
        </div>
    );
};

export default Plants;
