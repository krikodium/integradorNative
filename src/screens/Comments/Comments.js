import { Text, View, TouchableOpacity, TextInput, StyleSheet, FlatList} from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import firebase from 'firebase'

class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: props.route.params.id,
            commentsArr: [],
            data: {}, //obj vacio
            comentarios: ''
        }
    }
    
    componentDidMount(){
        db
        .collection('posts').doc(this.state.id).onSnapshot(doc=> {
            this.setState({
                data: doc.data(),
                commentsArr: doc.data().comments
            })
        })
    }
    //metodos para borrar y actualizar array de firebase
    //firebase.firestore.Fieldvalue.arrayUnion()
    //firebase.firestore.Fieldvalue.arrayRemove()
    enviarComentario(comentario){
        db
        .collection('posts')
        .doc(this.state.id)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                comment: comentario
            })
        })
    }
render() {
    return (
        <View style={styles.contenedor}>
            {console.log(this.props)}
            <Text>Comments: </Text>

            <FlatList data={this.state.commentsArr} keyExtractor={item=> item.createdAt.toString()} renderItem={({item})=> 
                <View style={styles.contenedorComment}>
                    <Text style={styles.commentOwner}>{item.owner} dice: </Text>
                    <Text style={styles.comentariosInput}>{item.comment}</Text>
                </View>
            }/>

            <View style={styles.contenedorInput}>
                <TextInput placeholder='Ingrese comentario'
                style={styles.input} keyboardType='default' onChangeText={text=> this.setState({comentarios: text})} value={this.state.comentarios}/>

                <TouchableOpacity onPress={()=> this.enviarComentario(this.state.comentarios)}>
                    <Text>Send comment</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}
}

export default  Comments

const styles = StyleSheet.create({
    input:{
        height: 35,
        borderWidth: 1,
        marginTop: 100,
        width: 300
    },
    contenedorInput:{
        display: 'flex',
        marginBottom: 30
    },
    contenedorComment:{
        borderWidth: 1,
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        height: 60, 
        width: 300,
        marginBottom: 5,
        borderRadius: 15,
        backgroundColor: '#BDC3C7'
    },
    contenedor:{
        backgroundColor: '#7F8C8D',
        flex: 1,
        display: 'flex' ,
        justifyContent: 'center',
        alignItems: 'center'
    }
})