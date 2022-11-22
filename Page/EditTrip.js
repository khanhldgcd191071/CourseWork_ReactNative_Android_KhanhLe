import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { deleteOneData, editTripData } from '../Database/DatabaseHelper';

export default function EditTrip({navigation, route}){
    const { trip_id, nameTrip, destinationT, dateT, riskT, descriptionT } = route.params;
    const [inputName, setInputName] = useState(nameTrip);
    const [inputDestination, setInputDestination] = useState(destinationT);
    const [inputDate, setInputDate] = useState(dateT);
    const [inputDescription, setInputDescription] = useState(descriptionT);
    const [inputRequire, setInputRequire] = useState(riskT)
    const [radioYes, setRadioYes] = useState(true)
    const [radioNo, setRadioNo] = useState(false)

    const editTrip = ()=>{
        if(inputName == ""){
            alert('You need to fill all required fields')
        }else if(inputDestination == ""){
            alert('You need to fill all required fields')
        }else if(inputDate == ""){
            alert('You need to fill all required fields')
        }else if(inputRequire == ""){
            alert('You need to fill all required fields')
        }else{
            editTripData(trip_id, inputName, inputDestination, inputDate, inputRequire, inputDescription);
            navigation.navigate('All Trip');
        }
    }

    const deleteTrip = () =>{
        try{
            deleteOneData(trip_id);
            navigation.navigate("All Trip")
        }catch(error){
            console.log(error)
        }
        
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (inputRequire == "Yes"){
                setRadioYes(true)
                setRadioNo(false)
            }else if (inputRequire == "No"){
                setRadioYes(false)
                setRadioNo(true)
            }
        });
        return unsubscribe;
      }, [navigation]);
    
    useEffect(() => {
        if (radioYes == true && radioNo == false){
            setInputRequire("Yes")
        }else if (radioNo == true && radioYes == false){
            setInputRequire("No")
        }else{
            setInputRequire("")
        }
    }, [radioYes, radioNo]);

    useEffect(() => {
        if (radioYes == true){
            setRadioNo(false)
        }
    }, [radioYes]);

    useEffect(() => {
        if (radioNo == true){
            setRadioYes(false)
        }
    }, [radioNo]);
  

    return(
        <View style={styles.container}>
            <Text style={styles.addtripText}>
                Name:<Text style={styles.addtripRedStar}>*</Text>
            </Text>
            <TextInput 
                placeholder='Name of the trip'
                defaultValue={inputName}
                style={styles.addtripInput} 
                multiline = {true}
                onChangeText= {(e)=> setInputName(e)}
            />

            <Text style={styles.addtripText}>
                Destination:<Text style={styles.addtripRedStar}>*</Text>
            </Text>
            <TextInput 
                placeholder='Destination of the trip' 
                defaultValue={inputDestination}
                style={styles.addtripInput} 
                multiline = {true}
                onChangeText= {(e)=> setInputDestination(e)}
            />

            <Text style={styles.addtripText}>
                Date of the Trip:<Text style={styles.addtripRedStar}>*</Text>
            </Text>
            <TextInput 
                placeholder='dd/mm/yyyy' 
                defaultValue={inputDate}
                style={styles.addtripInput} 
                multiline = {true}
                onChangeText= {(e)=> setInputDate(e)}
            />

            <Text style={styles.addtripText}>
                Require Risks Assessment:<Text style={styles.addtripRedStar}>*</Text>
            </Text>
            <View style={styles.addtripRadioButtonView}>
                <View style={styles.radioButtonContainer}>
                    <CheckBox
                        title="Yes"
                        disabled={false}
                        value={radioYes}
                        onValueChange={(e) => setRadioYes(e)}
                        style={styles.checkboxButton}
                    />
                    <Text style={styles.checkboxText}>Yes</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                    <CheckBox
                        title="No"
                        disabled={false}
                        value={radioNo}
                        onValueChange={(e) => setRadioNo(e)}
                        style={styles.checkboxButton}
                    />
                    <Text style={styles.checkboxText}>No</Text>
                </View>
            </View>

            <Text style={styles.addtripText}>
                Description:
            </Text>
            <TextInput 
                placeholder='Description...' 
                defaultValue={inputDescription}
                style={styles.addtripInput} 
                multiline = {true}
                numberOfLines={4}
                onChangeText= {(e)=> setInputDescription(e)}
            ></TextInput>

            <View>
                <Button
                    title="Edit Trip Data"
                    onPress={editTrip}
                />
            </View>
            <View style={{marginTop:10}}>
                <Button
                    title="Delete this Trip"
                    onPress={deleteTrip}
                    color="#a00"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    addtripText:{
        fontSize: 20,
    },
    addtripRedStar:{
        fontSize: 20,
        color:'#a00'
    },
    addtripInput:{
        borderWidth: 3,
        borderColor:'#019',
        fontSize: 23,
        marginBottom: 10,
        padding:5,
    },
    addtripRadioButtonView:{
        display:'flex',
        flexDirection:'row',
    },
    radioButtonContainer:{
        display: 'flex',
        flexDirection:'row',
        marginRight:100
    },
    checkboxButton:{
        width:30,
        height:30,
        borderRadius:20,
    },
    checkboxText:{
        fontSize: 20,
        marginLeft:5,
    },
    testTextValue:{
        marginTop:10,
    },
});