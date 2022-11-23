import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Camara from '../../components/Camara/Camara'
import {storage} from '../../firebase/config'

class Posts extends Component {

    constructor(){
        super()
        this.state={
            description:'',
            mostrarCamara:true,
            fotoUrl:''
        }
    }

    enviarPost(text){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: text,
            likes:[],
            comments:[],
            fotos: this.state.fotoUrl
        })
        .then(()=> this.props.navigation.navigate('Home'))
        .catch((err)=> console.log(err))
    }

    cuandoSubaLaFoto(url){
        this.setState({
            fotoUrl:url,
            mostrarCamara:false
        })
    }

    render() {
        return (
        <View style={styles.container}>
            {
                this.state.mostrarCamara ?
                <Camara
                cuandoSubaLaFoto={(url)=> this.cuandoSubaLaFoto(url)}
                /> :
                <View style={styles.contenedor}>
                    <Image
                    style={styles.image}
                    source={{uri: this.state.fotoUrl}}
                />
                    <TextInput
                    placeholder='Deja tu descripcion'
                    onChangeText={text => this.setState({description: text})}
                    value={this.state.description}
                    keyboardType='default'
                    style={styles.input}
                    />
                    <TouchableOpacity onPress={()=> this.enviarPost(this.state.description)}>
                        <Text>Enviar posts</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#7F8C8D'
    },
    input:{
        height:32,
        borderWidth:1,
        width: 300,
        borderRadius: 15,
        height: 60,
        marginBottom: 5,
        marginTop: 15,
        backgroundColor: '#BDC3C7'
    },
    backHome:{
        marginTop: 15,
        borderWidth: 1,
        width: 100,
        textAlign:'center',
        fontSize:20
    },
    contenedor:{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'
    },
    image:{
        height: 200,
        width: 300,
        borderRadius: 15,
        marginTop: 20
    }
})
export default Posts