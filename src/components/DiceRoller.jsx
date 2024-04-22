import React, { useState } from "react";
import DiceIcon from "../../assets/icons/DiceIcon.svg";

const DiceRoller = () => {
  const [diceType, setDiceType] = useState(20);
  const [numDice, setNumDice] = useState(1);
  const [result, setResult] = useState(null);
  const [showGif, setShowGif] = useState(false);

 

  const rollDice = () => {
    setShowGif(true);
    const gifDuration = 1440;

    setTimeout(() => {
      setShowGif(false);

      const rolls = Array.from(
        { length: numDice },
        () => Math.floor(Math.random() * diceType) + 1
      );

      const totalResult = rolls.reduce((sum, roll) => sum + roll, 0);

      setResult({ rolls, totalResult });
    }, gifDuration);
  };

  return (
    <div className="dice-roller-container">
      <div className="dice-roller-top">
        <img src={DiceIcon} height={20} />
        <p>Dice Roller</p>
      </div>
      <div className="dice-roller-content">
        <div className="dice-type">
          <label>
            Dice Type:
            <select
              value={diceType}
              onChange={(e) => setDiceType(Number(e.target.value))}
              className="dice-select"
            >
              <option value={4}>4-sided</option>
              <option value={6}>6-sided</option>
              <option value={8}>8-sided</option>
              <option value={10}>10-sided</option>
              <option value={12}>12-sided</option>
              <option value={20}>20-sided</option>
              <option value={100}>100-sided</option>
            </select>
          </label>
        </div>
        <div className="number-of-dice">
          <label>
            # of Dice:
            <input
              type="number"
              min="1"
              value={numDice}
              onChange={(e) => setNumDice(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="roll-dice-btn-container">
          <button onClick={rollDice} className="roll-dice-btn">
            Roll Dice
          </button>
        </div>
      </div>
      {showGif && (
        <div className="gif-container">
          <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmgybmZ2N3BwMXBpbjB1czFxOHBxMnl2dGNtdXE2a3NqMXVocHFraCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriNPdeu2W1aelciY/giphy.gif" />
        </div>
      )}
      {result && (
        <div className="dice-results">
          <p>
            <strong>Rolls:</strong> {result.rolls.join(", ")}
          </p>
          <p>
            <strong>Total Results:</strong> {result.totalResult}
          </p>
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
