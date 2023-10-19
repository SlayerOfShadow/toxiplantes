import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import the necessary Firebase Firestore functions
import { getUrl } from '../firebase';

const Plants = ({ firebaseApp }) => {
    const [plants, setPlants] = useState([]);
    const [plantUrls, setPlantUrls] = useState([]);

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

    useEffect(() => {
        // Once plants data are available, get plants urls
        const getImgUrls = async () => {
            const imgUrls = [];
            for (const plant of plants) {
                const url = await getUrl(plant.imageUrl);
                imgUrls.push(url);
            }
            setPlantUrls(imgUrls);
        };

        getImgUrls();
    }, [plants]);
    
    return (
        <div>
            <h2>My Plants:</h2>
            {
                <div>
                {plants.map((plant, index) => (
                    <div key={plant.name}>
                        {plant.name}
                        <div>
                            {plant.animals.map((animal, index) => (
                                <div key={index}>{animal}</div>
                            ))}
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
