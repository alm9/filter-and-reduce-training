import React from 'react';
import logo from './logo.svg';
import './App.css';
import './dancaDoida.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div id="conteudo">Erro em javascript.js</div>
      </header>
      <script>
        document.getElementById("conteudo").innerHTML = "Hello JavaScript!";
      </script>
      <canvas></canvas>
    </div>
  );
}

export default App;
