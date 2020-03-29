import React, { useState, useEffect } from 'react'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

export default function Profile() {
    const [incidents, setIncidents] = useState([])
    const history = useHistory()

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')


    useEffect(() => {
        api.get('profiles', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id)) //mantém apenas nos incidents apenas os incident.id !== de id
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente')
        }
    }

    function handleLogout() {
        localStorage.clear()

        history.push('/')

    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        {/* Preciso passa para o onClick uma func e não o retorno de uma func, caso contrário deletaria
                        todos os incidents ao carregar a tela, por isso passamos () => */}
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button"> 
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}