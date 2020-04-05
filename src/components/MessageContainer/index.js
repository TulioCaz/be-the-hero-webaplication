import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function MessageContainer({ message, path, redirect }) {
  const history = useHistory();

  function handleButton() {
    if (!redirect) {
      window.location.reload();
      return;
    }
    history.push(path);
  }

  return (
    <div className={`messageContainer ${message !== '' ? 'enable' : ''}`}>
      <img src={logoImg} alt="logobethehero" />
      <h2>{message} !</h2>
      <button onClick={handleButton} className="button" type="button">
        OK
      </button>
    </div>
  );
}
