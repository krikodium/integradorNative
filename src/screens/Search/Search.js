import { Text, View, StyleSheet, TextInput, TouchableOpacity,  FlatList, Image} from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import {SearchBar } from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
class Search extends Component {
    constructor(props){
        super(props)
        this.state={
            data: [],
            id:'', 
            resultados: [],
            users: [], 
            loading: false,
            busqueda: '',
            publicaciones: [],
        
        }
    }

    componentDidMount(){
        db.collection('users')
        .onSnapshot(doc => {
            let resultados = [];
            doc.forEach(doc => {
            resultados.push({
                id: doc.id, 
                data: doc.data()
            })
            
        })
            this.setState(
            {data: resultados}
        )
        })
        
        db.collection('posts')
        .onSnapshot(doc => {
            let results = [];
            doc.forEach(doc=> {
                results.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({publicaciones: results})
        })
    }

    buscar(text){
    
        let usersFilter = this.state.data.filter(elm =>
        {  

            return elm.data.usuario.toUpperCase().includes(text.toUpperCase())})

            console.log(usersFilter);
            this.setState({
            users: usersFilter,
            user: text,
            })
    }

render() {
    return( 
        <View style={styles.container}>
            {console.log(this.state.data, this.state.publicaciones)}
            <View style={styles.contenedorInput}>
                <TextInput style={styles.input}
                onChangeText={ text => this.setState( {busqueda:text} )}
                placeholder='¿A quién estas buscando?'
                value={this.state.busqueda}>
                </TextInput>
                <TouchableOpacity onPress={()=> this.buscar(this.state.busqueda)}>
                    <FontAwesome name='search' size={32} color='black'/>
                </TouchableOpacity>
            </View>

                <FlatList
                data={this.state.users}
                keyExtractor={(item) => item.id}
                renderItem= {({item}) => 
                <View style={styles.contenedor}>
                    <Image style={styles.imagen} source={{uri:item.data.foto}}/>
                    <Text style={styles.usuarioTitulo}>{item.data.usuario}</Text>
                    
                </View>}
            /> 
        </View>
    )
    }
}

const styles = StyleSheet.create({
container:{
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
},

input:{
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 5,
    padding: 10,
    fontSize: 15,
    borderRadius: 5,
    width: 300,
    marginRight: 10
},

usuarioTitulo:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginRight: 100
},
imagen:{
    height: 60,
    width :60,
    borderRadius: 100
},
contenedor: {
    borderWidth: 1.5,
    borderColor:'#ccc',
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between'
},
contenedorInput:{
    flexDirection:'row',
    
}

})

export default Search;




{/* <TouchableOpacity onPress={()=> this.props.navigation.navigate('HomeNavigation', {
                    screen: 'UsersProfile',
                    params:{
                    email: item.data.email
                }})}>
                <Text style={styles.textUser}>{item.data.usuario}</Text>
                </TouchableOpacity>  */}