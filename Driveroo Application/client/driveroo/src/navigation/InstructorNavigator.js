import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//pages
import MyProfilePage from "../pages/InstructorPages/MyProfilePage";

const Tab = createBottomTabNavigator();

const InstructorNavigator = () => {
	return(
		<Tab.Navigator>
			<Tab.Screen name="Home" component={MyProfilePage} />
		</Tab.Navigator>
	)
}

export default InstructorNavigator;
