import { useState, useEffect } from 'react'
import "./Temper.css"

export default function Temper() {
  const [temperature, setTemperature] = useState(0);
  const [stateOfMatter, setStateOfMatter] = useState("");

  const handleChange = (event) => {
    setTemperature(event.target.value);
  };

  useEffect(() => {
    const temp = parseFloat(temperature);
    if (isNaN(temp)) {
      setStateOfMatter("");
    } else if (temp <= 0) {
      setStateOfMatter("solid");
    } else if (temp >= 100) {
      setStateOfMatter("gas");
    } else {
      setStateOfMatter("liquid");
    }
  }, [temperature]);

  return (
    <div className="temperature">
      <label>
        Temperature:&nbsp;
        <input
          type="text"
          onChange={handleChange}
          value={temperature}
          placeholder="Enter water temperature"
        />
        &nbsp;°C
      </label>
      <div className={stateOfMatter}>
        <p>
          At {temperature} °C, water is in a
          <span> {stateOfMatter} state.</span>
        </p>
      </div>
    </div>
  );
}