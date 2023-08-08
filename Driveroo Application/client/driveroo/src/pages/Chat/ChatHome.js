import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { getDatabase, get, ref, set } from 'firebase/database';
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, Pressable } from "native-base";
import { useNavigation } from '@react-navigation/native';

const ChatHome = () => {
  const { authState } = useAuth();
  const [myData, setMyData] = React.useState(null);
  const [chats, setChats] = React.useState([]);
  const navigation = useNavigation();
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

  }, [userID, chats]);

  const findUser = async name => {
    const database = getDatabase();

    const mySnapshot = await get(ref(database, `users/${name}`));

    return mySnapshot.val();
  };

  const goToChat = (user) => {
    navigation.navigate('Chat', {myData, selectedUser: user});
  }

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Inbox
      </Heading>
      <FlatList paddingLeft="4" paddingRight="4" data={chats} renderItem={({ item }) =>
        <Pressable onPress={() => goToChat(item)}>
          <Box borderBottomWidth="1" borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack space={[2, 3]} justifyContent="space-between">
              <Avatar size="48px" source={{ uri: item.avatar }} />
              <VStack>
                <Text color="coolGray.800" bold>
                  {item.fullName}
                </Text>
              </VStack>
              <Spacer />
            </HStack>
          </Box>
        </Pressable>
      } keyExtractor={item => item.chatroomId} />
    </Box>
  )
}

export default ChatHome;
