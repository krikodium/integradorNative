import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'

class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            isMyLike: false,
            likesCount: props.data.likes.length, 
            photo: props.data.fotos,
            commentCount: props.data.comments.length
        }
    }

    componentDidMount(){
        let myLike = this.props.data.likes.includes(auth.currentUser.email)
        if(myLike){
            this.setState({
                isMyLike:true
            })
        }
    }

    like(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(resp => {
            this.setState({
                isMyLike:true,
                likesCount: this.state.likesCount + 1
            })
        })
        .catch(err=> console.log(err))
    }

    unlike(){
        db.collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(resp => {
            this.setState({
                isMyLike:false,
                likesCount: this.state.likesCount - 1
            })
        })
        .catch(err => console.log(err))
    }

render() {
    return (
    <View style={styles.container}>
        {console.log(this.props.data)}

        <Image style={styles.fotoPost} source={{uri: this.state.photo}}/>
        
        <View style={styles.contenedorComment}>
            <Text style={styles.like}>{
            this.state.isMyLike ?
                <TouchableOpacity onPress={()=> this.unlike()}>
                    <FontAwesome name='heart' color='red' size={32} style={styles.likeBtn}/>
                </TouchableOpacity>
            :
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome name='heart-o' color='red' size={32} style={styles.likeBtn}/>
                </TouchableOpacity>
                }  {this.state.likesCount} 
            </Text>
            <TouchableOpacity style={styles.commentBtn} onPress={()=> this.props.navigation.navigate('Comments', {id: this.props.id})}>
                <FontAwesome style={styles.propietario} name='comment-o' size={30} />
                <Text style={styles.commCount}>{this.state.commentCount}</Text>
            </TouchableOpacity>

        </View>
        <View style={styles.descripcion}>
            <Text style={styles.subtitle}>Descripcion:</Text>
            <Text>{this.props.data.description}</Text>
        </View>

        <TouchableOpacity onPress={()=> this.props.navigation.navigate('UserProfile', {
            screen:'UserProfile',
            params:{
                email: this.props.data.owner
            }
        })}>
            <Text>De: {this.props.data.owner}</Text>
        </TouchableOpacity>

    </View>
    )
}
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        paddingHorizontal:10,
        paddingVertical:16,
        justifyContent:'space-evenly',
        marginVertical:16,
        marginHorizontal:10,
        borderWidth:.5,
        borderRadius:10,
        backgroundColor:'#A8A7A7'
        
    },
    subtitle:{
        fontWeight:700,
        marginTop:5
    },
    fotoPost:{
        height: 200,
        borderRadius: '15px'
    },
    contenedorComment:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'baseline'
    },
    commentBtn:{
        display:'flex',
        flexDirection:'row',
        marginRight: 5
    },
    like:{
        marginTop:10,
        marginBottom:5
    },
    commCount:{
        marginTop: 5,
        marginLeft: 3
    }
})

export default Post