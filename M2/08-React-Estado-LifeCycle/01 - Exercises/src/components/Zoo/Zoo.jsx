import React from "react";
// eslint-disable-next-line no-unused-vars
import Animals from "../Animals/Animals";
// eslint-disable-next-line no-unused-vars
import Species from "../Species/Species";
import styledZoo from "./Zoo.module.css";

export default function Zoo() {
    /* Escribe acá tu código */
    let [zoo, setZoo] = React.useState({
        zooName: "",
        animals: [],
        species: [],
        allAnimals: [],
    });

    React.useEffect(() => {
        fetch('http://localhost:3001/zoo')
            .then((res) => res.json())
            .then((data) =>
                setZoo({
                    ...zoo,
                    animals: data.animals,
                    species: data.species,
                    allAnimals: data.animals,
                })
            )
            .catch((error) => console.log(error));
    }, []);

    function handleSpecies(e) {
        const specie = e.target.value;
        setZoo({
            ...zoo,
            animals: zoo.animals.filter((animal) => {
                return animal.specie == specie
            }),
        })
    }

    function handleAllSpecies() {
        setZoo({
            ...zoo,
            animals: zoo.allAnimals
        })
    }

    function handleInputChange(e) {
        const newValue = e.target.value;
        const newZoo = {
            zooName: newValue,
            animals: zoo.animals,
            species: zoo.species,
            allAnimals: zoo.allAnimals
        };
        setZoo(newZoo);
    };


    return (
        <div>

            <div className={styledZoo.divContentTitle}>
                <label>Zoo Name:</label>
                <input
                    type="text"
                    value={zoo.zooName}
                    onChange={handleInputChange}>
                </input>
                <h1 className={styledZoo.title}>{zoo.zooName}</h1>
            </div>

            <div>
                <Species
                    species={zoo.species}
                    handleSpecies={handleSpecies}
                    handleAllSpecies={handleAllSpecies}
                >
                </Species>
            </div>

            <div className={styledZoo.divContent}>
                <Animals animals={zoo.animals}></Animals>
            </div>
        </div >
    );
}
