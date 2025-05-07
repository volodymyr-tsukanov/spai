import { Calc, CalcImprov } from "./calc/Calc";
import Card from "./cards/Card";
import Temper from "./Temper";
import Topp from "./toppings/Topp";

function App() {
  return (
    <div>
      <h1>Słynni informatycy</h1>
      <Card
        name="Alan Turing"
        imgSrc="https://mdz.cs.pollub.pl/ai/alan_turing.jpg"
        infos={["1912 - 1954", "Matematyk", "Anglia"]} />
      <Card
        name="Niklaus Wirth"
        imgSrc="https://mdz.cs.pollub.pl/ai/nicolas_wirth.jpg"
        infos={["1934 - will be some day", "Elektronik i informatyk", "Szwajcaria"]}
      />
      <Card
        name="Dennis Ritchie"
        imgSrc="https://mdz.cs.pollub.pl/ai/dennis_ritchie.jpg"
        infos={["1941 - 2011", "Matematyk, fizyk, informatyk", "USA"]}
      />
      <br/><br/><br/><br/>
      <Calc />
      <br/><br/><br/><br/>
      <Temper />
      <br/><br/><br/><br/>
      <Topp />
      <br/><br/><br/><br/>
      <CalcImprov />
    </div>
  )
}
export default App