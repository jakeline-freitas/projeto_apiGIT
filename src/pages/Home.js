
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,FlatList, Keyboard, Alert } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import Theme from '../styles/Theme';
import {Input} from '../components/Input';
import { ItemGit } from '../components/ItemGit';
import api from '../services/api';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Home( { navigation} ) {
  
  const keyAsyncStorage = "@gitUsers:usuarios";

  const [ nickname,setNickname ] = useState('');
  const [ users,setUsers ] = useState([]);


  function navigationDetails( login){
      navigation.navigate('details', {user: login } );
  }

  async function handleSearchUser( ){
    try {
      Response = await api.get('/users/' + nickname);
      // console.log(Response)
      const {data} = Response;

      const obj = {
        id: data.id,
        nome: data.name,
        login: data.login,
        avatar_url: data.avatar_url,
      }

      setUsers( oldValue => [...oldValue, obj ] );
      const vetData = [...users, obj ]

      const jsonValue = JSON.stringify(vetData)
      await AsyncStorage.setItem(keyAsyncStorage, jsonValue);
     
      setNickname("");
      Keyboard.dismiss();

    } catch (error) {
      console.error(error);
    }
  }
  async function deleteUser( id ) {
    const newVet = users.filter( item => item.id != id );
    await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify( newVet ));
    
    setUsers(newVet); 
  }
  async function carregarUsuarios(){
    try {
      const retorno = await AsyncStorage.getItem(keyAsyncStorage)
      const value = JSON.parse(retorno)
      setUsers(value || [])
      
    } catch(e) {
      Alert.alert("Erro na leitura dos dados");
    }
      
  }

  useEffect( ()=>{
    carregarUsuarios();      
  } , []);

  return (

    <View style={GlobalStyles.screenContainer}>
      <AntDesign name="github" size={98} color={Theme.colors.primary} />  
      <Text style={styles.title}>GIT.Networking </Text>
      <Input placeholder="Digite o nickname do usuário"  onChangeText={setNickname} 
       onPress={ handleSearchUser } />
    
      <FlatList  data={users}  
          keyExtractor={item => item.id.toString()} 
          renderItem={ ({item}) =>  (
              <ItemGit name={item.nome} foto={item.avatar_url} onPress={ () => navigationDetails( item.login )} apagar={ () => deleteUser(item.id)}/>
          ) }
      /> 

    </View>

  );
}

const styles = StyleSheet.create({
  title:{
    fontSize: 30,
    fontFamily: Theme.fonts.robotoBold,
    color: Theme.colors.primary,
  }
})