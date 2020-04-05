import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import MessageContainer from '../../components/MessageContainer';

import api from '../../services/api';

export default function Logon() {
  const [email, setEmail] = useState({
    value: '',
    status: '',
    msgErr: '',
  });
  const [password, setPassword] = useState({
    value: '',
    status: '',
    msgErr: '',
  });

  const [inputErrors, setInputErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const actions = {
      password: setPassword,
      email: setEmail,
    };

    inputErrors.forEach((err) => {
      actions[err.key]({
        value: '',
        status: 'error',
        errMsg: err.error,
      });
    });
  }, [inputErrors]);

  async function handleLogin(e) {
    e.preventDefault();
    setInputErrors([]);

    try {
      const response = await api.post('sessions', {
        email: email.value,
        password: password.value,
      });

      const { errors, ong, token } = response.data;

      if (errors) {
        setInputErrors(errors);
      }

      localStorage.setItem('ongId', ong.id);
      localStorage.setItem('ongName', ong.name);
      localStorage.setItem('token', token);

      setSuccessMessage(`Voce logou na Ong: ${ong.name}`);
      setRedirect(true);
    } catch (err) {
      setErrorMessage('Não foi possivel fazer o login, tente novamente');
    }
  }

  return (
    <>
      <div className="logon-container">
        <section className="form">
          <img src={logoImg} alt="Be The Hero" />

          <form onSubmit={handleLogin}>
            <h1>Faça seu logon</h1>

            <input
              type="email"
              placeholder="Seu email"
              value={email.value}
              onChange={(e) =>
                setEmail({ value: e.target.value, status: '', msgErr: '' })
              }
            />

            <input
              type="password"
              placeholder="Sua senha"
              value={password.value}
              onChange={(e) =>
                setPassword({ value: e.target.value, status: '', msgErr: '' })
              }
            />
            <button className="button" type="submit">
              Entrar
            </button>

            <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#e02041" />
              Não tenho cadastro
            </Link>
          </form>
        </section>

        <img src={heroesImg} alt="Heroes" />
      </div>
      <MessageContainer
        message={errorMessage || successMessage}
        path="/profile"
        redirect={redirect}
      />
    </>
  );
}
