import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native' // tipo useHistory
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png' // passo só o logo png e vai importar automaticamente no melhor formato

import styles from './styles'

export default function Incidents() {
    const [incidents, setIncidents] = useState([]) // ideal iniciar o estado com o mesmo tipo de informação que ele armazenará depois, nesse caso ele armazenará um [] de incidents
    const [total, setTotal] = useState(0)

    const [page, setPage] = useState(1) // não existe página 0 - controlar qual página estou no momento
    const [loading, setLoading] = useState(false) // Quando buscar dados novos, para evitar que sejam buscado novamente, vamos carregar 1 página por vez


    
    const navigation = useNavigation()

    function navigateToDetail( incident ) {
        navigation.navigate('Detail', { incident }) // precisa importar o useNavigation
    }

    async function loadIncidents() {
        if (loading) { // Evitar que enquanto uma requisição de loading está sendo feita, seja requisitado um novo loading
            return;
        }
        
        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true)
        
        const response = await api.get('incidents', {
            params: { page } // envia o número da página que estamos carregando para a api
        }) // os dados que retornam dessa response precisam ser armazenados em um estado pare serem utilizados depois, precisamos importar e usar o useState
    
        setIncidents([...incidents, ...response.data]) // data de incidents - anexar dois vetores - ...incidents copia os valores de incidents e ...response.data copia e adiciona os valores do backend para cada página que carregamos  
        setTotal(response.headers['x-total-count'])
        setPage(page + 1) // pular para próxima página
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents} // Função disparada automaticamente quando o usuário chegar no final da lista
                onEndReachedThreshold={0.2} // Quantos % o usuário precisa estar para carregar novos itens
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.titulo}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{
                        Intl.NumberFormat('pt-BR', { 
                            style: 'currency',
                            currency: 'BRL'})
                            .format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                        style={styles.detailsButton}
                        onPress={() => navigateToDetail(incident)} // sempre que precisar passar parâmetros oara uma função ela precisa estar em uma =>  .... caso contrário ela executará assim que a página for carregada
                        >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
            
    )
}