import { useContext, useEffect, useState } from "react";
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore"; // Import the necessary Firebase Firestore functions
import { getUrl } from "../firebase";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/authContext";
import "../styles/plants.scss";

const Plants = ({ firebaseApp }) => {
  const [plants, setPlants] = useState([]);
  const [plantUrls, setPlantUrls] = useState([]);
  const [animalNames, setAnimalNames] = useState([[]]);

  const { authState } = useContext(AuthContext);

  const fetchData = async () => {
    const db = getFirestore(firebaseApp); // Get Firestore instance from firebaseApp
    const plantsCollection = collection(db, "plants"); // Reference to the "Plants" collection
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
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [plants]);

  return (
    <div className="plants">
      <div className="title">
        <h2 className="title-text">Liste des plantes toxiques</h2>
        <p className="title-description">
          Retrouvez ci-dessous une liste de plantes toxiques pour les animaux.
        </p>
      </div>
      <div className="all-plants">
        {plants.map((plant, index) => (
          <div className="plant" key={plant.name}>
            <div className="plant-image">
              {" "}
              <img src={plantUrls[index]} alt={plant.name} />
            </div>

            <p className="plant-name">{plant.name}</p>
            <div className="plant-animals">
              <p>Animaux concernés :</p>
              {animalNames[index] && (
                <ul>
                  {animalNames[index].map((animal, animalIndex) => (
                    <li key={animalIndex}>{animal}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
      {authState && (
        <Link className="add-plant" to="/add-plant">
          <button>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 0C9.44771 0 9 0.447716 9 1V9H1C0.447708 9 0 9.44772 0 10C0 10.5523 0.447708 11 1 11H9V19C9 19.5523 9.44771 20 10 20C10.5523 20 11 19.5523 11 19V11H19C19.5523 11 20 10.5523 20 10C20 9.44772 19.5523 9 19 9H11V1C11 0.447716 10.5523 0 10 0Z"
              />
            </svg>
          </button>
        </Link>
      )}
    </div>
  );
};

export default Plants;
