import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image  } from 'react-native';
import { createTable, deleteAllData, getTripTable } from '../Database/DatabaseHelper';

const RenderTrip = ({item, navigation}) =>{
    return (
        <TouchableOpacity
        onPress={() =>
            navigation.navigate("Edit Trip", {
              trip_id: item.id,
              nameTrip: item.name,
              destinationT: item.destination,
              dateT: item.date,
              riskT: item.risk,
              descriptionT: item.description,
            })
          }
        >
        <View style={styles.recicycleItemView}>
            <View style={styles.recicycleItemRow1}>
                <Text style={styles.recicycleItemText1}>{item.id}</Text>
            </View>
            <View style={styles.recicycleItemRow2}>
                <Text>{item.name}</Text>
                <Text>{item.destination}</Text>
            </View>
            <View style={styles.recicycleItemRow3}>
                <Text>{item.date}</Text>
                <Text>Require Assessment: {item.risk}</Text>
            </View>
        </View>
        </TouchableOpacity>
    );
}


export default function AllTrip( {navigation} ){
    const [tripArray, setTripArray] = useState([]);

    const getTripData = () =>{
        try{
            getTripTable(setTripArray)
        }catch(error){
            console.log(error)
        }
    }

    const deleteAllTrip = ()=>{
        try{
            deleteAllData();
            navigation.push("All Trip");
            navigation.navigate("All Trip")
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            createTable()
            getTripData();
        });
        return unsubscribe;
      }, [navigation]);

    useEffect(() => {
        // testTable()
        
    }, []);
    


    return(
        // <ScrollView>
            <View style={styles.container}>
                <View style={styles.buttonWrapper}>
                    <View style={styles.addButton}></View>
                    <View style={styles.deleteButton}>
                       <Button
                            title="Delete all Trip"
                            onPress={deleteAllTrip}
                            color="#a00"
                            
                        /> 
                    </View>
                    
                    
                </View>
                <FlatList 
                    data={tripArray} 
                    renderItem={({ item }) => <RenderTrip item={item} navigation={navigation} />} 
                    keyExtractor={(item) => item.id}
                />
                <TouchableOpacity
                    style = {styles.floatingTouchableOpacity}
                    onPress = {() => navigation.navigate('Add Trip')}
                >
                    <Image
                        style = {styles.floatingButton}
                        source={{uri:'https://raw.githubusercontent.com/tranhonghan/images/main/plus_icon.png'}}
                    />
                </TouchableOpacity>
            </View>
        // </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        height:'100%'
    },
    buttonWrapper:{
        display:'flex',
        flexDirection:'row'
    },
    addButton:{
        flex: 0.6,
    },
    deleteButton:{
        flex: 0.4,
    },
    recicycleItemView: {
        marginTop: 9,
        marginBottom: 9,
        display: 'flex',
        flexDirection:'row',
        borderWidth: 3,
        borderColor:"#000"
    },
    recicycleItemRow1:{
        marginRight: 5,
        flex: 0.13,
    },
    recicycleItemText1:{
        fontSize: 40,
    },
    recicycleItemRow2:{
        paddingTop: 7,
        flex: 0.42,
    },
    recicycleItemRow3:{
        paddingTop:7,
        flex: 0.45,
    },
    floatingTouchableOpacity:{
        position: 'absolute',
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent:'center',
        right: 25,
        bottom: 20,
    },
    floatingButton:{
        resizeMode: 'contain',
        width: 55,
        height: 55,
    }

});