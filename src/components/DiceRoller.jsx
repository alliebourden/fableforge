import React, { useState } from "react";

const DiceRoller = () => {
  const [diceType, setDiceType] = useState(20);
  const [numDice, setNumDice] = useState(1);
  const [result, setResult] = useState(null);

  const rollDice = () => {
    const rolls = Array.from(
      { length: numDice },
      () => Math.floor(Math.random() * diceType) + 1
    );

    const totalResult = rolls.reduce((sum, roll) => sum + roll, 0);

    setResult({ rolls, totalResult });
  };

  return (
    <div>
      <h2>Dice Roller</h2>
      <label>
        Dice Type:
        <select
          value={diceType}
          onChange={(e) => setDiceType(Number(e.target.value))}
        >
          <option value={4}>4-sided</option>
          <option value={6}>6-sided</option>
          <option value={8}>8-sided</option>
          <option value={10}>10-sided</option>
          <option value={12}>12-sided</option>
          <option value={20}>20-sided</option>
        </select>
      </label>
      <br />
      <label>
        Number of Dice:
        <input
          type="number"
          min="1"
          value={numDice}
          onChange={(e) => setNumDice(Number(e.target.value))}
        />
      </label>
      <br />
      <button onClick={rollDice}>Roll Dice</button>

      {result && (
        <div>
          <h3>Result:</h3>
          <p>Rolls: {result.rolls.join(", ")}</p>
          <p>Total: {result.totalResult}</p>
        </div>
      )}
    </div>
  );
};

export default DiceRoller;