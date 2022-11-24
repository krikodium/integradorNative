import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import {storage} from '../../firebase/config'
import {FontAwesome} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
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

    elegirImagen(){
        ImagePicker.launchImageLibraryAsync()
        .then(resp => {
            fetch(resp.uri)
            .then(data => data.blob())
            .then(image => {
                const ref = storage.ref(`fotos/${Date.now()}.jpg`)
                ref.put(image)
                .then(()=> {
                    ref.getDownloadURL()
                    .then(url => {
                        this.props.cuandoSubaLaFoto(url)
                    })
                    .then(this.setState({mostrarCamara:false}))
                })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
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
                    <FontAwesome style={styles.textos} name='camera' size={32} color='black'/>
                </TouchableOpacity>
                <View>
                        <TouchableOpacity onPress={()=> this.elegirImagen()}>
                            <Text style={styles.fotoPerfil}>Elegi imagen del dispositivo.</Text>
                        </TouchableOpacity>
                </View>
            </View>
            
            : this.state.mostrarCamara === false && this.state.fotoUri !== '' ?
            <View style={styles.contenedorImagen}>
                <Image
                    style={styles.image}
                    source={{uri: this.state.fotoUri}}
                />
                <View style={styles.vaono}>
                    <TouchableOpacity onPress={()=> this.aceptarFoto(this.state.fotoUri)}>
                        <FontAwesome name='thumbs-o-up' color='black' size={35} style={styles.textos}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.rechazarFoto()}>
                        <FontAwesome name='thumbs-o-down' color='black' size={35} style={styles.textos}/>
                    </TouchableOpacity>
                </View>
            </View> :
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
        borderRadius: 15,
        width: 300,
        marginTop: 40
    },
    image:{
        height:300,
        width: 350,
        marginTop: 40,
        borderRadius:15
    },
    contenedorCamara:{
        height: 500,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    textos:{
        marginTop: 10,
        marginLeft: 15
    },
    contenedorImagen:{
        alignItems:'center',
        justifyContent: 'center',
        textAlign:'center'
    },
    vaono:{
        display:'flex',
        flexDirection: 'row'
    }
})

export default Camara