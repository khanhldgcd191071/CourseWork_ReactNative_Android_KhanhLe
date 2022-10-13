import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { addTrip } from '../Database/DatabaseHelper';

export default function AddTrip({navigation}){
    
    const [inputName, setInputName] = useState("");
    const [inputDestination, setInputDestination] = useState("");
    const [inputDate, setInputDate] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputRequire, setInputRequire] = useState("")
    const [radioYes, setRadioYes] = useState(true)
    const [radioNo, setRadioNo] = useState(false)

    const summitTripData =() =>{
        if(inputName == ""){
            alert('You need to fill all required fields')
        }else if(inputDestination == ""){
            alert('You need to fill all required fields')
        }else if(inputDate == ""){
            alert('You need to fill all required fields')
        }else if(inputRequire == ""){
            alert('You need to fill all required fields')
        }else{
            addTrip(inputName, inputDestination, inputDate, inputRequire, inputDescription);
            alert('TRIP DATA SUMMITION'
            +'\n\nTrip name: '+(inputName)
            +'\nDestination: '+(inputDestination)
            +'\nDate of the Trip: '+(inputDate)
            +'\nRisk Assessment: '+(inputRequire)
            +'\nDescription: '+(inputDescription))
            navigation.navigate('All Trip')
        }
    }

    useEffect(() => {
        if (radioYes == true && radioNo == false){
            setInputRequire("Yes")
        }else if (radioYes == false && radioNo == true){
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
                style={styles.addtripInput} 
                multiline = {true}
                onChangeText= {(e)=> setInputName(e)}
            />

            <Text style={styles.addtripText}>
                Destination:<Text style={styles.addtripRedStar}>*</Text>
            </Text>
            <TextInput 
                placeholder='Destination of the trip' 
                style={styles.addtripInput} 
                multiline = {true}
                onChangeText= {(e)=> setInputDestination(e)}
            />

            <Text style={styles.addtripText}>
                Date of the Trip:<Text style={styles.addtripRedStar}>*</Text>
            </Text>
            <TextInput 
                placeholder='dd/mm/yyyy' 
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
                        // onPress = {chooseYes}
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
                        // onPress = {chooseNo}
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
                style={styles.addtripInput} 
                multiline = {true}
                numberOfLines={4}
                onChangeText= {(e)=> setInputDescription(e)}
            ></TextInput>

            <Button
                title="Add to the Database"
                onPress={summitTripData}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
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