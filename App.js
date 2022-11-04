import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Alert,Text, View, StyleSheet, TextInput, TouchableOpacity,ImageBackground  } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
export default function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('euro');
  const [items, setItems] = useState([
    {label: '€ Euro', value: 'euro'},
    {label: '$ Dollar', value: 'dollar'}
  ]);
 
var [totalReal, setTotalReal] = useState('');
var [totalEuro, setTotalEuro] = useState('');
var [cotacao, setcotacao] = useState('');

async function anuncio(){
  await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
  await AdMobRewarded.requestAdAsync();
  await AdMobRewarded.showAdAsync();
}

async function Calculartotal(valor){
  anuncio();
  console.log(valor)
  
  response = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL').then((response) => {
  console.log(response.data['EURBRL']['bid']);

  console.log(response.data['USDBRL']['bid']);
  var cotacaodollar = response.data['USDBRL']['bid'];


 var cotacaoeuro = response.data['EURBRL']['bid'];

if(totalReal > 0){
  totalReal = totalReal;
}else{
  totalReal = 0;
}
cotacaocerta='euro';
cotacaodois='EURO';
if(valor=='euro'){
  cotacaocerta=cotacaoeuro;
  cotacaodois='EURO';
}else{
  cotacaocerta=cotacaodollar;
  cotacaodois='DOLLAR';
}

 console.log('ENTROU NA FUNÇÃO')
  totalEuro =  parseFloat(totalReal) / parseFloat(cotacaocerta);

 Alert.alert("TOTAL EM "+cotacaodois+" "+totalEuro.toFixed(2),"");

});
  }
  
  return (
    <View style={styles.container}>
       <Text style={styles.titulo}>Euro Real </Text>

       <TextInput style={styles.campo} placeholder="Total em Reais.. "
       keyboardType="numeric"
       onChangeText={(totalReal) => setTotalReal(totalReal)}
       />

      <View style={{paddingRight:30}}>
       <DropDownPicker
       style={{backgroundColor:'#fff',
       borderRadius:35,
       marginLeft:15, 
       marginRight:15, 
       marginBottom: 50
      
      }}

      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    /></View>

       <TouchableOpacity style={styles.botao} onPress={()=>alert  <      (Calculartotal(value))}>
            <Text>CALCULAR</Text>
       </TouchableOpacity>
       <ImageBackground  
    source={require('./assets/bdreuro.webp')} 
    style={{flex:1, opacity:0.1}}  
/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4169E1"
         },

titulo:{
   textAlign:'center',
   marginTop: 40,
   marginBottom: 40,
   fontSize: 80,
   color: "#FFF"
  },

  campo:{
    backgroundColor: "#FFF",
    borderRadius: 70,
    margin: 15,
    padding: 10,
    fontSize: 25,
    color: "#006400"
  },

  botao:{
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    backgroundColor: '#FFD700',
    padding: 20
  },

 });
