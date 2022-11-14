import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import {storage} from '../../firebase/config'

class Camara extends Component {
    constructor(props){
        super(props)
        this.metodosDeCamara = null
        this.state = {
            mostrarCamara:false,
            fotoUri:''
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=> this.setState({
            mostrarCamara: true
        }))
        .catch(err => console.log(err))
    }

    tomarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(imagenEnMemoria => this.setState({
            fotoUri: imagenEnMemoria.uri,
            mostrarCamara:false
        }))
        .catch(err => console.log(err))
        
    }

    aceptarFoto(url){
        fetch(url)
        .then(imagenEnBinario => imagenEnBinario.blob())
        .then(imagenOk =>{
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(imagenOk)
            .then(()=>{
                ref.getDownloadURL()
                .then((url)=>{
                    this.props.cuandoSubaLaFoto(url)
                })
            })
        })
        .catch(err => console.log(err))
    }

    rechazarFoto(){
        this.setState({
            mostrarCamara: true
        })   //falt terminar para rechzar foto
    }

    

render() {
    return (
    <View style={styles.container}>
        
        {
            this.state.mostrarCamara ? 
            
            <View style={styles.contenedorCamara}>
            <Camera
                    style={styles.camara}
                    type={Camera.Constants.Type.back}
                    ref={metodosDelComponente => this.metodosDeCamara = metodosDelComponente}
                />
                <TouchableOpacity onPress={()=> this.tomarFoto()}>
                    <Text style={styles.textos}>Tomar foto</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.rechazarFoto()}>
                    <Text style={styles.textos}>Cancelar foto</Text>
                </TouchableOpacity>
            </View>
            
            : this.state.mostrarCamara === false && this.state.fotoUri !== '' ?
            <>
                <Image
                    style={styles.image}
                    source={{uri: this.state.fotoUri}}
                />
                <TouchableOpacity onPress={()=> this.aceptarFoto(this.state.fotoUri)}>
                    <Text style={styles.textos}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.rechazarFoto()}>
                    <Text style={styles.textos}>Rechazar</Text>
                </TouchableOpacity>
            </> :
            <Text>No tienes permiso para usar la Camara</Text>
        }
    </View>
    )
}
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    camara:{
        height:200,
        borderRadius: '15px'
    },
    image:{
        height:200
    },
    contenedorCamara:{
        height: 500,
        textAlign:'center'
    },
    textos:{
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#16A085'
    }
})

export default Camara