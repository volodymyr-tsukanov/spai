import { useState } from "react"
import './Calc.css';
import Result from "./Result";
import Keypad from "./Keypad";

export function Calc() {
  const [result, setResult] = useState(null)
  const [input1, setInput1] = useState(null)
  const [input2, setInput2] = useState(null)

  const calculate = (e) => {
    if (e.target.innerHTML === '/' && input2 == 0) {
      alert('nie!');
    }
    else {
      let res = eval(`${input1} ${e.target.innerHTML} ${input2}`).toFixed(2)
      setResult(res)
    }
  }
  const firstInput = (e) => {
    let value1 = e.target.value
    setInput1(value1)
  }
  const secondInput = (e) => {
    let value2 = e.target.value
    setInput2(value2)
  }

  return (
    <div className="App">
      <h1>Kalkulator czterodziałaniowy</h1>
      <div>
        <span>
          <input
            type="number"
            onChange={firstInput}
            style={{ width: "5rem", height: "2rem", margin: "0.5rem" }}
          />
        </span>
        <span>
          <input
            type="number"
            onChange={secondInput}
            style={{ width: "5rem", height: "2rem", margin: "0.5rem" }}
          />
        </span>
      </div>
      <div style={{ margin: "2rem" }}>
        <button onClick={calculate} style={{ margin: "0.3rem", width: "3rem", height: "2rem" }}>
          +
        </button>
        <button onClick={calculate} style={{ margin: "0.3rem", width: "3rem", height: "2rem" }}>
          -
        </button>
        <button onClick={calculate} style={{ margin: "0.3rem", width: "3rem", height: "2rem" }}>
          *
        </button>
        <button onClick={calculate} style={{ margin: "0.3rem", width: "3rem", height: "2rem" }}>
          /
        </button>
      </div>
      <h4>Wynik: {result}</h4>
    </div>
  )
}

export function CalcImprov() {
  const [state, setState] = useState({ result: "" })

  const onClick = button => {
    switch (button) {
      case "=":
        calculate()
        break
      case "C":
        reset()
        break
      case "CE":
        backspace()
        break
      default:
        setState({ result: state.result + button })
    }
  }
  const calculate = () => {
    try {
      if (/\/0(?![0-9])/.test(state.result)) {
        alert("Division by zero is not allowed!");
      } else {
        setState({
          result: (eval(state.result) || "") + ""
        })
      }
    } catch (e) {
      setState({
        result: "error"
      })
    }
  }
  const reset = () => {
    setState({
      result: ""
    })
  }
  const backspace = () => {
    setState({
      result: state.result.slice(0, -1)
    })
  }

  return (
    <div>
      <div className="srodek">
        <h3>Kalkulator</h3>
        <Result result={state.result} />
        <Keypad onClick={onClick} />
      </div>
    </div>
  )
}