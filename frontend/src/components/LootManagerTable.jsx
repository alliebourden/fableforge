import React, { useState, useEffect, useRef } from "react";
import LootManagementIcon from "../../assets/icons/LootManagementIcon.svg";
import theme from "../Theme";
import { Button, ThemeProvider } from "@mui/material";

const LootManager = () => {
  const [lootItems, setLootItems] = useState([]);
  const [newItemIndex, setNewItemIndex] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [availableItems, setAvailableItems] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const inputRef = useRef(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    Promise.all([
      fetch("https://www.dnd5eapi.co/api/magic-items").then((response) =>
        response.json()
      ),
      fetch("https://www.dnd5eapi.co/api/equipment").then((response) =>
        response.json()
      ),
    ])
      .then(([magicItemsData, equipmentData]) => {
        if (!magicItemsData.results || !equipmentData.results) {
          throw new Error("Invalid API response format");
        }

        const magicItems = magicItemsData.results.map((item) => ({
          index: `magic-items/${item.index}`,
          name: item.name,
        }));

        const equipment = equipmentData.results.map((item) => ({
          index: `equipment/${item.index}`,
          name: item.name,
        }));

        setAvailableItems([...magicItems, ...equipment]);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const addLootItem = () => {
    if (selectedItemIndex) {
      const newItem = { index: selectedItemIndex, name: newItemIndex, note };
      setLootItems((prevItems) => [...prevItems, newItem]);
      setNewItemIndex("");
      setSelectedItemIndex("");
      setNote("");
    }
  };

  const handleInputChange = (value) => {
    setNewItemIndex(value);
    const filteredItems = availableItems.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.index.toLowerCase().includes(value.toLowerCase())
    );
    setPredictions(filteredItems);
  };

  const handlePredictionClick = (index) => {
    const selectedPrediction = predictions[index];
    setNewItemIndex(selectedPrediction.name);
    setSelectedItemIndex(selectedPrediction.index);
    setPredictions([]);
  };

  const openModal = (item) => {
    if (!item.desc) {
      const [category, itemIndex] = item.index.split("/");
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
          setIsModalOpen(true);
        })
        .catch((error) =>
          console.error(`Error fetching details for ${item.index}:`, error)
        );
    } else {
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSort = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    setLootItems((prevItems) =>
      [...prevItems].sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortOrder === "asc" ? comparison : -comparison;
      })
    );
  };

  const removeItem = (indexToRemove) => {
    setLootItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <ThemeProvider theme={theme}>
    <div className="loot-manager-table">
      <div className="loot-manager-top">
        <img src={LootManagementIcon} height={20} />
        <p>Loot Manager</p>
      </div>
      <div className="loot-manager-add-new">
        <h3>Add New Item</h3>
        <div className="add-new-item-input">
          <div className="select-item">
            <label>
              Item:
              <input
                ref={inputRef}
                type="text"
                value={newItemIndex}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <div className="predictions">
                {predictions.length > 0 && (
                  <div>
                    <ul>
                      {predictions.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => handlePredictionClick(index)}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </label>
          </div>
          <div className="note">
            <label className="note-label">
              Note:
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="add-new-item-btn">
          <Button 
          variant="contained" color="primary"
          onClick={addLootItem} 
          // className="add-item-btn"
          sx={{ my: 1, }}>
            Add Item
          </Button>
        </div>
      </div>
      <div className="loot-manager-table-content">
        <table className="item-table">
          <thead>
            <tr>
              <th className="item-name" onClick={handleSort}>
                Item
                {sortOrder === "asc" ? " ▲" : " ▼"}
              </th>
              <th className="item-note">Note</th>
            </tr>
          </thead>
          <tbody>
            {lootItems.map((item, index) => (
              <tr key={index} className="loot-item">
                <td onClick={() => openModal(item)}>
                  {item.name}
                  <span
                    className="remove-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(index);
                    }}
                  >
                    &#10006;
                  </span>
                </td>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedItem && (
          <dialog open={isModalOpen} onClose={closeModal}>
            <h2>{selectedItem.name}</h2>
            {selectedItem.desc && selectedItem.desc.length > 0 && (
              <p>Description: {selectedItem.desc}</p>
            )}
            {note && <p>Note: {note}</p>}
            <Button
             variant="contained" color="primary"
             onClick={closeModal} 
            //  className="close-modal-btn"
             >
              Close
            </Button>
          </dialog>
        )}
      </div>
    </div>
    </ThemeProvider>
  );
};

export default LootManager;
