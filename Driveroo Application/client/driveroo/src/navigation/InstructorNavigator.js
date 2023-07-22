import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//pages
import MyProfilePage from "../pages/InstructorPages/MyProfilePage";
import MyRequestsPage from "../pages/InstructorPages/MyRequestsPage";

const Tab = createBottomTabNavigator();

const InstructorNavigator = () => {
	return(
		<Tab.Navigator>
			<Tab.Screen name="Home" component={MyProfilePage} />
			<Tab.Screen name="Requests" component={MyRequestsPage} />
		</Tab.Navigator>
	)
}

export default InstructorNavigator;
