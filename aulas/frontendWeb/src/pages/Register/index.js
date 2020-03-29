import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Register() {
    const [name, setName] = useState('') // armazenar os valores dos inputs dentro de um estado - precisa importar o { useState }
    const [email, setEmail] = useState('') // Primeiro é o valor e o segundo a função para atualizar esse valor
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    
    const history = useHistory() // fazer navegação atravas de JS sem usar o Link do 'reac-router-dom'

    async function handleRegister(e) { // vai ser responsável por fazer o cadastro do usuário quando o usuário der um submit (está no form) -> o (e) é um evento de submit do formulário
        e.preventDefault() // previne o comportamento padrão do formulário, pra quando clicar em algum botão não recarregar a página
   
        const data = ({ // preciso enviar isso para minha api
            name,
            email,
            whatsapp,
            city,
            uf
        })

        try {
            const response = await api.post('ongs', data) //envia para minha api

            alert(`Seu ID de acesso: ${response.data.id}`)

            history.push('/') // envia para a rota raiz assim que o ID for cadastrado
        } catch (err) {
            alert('Erro no cadastro, tente novamente')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                    />

                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }} 
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form> 
            </div>

        </div>
    )
}