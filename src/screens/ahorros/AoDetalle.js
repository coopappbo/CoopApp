import { StyleSheet, Text, View, Dimensions, Touchable, TouchableOpacity, Button, Modal } from 'react-native'
import React,{Component, useContext, useState, useEffect} from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from '../../utils';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config";
import { AuthContext } from '../../context/AuthContext';


const { width, height } = Dimensions.get('window')


const data = [
  {id:'Garante', name: 'Edson Chavez Chavez'},
  {id:'Garante', name: 'Carlos'},
  {id:'Garante', name: 'William'},
  {id:'Fecha Otr', name: '12-12-2020'},
  {id:'Fecha Fin', name: '12-12-2022'},
  {id:'Plazo', name: '30 Coutas'},
  {id:'Taza', name: '30%'},

]

export default function AoDetalle({route, navigation}) {

  const { numeroCuenta, desproducto, saldo } = route.params;
  console.log(numeroCuenta)
  console.log(desproducto)
  console.log(saldo)
  const [Movimientos, setMovimientos] = useState([]);
  const {userInfo} = useContext(AuthContext); 
  const [message, setMessage] = useState('')
  const [ViewDetalle, setViewDetalle] = useState(false)
  const [existeMovimientos, setExisteMovimientos] = useState(false);



  const getMovimientos = () => {
    axios
      .get(`${BASE_URL}/ahorros/mov/${numeroCuenta}/5`, {
        headers: {Authorization: `Bearer ${userInfo.access_token}`},
      })
      .then(res => {

        let Movimientos5 = res.data;
        setMovimientos(Movimientos5)
        AsyncStorage.setItem('Movimientos', JSON.stringify(Movimientos5));   
     
      })
      .catch(e => {
        console.log(`movimientos list error ${e}`);
        console.log(codigoUsuairo);
      });
  };

  if(!existeMovimientos)
  {
    getMovimientos();
    setExisteMovimientos(true);
  }



  let MovimientosLista5= Movimientos;

   MovimientosLista5 = MovimientosLista5.filter(function(item){
      return item.cuenta == numeroCuenta;
    }).map(function({ fecha, glosa,importe}){
      var date = new Date(fecha)
          return {date, glosa, importe};
   });




  const optionsPerPage = [0];
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[10]);


  const item = ({item})=>{
    return(
      <View style={{ flexDirection: 'row'}}>
        <View style={{width:100, backgroundColor:'white'}}>
        <Text>{item.id}</Text>
        </View>
        <View style={{width:100, backgroundColor:'white'}}>
        <Text>{item.name}</Text>
        </View>
      </View>
    )
  }





  return (
    <>

    <View style={styles.background}>
    <ScrollView>
  
    
    <View style={styles.cardView}>
     
            
        <View style={styles.textView}>
        <Text style={styles.itemTitle}>{numeroCuenta}  </Text> 
        <Text style={styles.itemDescription}>{desproducto}</Text>
        <View style={styles.btnFechas}>
        <Text style={styles.itemSaldo}>Saldo: {saldo} bs. </Text>

  
        </View>
      </View>
    </View>


    <View style={styles.cardViewTable}>
    <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title   textStyle={styles.text}>Fecha</DataTable.Title>
          <DataTable.Title  textStyle={styles.text}>Glosa</DataTable.Title>
          <DataTable.Title  textStyle={styles.text}>Capital</DataTable.Title>
          <DataTable.Title numeric  textStyle={styles.text}>TOTAL</DataTable.Title>
        </DataTable.Header>


        {MovimientosLista5.map((cuentas,index ) =>(
        <>
        <DataTable.Row >
          <DataTable.Cell  textStyle={styles.text}>{MovimientosLista5[index].date.getFullYear()}/{MovimientosLista5[index].date.getMonth()}/{MovimientosLista5[index].date.getDate()}</DataTable.Cell>
          
          <DataTable.Cell textStyle={styles.text}>{MovimientosLista5[index].glosa.toString()}</DataTable.Cell>
          <DataTable.Cell textStyle={styles.text} numeric>{MovimientosLista5[index].importe.toString()}</DataTable.Cell>
          <DataTable.Cell textStyle={styles.text} numeric>{MovimientosLista5[index].importe.toString()}</DataTable.Cell>
        </DataTable.Row>
        
        </>
        )
        )}
           
        <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
      
       
      </DataTable>
      </View>
    </ScrollView>
    </View>
    </>
  )
}

const styles = StyleSheet.create({


  header: { height: 50, backgroundColor: '#2bb461', borderRadius: 10 ,margin:3  },
  text: { 
    margin: 2,
    fontSize: 15,
    
  },
    bordertable: { 
      borderWidth: 2, borderColor: '#c8e1ff'
    
  },

  cardViewTable: {
    width: width - 20,
    height: height / 1.9,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    flex:1,
},



button: {
  position: 'absolute',
  bottom: 70,
  width: '25%',
  backgroundColor: '#2bb461',
  height: 58,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  
},

wrapper: {
paddingTop:80,
paddingHorizontal:20,
  
},


TitleText: {
paddingHorizontal:20,
 fontSize:18,
 fontWeight:'bold'
  
},


wrapperItems: {
  borderRadius: 30,
marginTop:30,
backgroundColor:'white'
},


textDetalle: { 
  fontSize: 13,
},







  container: {

    padding: 16,
     paddingTop: 30, 
     backgroundColor: '#fff'
    },
 head: {
    height: 40, 
   backgroundColor: '#f1f8ff'
  },


  btnFechas: {
    flexDirection: 'row',
  },
  cardView: {
    width: width - 20,
    backgroundColor: '#2bb461',
    margin: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
},
textView: {
    position: 'relative',
    bottom: 25,
    margin: 30,
    left: 5,
},
itemTitle: {
    color: 'white',
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom:5,
    fontWeight: "bold",
    elevation: 5
},
itemDescription: {
    color: 'white',
    fontSize: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginBottom:5,
},
itemSaldo: {
  alignSelf:'flex-end',
  color: 'white',
  fontSize: 18,
  shadowColor: '#000',
  shadowOffset: { width: 0.8, height: 0.8 },
  shadowOpacity: 1,
  shadowRadius: 3,
  elevation: 5

  
},
btnText:{
  margin: 10,
  color:"#ffff",
  backgroundColor: '#088c84',
  paddingHorizontal: 70,
  borderColor: '#ffffff',
  borderRadius: 20,
  padding:10,
},

btnTextGarantes:{
  position: 'absolute',
  marginTop:33,
  alignSelf:'flex-end',
  backgroundColor: '#088c84',
  borderColor: '#ffffff',
  borderRadius: 10,
  padding:12,


},



button: {
  position: 'absolute',
  bottom: 70,
  width: '25%',
  backgroundColor: '#2bb461',
  height: 58,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  
},

})
