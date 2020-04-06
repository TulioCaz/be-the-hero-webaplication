import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';

import MessageContainer from '../../components/MessageContainer';

import api from '../../services/api';

export default function Register() {
  const [name, setName] = useState({
    value: '',
    status: '',
    errMsg: '',
  });
  const [password, setPassword] = useState({
    value: '',
    status: '',
    errMsg: '',
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    status: '',
    errMsg: '',
  });
  const [email, setEmail] = useState({
    value: '',
    status: '',
    errMsg: '',
  });
  const [whatsapp, setWhatsapp] = useState({
    value: '',
    status: '',
    errMsg: '',
  });
  const [city, setCity] = useState({
    value: '',
    status: '',
    errMsg: '',
  });
  const [uf, setUf] = useState({
    value: '',
    status: '',
    errMsg: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inputErrors, setInputErrors] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const actions = {
      name: setName,
      password: setPassword,
      confirmPassword: setConfirmPassword,
      email: setEmail,
      whatsapp: setWhatsapp,
      city: setCity,
      uf: setUf,
    };

    inputErrors.forEach((err) => {
      actions[err.key]({
        value: '',
        status: 'error',
        errMsg: err.error,
      });
    });
  }, [inputErrors]);

  async function handleRegister(e) {
    e.preventDefault();
    setInputErrors([]);

    const data = {
      name: name.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      email: email.value,
      whatsapp: whatsapp.value,
      city: city.value,
      uf: uf.value,
    };

    try {
      const response = await api.post('ongs', data);

      const { errors, message } = response.data;

      if (errors) {
        setInputErrors(errors);
        return;
      }

      setRedirect(true);
      setSuccessMessage(message);
    } catch (err) {
      if (err.response.data.errors) {
        setInputErrors([err.response.data.errors]);
        return;
      }
      setErrorMessage('Erro ao tentar cadastrar, tente novamente!');
    }
  }

  return (
    <>
      <div className="form-page-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" />

            <h1>Cadastro</h1>
            <p>
              Faça seu cadastro, entre na plataforma e ajude pessoas a
              encontrarem os casos da sua ONG.
            </p>

            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#e02041" />
              Já tenho cadastro
            </Link>
          </section>

          <form onSubmit={handleRegister}>
            <input
              className={name.status}
              placeholder={name.errMsg || 'Nome da ONG'}
              value={name.value}
              onChange={(e) =>
                setName({ value: e.target.value, status: '', errMsg: '' })
              }
            />
            <input
              className={email.status}
              type="email"
              placeholder={email.errMsg || 'E-mail'}
              value={email.value}
              onChange={(e) =>
                setEmail({ value: e.target.value, status: '', errMsg: '' })
              }
            />
            <input
              className={password.status}
              type="password"
              placeholder={password.errMsg || 'Escolha uma senha'}
              value={password.value}
              onChange={(e) =>
                setPassword({
                  value: e.target.value,
                  status: '',
                  errMsg: '',
                })
              }
            />
            <input
              className={confirmPassword.status}
              type="password"
              placeholder={confirmPassword.errMsg || 'Confirme a senha'}
              value={confirmPassword.value}
              onChange={(e) =>
                setConfirmPassword({
                  value: e.target.value,
                  status: '',
                  errMsg: '',
                })
              }
            />
            <input
              className={whatsapp.status}
              placeholder={whatsapp.errMsg || 'whatsApp'}
              value={whatsapp.value}
              onChange={(e) =>
                setWhatsapp({
                  value: e.target.value,
                  status: '',
                  errMsg: '',
                })
              }
            />
            <div className="input-group">
              <input
                className={city.status}
                placeholder={city.errMsg || 'Cidade'}
                value={city.value}
                onChange={(e) =>
                  setCity({
                    value: e.target.value,
                    status: '',
                    errMsg: '',
                  })
                }
              />
              <input
                className={uf.status}
                placeholder={uf.errMsg || 'UF'}
                style={{ width: 80 }}
                value={uf.value}
                onChange={(e) =>
                  setUf({ value: e.target.value, status: '', errMsg: '' })
                }
              />
            </div>

            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
      <MessageContainer
        message={errorMessage || successMessage}
        path="/"
        redirect={redirect}
      />
    </>
  );
}
