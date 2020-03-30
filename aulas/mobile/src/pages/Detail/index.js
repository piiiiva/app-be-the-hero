import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'
import * as MailComposer from 'expo-mail-composer' // importa tudo de 'expo-mail-composer' e joga dentro da variável MailComposer

import logoImg from '../../assets/logo.png' // passo só o logo png e vai importar automaticamente no melhor formato

import styles from './styles'


export default function Detail() {
    const navigation = useNavigation()
    const route = useRoute() // vou usar para buscar os dados da página incidents, assim nao preciso acessar o banco de dados novamente

    
    const incident = route.params.incident // o params é quem guarda as informações, e o incident é ainformação que eu quero. incident precisa ser atribuido como parâmetro na func useNavigation navigateToDetail e onPress{navigateToDetail} da página de incidents 
    const message = `Olá ${incident.name}. estou entrado em contato pois gostaria de ajudar no caso "${incident.titulo}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}`

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.titulo}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

                <View style={styles.incident}>
                    <Text style={styles.incidentProperty, {marginTop: 0}}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.titulo}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{
                        Intl.NumberFormat('pt-BR', { 
                            style: 'currency',
                            currency: 'BRL'})
                            .format(incident.value)}
                        </Text>
                </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}