import React, { useState } from "react";

const LootManager = () => {
  const [lootItems, setLootItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [foundLocation, setFoundLocation] = useState("");
  const [inventoryOwner, setInventoryOwner] = useState("");
  const [notes, setNotes] = useState("");

  const addLootItem = () => {
    const newItemObject = {
      item: newItem,
      location: foundLocation,
      owner: inventoryOwner,
      notes: notes,
    };

    setLootItems([...lootItems, newItemObject]);
    setNewItem("");
    setFoundLocation("");
    setInventoryOwner("");
    setNotes("");
  };

  return (
    <div>
      <h2>Loot Manager</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Found Location</th>
            <th>Inventory Owner</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {lootItems.map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.location}</td>
              <td>{item.owner}</td>
              <td>{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Add New Item</h3>
        <label>
          Item:
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </label>
        <label>
          Found Location:
          <input
            type="text"
            value={foundLocation}
            onChange={(e) => setFoundLocation(e.target.value)}
          />
        </label>
        <label>
          Inventory Owner:
          <input
            type="text"
            value={inventoryOwner}
            onChange={(e) => setInventoryOwner(e.target.value)}
          />
        </label>
        <label>
          Notes:
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <button onClick={addLootItem}>Add Item</button>
      </div>
    </div>
  );
};

export default LootManager;
