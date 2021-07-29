import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import Theme from '../styles/Theme';
import Ionicons from 'react-native-vector-icons/Feather'
import { Avatar } from 'react-native-elements';


export function ItemGit({name, onPress, foto, apagar }) {

  return (
    <View style={ styles.container}>
      <View style={styles.avatar}><Avatar rounded source={{uri:foto,}}/></View>
      
      <Text style={styles.nickname}>{name}</Text>
      <View style={styles.separador}></View>  

      <View style={styles.viewButton}>
        <View style={styles.separador}></View>
        <TouchableOpacity style={styles.button} onPress={ onPress } >
            <Ionicons name="eye" size={20} color={Theme.colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={ apagar } >
          <Ionicons name="trash-2" size={20} color={Theme.colors.gray}/>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        marginTop:15,
        width: '95%',
        height: 50,
        backgroundColor:'#DEE4E4',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 5,
    },
    nickname:{
        paddingLeft: 10,
        fontSize: 17,
        fontFamily: Theme.fonts.rebotoRegular,
    },
    viewButton:{
      flexDirection: "row",
      justifyContent:'flex-start',
      alignContent:'center'
    },
    button:{
        
        padding:10,
    },
    avatar:{
      padding:20
    }
   
});