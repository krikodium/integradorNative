import { Text, View, TouchableOpacity, Image, FlatList, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import Post from '../../components/Post/Post'

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            posteosPropios: []
        }
    }

    componentDidMount(){
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs=> {
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
    }

    singOut(){
        auth.signOut()
    }

/*     <Text style={styles.titulo}>WELCOME, {auth.currentUser.email}</Text>
 */    render(){
        return(
            <>
            <View style={styles.opciones}>
                <View style={styles.imagenP}>
                    <Text>IMG</Text>
                    <Text>{auth.currentUser.email}</Text>
                </View>
                <Text>USERNAME</Text>
                {console.log(this.props  )}
            </View>
            {
                this.state.posteosPropios > 0 ? 
                <View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Posts')}>
                    <Text>No tienes publicaciones aun, ve a subir una.</Text>
                </TouchableOpacity>
                </View>: 
                <View style={styles.contenedor}>
                    <FlatList data={this.state.posteosPropios} keyExtractor={(item)=> item.id.toString()} renderItem={({item})=> <Post navigation={this.props.navigation} id={item.id} data={item.data}/>}/>
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
        justifyContent:'space-between',
        backgroundColor:'#474747',
        height:50
    },  
    logout:{
        color:'red',
        marginRight: 5
    },
    contenedor:{
        backgroundColor:'#363636',
        flex:1
    },
    titulo:{
        fontSize:20,
    }
})