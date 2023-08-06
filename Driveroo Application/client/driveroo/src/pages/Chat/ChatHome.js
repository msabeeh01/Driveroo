import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { getDatabase, get, ref, set } from 'firebase/database';
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";

const ChatHome = () => {
  const { authState } = useAuth();
  const [myData, setMyData] = React.useState(null);
  const [chats, setChats] = React.useState([]);
  const userID = authState?.user?.firebaseUID;

  React.useLayoutEffect(() => {
    const getUser = async () => {
      try {
        const database = getDatabase();
        //first check if the user registered before
        const user = await findUser(userID);
        if (user) {
          setMyData(user);
          setChats(user.chats || []);
        }

        console.log(user);
        console.log(chats)

        // set friends list change listener
        const myUserRef = ref(database, `users/${userID}`);
        onValue(myUserRef, snapshot => {
          const data = snapshot.val();
          setChats(data.chats);
          setMyData(prevData => ({
            ...prevData,
            chats: data.chats,
          }));
        });
        
      } catch (error) {
        
      }
    }
    
    getUser()

  }, [userID]);

  const findUser = async name => {
    const database = getDatabase();

    const mySnapshot = await get(ref(database, `users/${name}`));

    return mySnapshot.val();
  };

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Inbox
      </Heading>
      <FlatList data={chats} renderItem={({
      item
    }) => <Box borderBottomWidth="1" _dark={{
      borderColor: "muted.50"
    }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack space={[2, 3]} justifyContent="space-between">
              <Avatar size="48px" source={{
          uri: item.avatar
        }} />
              <VStack>
                <Text _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold>
                  {item.fullName}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                  {item.recentText}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" alignSelf="flex-start">
                {item.timeStamp}
              </Text>
            </HStack>
          </Box>} keyExtractor={item => item.chatroomId} />
    </Box>
  )
}

export default ChatHome;
