import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import {db} from '../../firebase/config' //base de dat
import Post from '../../components/Post/Post'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            losPosteos: []
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
            let posteos = []
            docs.forEach(doc => { 
                posteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                losPosteos: posteos
            })
        })
    }
    
    render(){
        return(
            <>
            {
                this.state.losPosteos == null ? 

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Posts')}>
                    <Text style={styles.titulo}>PostGram</Text>
                    <Text>No hay posteos, subi uno.</Text>
                </TouchableOpacity> : 
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>PostGram</Text>
                <View style={styles.contenedor}>
                    <FlatList data={this.state.losPosteos} keyExtractor={(item)=> item.id.toString()} renderItem={({item})=> <Post navigation={this.props.navigation} id={item.id} data={item.data}/>}/>
                </View>
            </View>
            }
            </>
        )
    }
}

export default Home

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor:"#696969",
    },
    titulo:{
        fontSize: 25,
        backgroundColor: '#474747',
        textAlign:'center',
        height: 50
    },
    
})