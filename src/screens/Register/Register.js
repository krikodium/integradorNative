import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'

class Register extends Component{
    constructor(){
        super()
        this.state = {
            mail: '',
            password: '',
            error: ''
        }
    }

    register(mail, password){
        auth.createUserWithEmailAndPassword(mail, password)
        .then(resp => this.props.navigation.navigate('TabNavigation'))
        .catch(err=> this.setState({error: err.message}))
    }
    render(){
        return(
            <View style={styles.contenedor}>
                <View>
                    <Text>Register</Text>
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
                    <Text>{this.state.error}</Text>:
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
        borderWidth:1
    }
})