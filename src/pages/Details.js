import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import Theme from '../styles/Theme';
import api from '../services/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


export function Details({ route }) {
  
  const [user, setUser] = useState({});

  async function carregarUsuarios( nickname ){
    try {
      response = await api.get('/users/' + nickname);
      // console.log(response)
      const {data} = response;

      const obj = {
        id: data.id,
        name: data.name,
        login: data.login,
        company: data.company,
        bio: data.bio,
        avatar_url: data.avatar_url,
        url: data.url,
        followers: data.followers,
        public_repos: data.public_repos
      }

      setUser( obj );
  
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(()=>{
      const { user  } = route.params;
      carregarUsuarios( user );
    
  },[]);


  return (
    <View style={GlobalStyles.screenContainer}>
      <ScrollView>
        <View style={styles.perfil}>
              <Image style={styles.tinyLogo} source={{uri: user.avatar_url }}/>
              <Text style={ styles.title }>{ user.name}</Text> 
              <Text style={styles.textSmall }>{ user.url}</Text>
              {user.company  && <Text style={styles.textRegular}>Empresa:{ user.company }</Text> }

              <Text style={styles.textRegular}>{ user.bio }</Text> 

          </View>

          <View style={styles.info}>
            
              <View style={styles.caixas}>
                <Text style={styles.titleInfo}>Repositórios</Text>
                <View style={ styles.infoCount }>
                  <MaterialCommunityIcons name="source-repository" size={50} color="black" />
                  <Text style={ styles.textCount}>{user.public_repos}</Text>
                </View>  
              </View>

              <View style={styles.caixas}>
                <Text style={styles.titleInfo}>Seguidores</Text>
                <View style={ styles.infoCount }>
                  <MaterialCommunityIcons name="account" size={40} color="black" />
                  <Text style={ styles.textCount}>{user.followers}</Text>
                </View>
              </View>
          </View>

      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  perfil:{
    alignItems:'center',
  },
  info:{
    marginTop:70,
    width: '75%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  infoItem:{
  },
  infoCount:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  caixas:{
    justifyContent:'center',
    borderWidth:1,
    margin:5,
    padding:10
  },
  textCount:{
    fontSize: 25,
    fontFamily: Theme.fonts.robotoBold,
    color: Theme.colors.black
  },
  titleInfo:{
    fontSize:22,
    fontFamily: Theme.fonts.rebotoRegular,
  },
  title:{
    fontSize: 30,
    fontFamily: Theme.fonts.robotoBold,
    color: Theme.colors.primary,
  },
  textSmall:{
    fontSize: 14,
    fontFamily: Theme.fonts.rebotoRegular,
    color: Theme.colors.gray
  },
  textRegular:{

    textAlign:'left',
    marginTop: 20,
    marginBottom:0,
    fontSize: 20,
    fontFamily: Theme.fonts.rebotoRegular,
    color: Theme.colors.gray
  },

  tinyLogo: {
    width: 140,
    height: 140,
    borderRadius:90,
  },

})