import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native'
import React,{Component, useState, useEffect, useContext} from 'react'
import AoCuentas from './AoCuentas';
import { FlatList } from 'react-native-gesture-handler';
import { Table, Row, Rows } from 'react-native-table-component';
import { LogBox, LogBoxNotification } from 'react-native-web-log-box'
import { useNavigation } from "@react-navigation/native";
import {ROUTES, screen} from '../../utils'
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../../context/AuthContext';


const { width, height } = Dimensions.get('window')

LogBox.ignoreLogs(["Invalid prop `textStyle` of type `array` supplied to `Cell`"]);
FlatList

const tableHead = ['Fecha', 'Detalle', 'Monto']
const tableData= [
  [ '08 AGOS', 'Deposito', '200,00'],
  [ '08 AGOS', 'Deposito', '200,00'],
  [ '08 AGOS', 'Retiro', '-1.000,00'],
  [ '08 AGOS', 'Retiro', '-1.000,00'],
  ['08 AGOS', 'Retiro', '-1.000,00']
]


export default function AoInicio(props) {

  const {userInfo, logout, isLoading} = useContext(AuthContext);    


  const navigation = useNavigation();

  const goToAoDetalle = () =>{
    navigation.navigate(ROUTES.AO_DETALLE)
    //navigation.navigate(screen.Ahorros.AoDetalle, {screen: screen.account.account})
  }

  return (
  <View style={styles.background}>
    
    <AoCuentas/>
    <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#9c9c9c'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData}  textStyle={styles.text}/>
        </Table>
    </View>

      <TouchableOpacity
        onPress={goToAoDetalle}
				style={styles.buttonContainer4}
			>
				<Text style={styles.buttonText4}>Ver Todos los Movimientos</Text>
			</TouchableOpacity>

  </View>


  )
}


const styles = StyleSheet.create({

  buttonContainer4: {
    width: width - 200,
    height: height / 14,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    justifyContent: 'center',
		alignItems: 'center',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
	},
	buttonText4: {
		fontSize: 15,
	},
  container: {
     padding: 16,
      paddingTop: 10, 
     },
  head: {
     height: 40, 
    backgroundColor: '#bababa'
   },
  text: { 
    margin: 6,
    
  },
  card: {
    backgroundColor: '#D5D5D5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },
  btnText:{
    height: 50,
    color:"#ffff",
    width:'80%',
    marginBottom:7,
    backgroundColor: '#088c84',
    paddingHorizontal: 10,
    borderColor: '#ffffff',
    borderRadius: 10,
    padding:10,
},
  background: {
  },
  userName: {
    color: '#000000',
    fontSize: 16,
  },
});