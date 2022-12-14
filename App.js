import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllTrip from './Page/AllTrip';
import AddTrip from './Page/AddTrip';
import EditTrip from './Page/EditTrip';

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Navigator initialRouteName="All Trip">
          <Screen name="All Trip" component={AllTrip}></Screen>
          <Screen name="Add Trip" component={AddTrip}></Screen>
          <Screen name="Edit Trip" component={EditTrip}></Screen>
        </Navigator>
      </NavigationContainer>
  );
}