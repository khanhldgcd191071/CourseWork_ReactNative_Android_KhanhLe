import * as SQLite from 'expo-sqlite';
import { ToastAndroid } from "react-native";

const db = SQLite.openDatabase('trip1.db')

export const createTable = ()=>{
    db.transaction((txn) => {
        txn.executeSql(
          "CREATE TABLE IF NOT EXISTS table_trips(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, destination TEXT, date TEXT, risk TEXT, description TEXT)",
          []
        );
    })
}

export const getTripTable = (setTripArray)=>{
    db.transaction((txn) => {
        txn.executeSql("SELECT * FROM table_trips", [], (tx, res) => {
            var temp = [];
            for (let i = 0; i < res.rows.length; ++i) {
              console.log("item:", res.rows.item(i));
              temp.push(res.rows.item(i));
              console.log("item:", temp);
            }
            setTripArray(temp);
          });
    })
}
export function addTrip(inputName, inputDestination, inputDate, inputRequire, inputDescription){
    db.transaction((tx) =>{
        tx.executeSql(
            "INSERT INTO table_trips (name, destination, date, risk, description) VALUES (?, ?, ?, ?, ?)",
            [inputName, inputDestination, inputDate, inputRequire, inputDescription],
            (tx, results) =>{
                console.log(`Trip ${inputName} has been added to the database`)
            }
        );
    })
}

export function editTripData(trip_id, inputName, inputDestination, inputDate, inputRequire, inputDescription) {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE table_trips set name=?, destination=? , date=? , risk=? , description=? where id=?",
        [inputName, inputDestination, inputDate, inputRequire, inputDescription, trip_id],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Toast("Trip updated successfully");
          } else Toast("Update Failed");
        }
      );
    });
};

const Toast = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};
export function deleteAllData(){
    db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM table_trips",
          [],
        );
    });
}
export function deleteOneData(trip_id){
    db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM table_trips WHERE id=?",
          [trip_id],
        );
    });
}