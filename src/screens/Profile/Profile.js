import { Text, View, TouchableOpacity, Image, FlatList, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import Post from '../../components/Post/Post'

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            posteosPropios: [],
            misDatos: []
        }
    }

    componentDidMount(){
        db.collection('posts').where('owner', '==', auth.currentUser.email).orderBy('createdAt', 'desc').onSnapshot(docs=> {
            let posteos = []
            docs.forEach(doc=> {
                posteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posteosPropios: posteos
            })
        })
        db.collection('users')
        .where('email', '==', auth.currentUser.email)
        .onSnapshot(doc => {
            doc.forEach(doc => this.setState({
            id: doc.id,
            misDatos: doc.data()
            })) 
        })
    }

    cerrarSesion(){
        auth.signOut()
        .then(resp => this.props.navigation.navigate('Login'))
        .catch(err=> console.log(err))
    }

/*     <Text style={styles.titulo}>WELCOME, {auth.currentUser.email}</Text>
 */    render(){
        return(
            <>
            <View style={styles.opciones}>
                {/* <TouchableOpacity onPress={this.cerrarSesion()}>
                    <Text>hol   </Text>
                </TouchableOpacity> */}
                <View style={styles.imageContainer}>
                    <Image style={styles.imagen} source={{uri: this.state.misDatos.foto}} resizeMod='cover'/>
                    <Text style={styles.texto}>Posteos: {this.state.posteosPropios.length}</Text>
                </View>
                <View style={styles.user}>
                    <Text style={styles.textoUser}>@{this.state.misDatos.usuario}</Text>
                    <Text style={styles.texto}>{this.state.misDatos.email}</Text>
                <View style={styles.bio}>
                    <Text>Bio: {this.state.misDatos.bio}</Text>
                </View>
                </View>
            </View>
            {
                this.state.posteosPropios > 0 ? 
                <View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Posts')}>
                    <Text>No tienes publicaciones aun, ve a subir una.</Text>
                </TouchableOpacity>
                </View>: 
                <View style={styles.contenedor}>
                    <FlatList 
                        data = {this.state.posteosPropios}
                        keyExtractor = {(item) => item.id.toString()}
                        renderItem = {(item) => <Post data={item.item.data} id={item.id} />} 
                    />
                </View>
            }
            </>
        )
    }
}

export default Profile

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


//363636 viejo