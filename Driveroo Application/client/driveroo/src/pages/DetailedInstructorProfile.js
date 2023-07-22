import { View, Text } from "react-native"
import InstructorDetails from "../components/DetailedInstructorProfileComponents/InstructorDetails"

const DetailedInstructorProfile = ({route}) => {
    if(!route.params){
        return(
            <View>
                <Text>Please Select an Instructor</Text>
            </View>
        )
    }
    const {instructor} = route.params


    return(
        <View >
            <InstructorDetails instructor={instructor}/>
        </View>
    )
}

export default DetailedInstructorProfile