import React from "react"
import './Diary.css'

export default function Diary() {
  return (
    <div className="grid-parent">
      <div className="header">
        <h1>Nagłówek</h1>
        <p>Aktualny rozmiar czcionki: <strong>x</strong></p>
        <p>Aktualny kolor czcionki: <strong>x</strong></p>
        <p>
          Liczba lajków: <strong>0</strong>
        </p>
      </div>
      <div className="sidebar">
        <input type="text" />
        <input type="text" />
        <button>Ustaw parametry tekstu na 20px i pink.</button>
      </div>
      <div className="main-area">
        <p>Szkielety programistyczne w aplikacjach internetowych: Node, MongoDB, Express, React.</p>
      </div>
      <footer className="footer">
        <p>
          Stopka <button>Ustaw parametry tekstu na 30px, a kolor pozostaw bez zmian.</button>
        </p>
        <p>
          <button>Polub tę stronę!</button>
        </p>
      </footer>
    </div>
  )
}