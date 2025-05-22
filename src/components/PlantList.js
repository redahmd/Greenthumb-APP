import React from "react";

const PlantList = ({ plants, onDeletePlant, onEditPlant }) => {
  return (
    <div>
      <h2>🌱 Liste des plantes</h2>
      {plants.length === 0 ? (
        <p>Aucune plante ajoutée pour le moment.</p>
      ) : (
        <ul>
          {plants.map((plant, index) => (
            <li key={index}>
              <strong>{plant.name}</strong> - {plant.description}
              <button
                onClick={() => onEditPlant(index)}
                style={{ marginLeft: "10px", color: "blue" }}
              >
                Modifier
              </button>
              <button
                onClick={() => onDeletePlant(index)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlantList;
