import React, { useState, useEffect, useRef } from "react";

const LootManager = () => {
  const [lootItems, setLootItems] = useState([]);
  const [newItemIndex, setNewItemIndex] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [availableItems, setAvailableItems] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (newItemIndex) {
      fetch(`https://www.dnd5eapi.co/api/magic-items/${newItemIndex}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setSelectedItem({
            index: data.index,
            name: data.name,
            rarity: data.rarity ? data.rarity.name : "Unknown",
            desc:
              data.desc && data.desc.length > 0
                ? data.desc.join("\n")
                : "No description",
          });
        })
        .catch((error) =>
          console.error(`Error fetching details for ${newItemIndex}:`, error)
        );
    }
  }, [newItemIndex]);

  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/magic-items")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.results) {
          throw new Error("Invalid API response format");
        }

        const itemsArray = data.results.map((item) => ({
          index: item.index,
          name: item.name,
        }));

        setAvailableItems(itemsArray);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const addLootItem = () => {
    if (selectedItem) {
      setLootItems([...lootItems, selectedItem]);
      setNewItemIndex("");
      setSelectedItem(null);
    }
  };

  const handleInputChange = (value) => {
    setNewItemIndex(value);
    if (value) {
      const filteredItems = availableItems.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setPredictions(filteredItems);
    } else {
      setPredictions([]);
    }
  };

  const handlePredictionClick = (index) => {
    const selectedPrediction = predictions[index];
    inputRef.current.value = selectedPrediction.name;
    setNewItemIndex(selectedPrediction.index);
    setPredictions([]);
  };

  return (
    <div className="loot-manager-table">
      <h2>Loot Manager</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Rarity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {lootItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.rarity}</td>
              <td>{item.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Add New Item</h3>
        <label>
          Select Item:
          <input
            ref={inputRef}
            type="text"
            value={newItemIndex}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          {predictions.length > 0 && (
            <div>
              <ul>
                {predictions.map((item, index) => (
                  <li key={index} onClick={() => handlePredictionClick(index)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </label>
        <button onClick={addLootItem}>Add Item</button>
      </div>
    </div>
  );
};

export default LootManager;
