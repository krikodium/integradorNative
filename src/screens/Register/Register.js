import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db, storage } from '../../firebase/config'
import * as ImagePicker from 'expo-image-picker';

class Register extends Component{
    constructor(){
        super()
        this.state = {
            mail: '',
            password: '',
            username:'',
            bio:'',
            foto:'',
            error: ''
        }
    }

    register(email, password){
        if (this.state.username === '') { 
            this.setState({error: 'Debe de ingresar un nombre de usua'})
        } else { 
            auth.createUserWithEmailAndPassword(email, password)
            .then(resp => {
                db.collection('users').add({
                    email: auth.currentUser.email,
                    usuario: this.state.username,
                    bio: this.state.bio,
                    foto: this.state.foto,
                    createdAt: Date.now()
                })
            })
            .then(resp=> this.props.navigation.navigate('Login'))
            .catch(err=> this.setState({error: err.message}))
        }
    }

    elegirImagen(){
        ImagePicker.launchImageLibraryAsync()
        .then(resp => {
            fetch(resp.uri)
            .then(data => data.blob())
            .then(image => {
                const ref = storage.ref(`profilePic/${Date.now()}.jpg`)
                ref.put(image)
                .then(()=> {
                    ref.getDownloadURL()
                    .then(url => {
                        this.setState({foto:url})
                    })
                })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }



    render(){
        return(
            <View style={styles.contenedor}>
                <View>
                    <Text>Register</Text>
                    <TextInput
                    style={styles.input}
                    placeholder='ingrese nombre de usuario'
                    onChangeText={text => this.setState({username: text})}
                    value={this.state.username}
                    />
                    <TextInput
                    style={styles.input}
                    placeholder='Enter email..'
                    onChangeText={text => this.setState({mail: text})}
                    value={this.state.mail}
                    />
                    <TextInput
                    style={styles.input}
                    placeholder='Enter Password...'
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    />
                    <TextInput
                    style={styles.input}
                    placeholder='ingrese una bio'
                    onChangeText={text => this.setState({bio: text})}
                    value={this.state.bio}
                    />
                    <View>
                        <TouchableOpacity onPress={()=> this.elegirImagen()}>
                            <Text style={styles.fotoPerfil}>Elegir foto de perfil</Text>
                        </TouchableOpacity>
                    </View>
                <View>
                <TouchableOpacity onPress={()=> this.register(this.state.mail, this.state.password)}>
                        <Text>Register User</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Allready have an account?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                        <Text>Create Account</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.error !== '' ?
                    console.log(this.state.error):
                    ''
                }
                </View>
            </View>
        )
    }
}

export default Register

const styles = StyleSheet.create({
    contenedor:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:35,
        backgroundColor: '#95A5A6'
    },
    input:{
        borderWidth:1,
        height: 35,
        marginTop: 5
    },
    fotoPerfil:{
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 1,
        textAlign: 'center'
    }
})