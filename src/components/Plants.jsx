import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, getDoc } from 'firebase/firestore'; // Import the necessary Firebase Firestore functions
import { getUrl, getAnimal } from '../firebase';

const Plants = ({ firebaseApp }) => {
    const [plants, setPlants] = useState([]);
    const [plantUrls, setPlantUrls] = useState([]);
    const [animals, setAnimals] = useState(null);

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

        // Fetch animals for each plant
        const animalPromises = plantsData.map(async (plant) => {
            const animalReferences = plant.animalReferences; // Assuming this is the field in your plant document
            const animalDataPromises = animalReferences.map(async (animalRef) => {
                const animalDoc = await getDoc(animalRef);
                return {
                    id: animalDoc.id,
                    ...animalDoc.data(),
                };
            });
            return Promise.all(animalDataPromises);
        });

        const animalsData = await Promise.all(animalPromises);
        setAnimals(animalsData);
    };

    async function getAnimal(ref) {
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

    useEffect(() => {
        getImgUrls();
    }, [plants]);
    
    return (
        <div className="plants">
            <h2>My Plants:</h2>
            {
                <div className="all-plants">
                {plants.map((plant, index) => (
                    <div className="plant-name" key={plant.name}>
                        {plant.name}
                        <div className="plant-animals">
                            {console.log(animals)}
                        </div>
                        <img className="plant-image" src={plantUrls[index]} alt=''  />
                    </div>
                ))}
            </div>
            }
            
        </div>
    );
};

export default Plants;
