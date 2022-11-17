import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            mail: '',
            password: '',
            logged: false
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user !== null){
                this.props.navigation.navigate('TabNavigation')
            }
        })
    }
    loguear(mail, pass){
        auth.signInWithEmailAndPassword(mail, pass)
        .then(resp => this.props.navigation.navigate('TabNavigation'))
        .catch(err=> console.log('este error es el' + err))
    }

    render(){
        return(
            <View style={styles.containerPrin}>
            <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>
                <View>
                    <TextInput style={styles.input} onChangeText={text => this.setState({mail:text})} placeholder='insert email...' value={this.state.mail}/>
                    <TextInput style={styles.input} onChangeText={text => this.setState({password: text})} placeholder='insert password...' value={this.state.password} secureTextEntry={true}/>
                </View>
                <TouchableOpacity onPress={()=> this.loguear(this.state.mail, this.state.password)}>
                    <Text>Click to log in.</Text>
                </TouchableOpacity>
                <View>
                    <Text>Not loged? click to register.</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: 300,
        
    },
    containerPrin:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#95A5A6',
        height: 700,
        justifyContent:'space-around',
        flex:1
    },
    input:{
        borderWidth: 1,
        marginBottom: 10
    },
    titulo: {
        fontSize:20,
        marginBottom:10
    }
})
