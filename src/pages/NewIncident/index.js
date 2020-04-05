import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';

import MessageContainer from '../../components/MessageContainer';

import api from '../../services/api';

export default function NewIncident() {
  const [title, setTitle] = useState({
    value: '',
    status: '',
    errMsg: '',
  });
  const [description, setDescription] = useState({
    value: '',
    status: '',
    errMsg: '',
  });
  const [value, setValue] = useState({
    value: '',
    status: '',
    errMsg: '',
  });

  const [inputErrors, setInputErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const actions = {
      title: setTitle,
      description: setDescription,
      value: setValue,
    };

    inputErrors.forEach((err) => {
      if (err.key === 'token') return setErrorMessage(err.error);

      return actions[err.key]({
        value: '',
        status: 'error',
        errMsg: err.error,
      });
    });
  }, [inputErrors]);

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title: title.value,
      description: description.value,
      value: value.value,
    };

    try {
      const response = await api.post('incidents', data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const { errors, message } = response.data;

      if (errors) {
        setInputErrors(errors);
        return;
      }

      setRedirect(true);
      setSuccessMessage(message);
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <>
      <div className="form-page-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" />

            <h1>Cadastrar novo caso </h1>
            <p>
              Descreva o caso detalhadamente para encontrar um herói para
              resolver isso.
            </p>

            <Link className="back-link" to="/profile">
              <FiArrowLeft size={16} color="#e02041" />
              Voltar para Home
            </Link>
          </section>

          <form onSubmit={handleNewIncident}>
            <input
              className={title.status}
              placeholder={title.errMsg || 'Título do caso'}
              value={title.value}
              onChange={(e) =>
                setTitle({
                  value: e.target.value,
                  status: '',
                  errMsg: '',
                })
              }
            />
            <textarea
              className={description.status}
              placeholder={description.errMsg || 'Descrição'}
              value={description.value}
              onChange={(e) =>
                setDescription({
                  value: e.target.value,
                  status: '',
                  errMsg: '',
                })
              }
            />
            <input
              className={value.status}
              placeholder={value.errMsg || 'Valor em reais'}
              value={value.value}
              onChange={(e) =>
                setValue({
                  value: e.target.value,
                  status: '',
                  errMsg: '',
                })
              }
            />
            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
      <MessageContainer
        message={errorMessage || successMessage}
        path="/profile"
        redirect={redirect}
      />
    </>
  );
}
