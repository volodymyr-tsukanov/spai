import './KartaPrac.css'

function KartaPrac(props) {
  return (
    <table class="table table-sm">
      <thead>
        <tr class="row">
          <th class="col-sm-2" scope="col">Opis zadania</th>
          <th class="col-sm-2" scope="col">Nazwa</th>
          <th class="col-sm-2" scope="col">Data</th>
        </tr>
      </thead>
      <tbody>
        {props.dziennik.map((v, k) => {
          return (<tr class="row" key={k}>
            <td class="col-sm-2">{v[0]}</td>
            <td class="col-sm-2">{v[1]}</td>
            <td class="col-sm-2">{v[2]}</td>
          </tr>)
        })}
      </tbody>
    </table>
  )
}
export default KartaPrac