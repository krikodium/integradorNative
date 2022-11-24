import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Post from '../../components/Post/Post'

class UserProfile extends Component{
    constructor(props){
        super(props)
        this.state ={
            datosUsuario:{},
            posts:[],
            id:'',
            loading: true,
            usuario: props.route.params.params.email
        }
    }

    componentDidMount(){
        db.collection('users')
        .where('email', '==', this.state.usuario)
        .onSnapshot(doc => {
            doc.forEach(doc => this.setState({
            id: doc.id,
            datosUsuario: doc.data()
            })) 
        })
        this.setState({
            loading: false
        })

        db.collection('posts')
        .where('owner', '==' ,this.state.usuario)
        .onSnapshot(docs => {
            let posteos = []
            docs.forEach(doc => {
                posteos.push({
                    data: doc.data(),
                    id : doc.id
                })
            })
            this.setState({
                loading: false,
                posts: posteos
            })
        })
    }

    render(){
        return(
            <>
            {console.log( this.state.datosUsuario)}
            {
                this.state.loading ? 
                <ActivityIndicator size={32} color='red'/> : 
                <>
                <View style={styles.opciones}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.imagen} source={{uri: this.state.datosUsuario.foto}} resizeMode='cover'/>
                        <Text style={styles.texto}>Posteos: {this.state.posts.length}</Text>
                    </View>
                    <View style={styles.user}>
                        <Text style={styles.textoUser}>@{this.state.datosUsuario.usuario}</Text>
                        <View style={styles.bio}>
                            <Text> Bio:  {this.state.datosUsuario.bio}</Text>
                        </View>
                    </View>
                </View>
                {
                    this.state.posts > 0 ?  
                    <View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Posts')}>
                        <Text>No tienes publicaciones aun, ve a subir una.</Text>
                    </TouchableOpacity>
                </View> :
                <View style={styles.contenedor}>
                    <FlatList 
                        data = {this.state.posts}
                        keyExtractor = {(item) => item.id.toString()}
                        renderItem = {(item) => <Post data={item.item.data} id={item.id} />} 
                    />
                </View>

                }
                </>
            }
                
            </>
        )
    }
}

const styles = StyleSheet.create({
    opciones:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-arround',
        backgroundColor:'#696969',
        height:150,
        alignItems: 'center'
    },  
    logout:{
        color:'red',
        marginRight: 5
    },
    contenedor:{
        backgroundColor:'#474747',
        flex:1
    },
    titulo:{
        fontSize:20,
    },
    imagen:{
        height: 100,
        width: 100,
        borderRadius: 30,
        marginLeft: 10,
        marginTop: 5
    },
    user:{
        textAlign:'center',
        marginLeft: 40
    },
    texto:{
        fontSize: 15
    },
    textoUser:{
        fontSize: 15,
        fontWeight:'bold'
    },
    imageContainer:{
        textAlign:'center'
    },
    textoSingout:{
        backgroundColor: 'red',
        color: 'white'
    },
    bio:{
        overflow: 'scroll',
        maxWidth: 150
    }


})

export default  UserProfile