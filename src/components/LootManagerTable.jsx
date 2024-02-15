import React, { useState, useEffect, useRef } from "react";

const LootManager = () => {
  const [lootItems, setLootItems] = useState([]);
  const [newItemIndex, setNewItemIndex] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [availableItems, setAvailableItems] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (newItemIndex) {
      const [category, itemIndex] = newItemIndex.split("/");
      let apiUrl = "";

      if (category === "magic-items" || category === "equipment") {
        apiUrl = `https://www.dnd5eapi.co/api/${category}/${itemIndex}`;
      } else {
        console.error("Invalid category:", category);
        return;
      }

      fetch(apiUrl)
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
            desc:
              data.desc &&
              (Array.isArray(data.desc) && data.desc.length > 0
                ? data.desc.join("\n")
                : data.desc),
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

        const magicItems = data.results.map((item) => ({
          index: `magic-items/${item.index}`,
          name: item.name,
        }));

        setAvailableItems(magicItems);
      })
      .catch((error) => console.error("Error fetching magic items:", error));

    fetch("https://www.dnd5eapi.co/api/equipment")
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

        const equipment = data.results.map((item) => ({
          index: `equipment/${item.index}`,
          name: item.name,
        }));

        setAvailableItems((prevItems) => [...prevItems, ...equipment]);
      })
      .catch((error) => console.error("Error fetching equipment:", error));
  }, []);

  const addLootItem = () => {
    console.log("Note:", note);
    if (selectedItem) {
      const newItem = { ...selectedItem, note };
      setLootItems([...lootItems, newItem]);
      setNewItemIndex("");
      setSelectedItem(null);
      setNote("");
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

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="loot-manager-table">
      <h2>Loot Manager</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {lootItems.map((item, index) => (
            <tr key={index} onClick={() => openModal(item)}>
              <td>{item.name}</td>
              <td>{item.note}</td> {/* Display the note in the table */}
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
        <label>
          Note:
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <button onClick={addLootItem}>Add Item</button>
      </div>
      {selectedItem && (
        <dialog open={isModalOpen} onClose={closeModal}>
          <h2>{selectedItem.name}</h2>
          {selectedItem.desc && selectedItem.desc.length > 0 && (
            <p>Description: {selectedItem.desc}</p>
          )}
          {note && <p>Note: {note}</p>}
          <button onClick={closeModal}>Close</button>
        </dialog>
      )}
    </div>
  );
};

export default LootManager;
