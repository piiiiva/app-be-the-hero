import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi' // usa o { FiLoIn } porque não quero importar todo o pacote de icones, apenas aquele ícone

import api from '../../services/api'

import './styles.css'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'


export default function Logon() {
    const [id, setId] = useState('')
    const history = useHistory()

    async function handleLogin (e) {
        e.preventDefault() // faz em todo formulário no React para evitar o redirect padrao do form
    
        try {
            const response = await api.post('sessions', { id }) // pega a resposta de api.post na rota 'session' -> precisamos informar o id da ong que está querendo entrar na aplicação
            
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile') //se deu tudo certo direcionamos o usuário para /profile onde estão os casos cadastrados
        } catch (err) { // Se digitar o id errado
            alert('Falha no LogIn, tente novamente')
        }
    
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logo</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt='Heroes' />
        </div>
    )
}