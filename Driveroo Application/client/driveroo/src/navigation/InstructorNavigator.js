import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//pages
import MyProfilePage from "../pages/InstructorPages/MyProfilePage";
import MyRequestsPage from "../pages/InstructorPages/MyRequestsPage";
import ChatHome from "../pages/Chat/ChatHome";
import AppBar from '../components/Header/AppBar';

const Tab = createBottomTabNavigator();

const InstructorNavigator = () => {
	return(
		<Tab.Navigator>
			<Tab.Screen name="Home" component={MyProfilePage} options={{ header: (props) => <AppBar title="Home" {...props} />}} />
			<Tab.Screen name="Requests" component={MyRequestsPage} options={{ header: (props) => <AppBar title="Requests" {...props} />}} />
			<Tab.Screen name="Messages" component={ChatHome} options={{ header: (props) => <AppBar title="Messages" {...props} />}} />
		</Tab.Navigator>
	)
}

export default InstructorNavigator;
