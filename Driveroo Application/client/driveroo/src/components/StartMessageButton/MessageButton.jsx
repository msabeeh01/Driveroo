import React from 'react'
import {Button} from 'native-base';
import {
  getDatabase,
  get,
  ref,
  push,
  update,
} from 'firebase/database';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const MessageButton = ({firebaseUID}) => {
  const {authState} = useAuth();
  const [myData, setMyData] = React.useState(null);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    const getMyData = async () => {
      const data = await findUser(authState?.user?.firebaseUID);
      setMyData(data);
    }
    
    getMyData();
  }, []);

  const findUser = async name => {
    const database = getDatabase();

    const mySnapshot = await get(ref(database, `users/${name}`));

    return mySnapshot.val();
  };

  const startChat = async () => {
    try {
      //find user and add it to my friends and also add me to his friends
      const database = getDatabase();
      const user = await findUser(firebaseUID);

      if (
        myData.chats &&
        myData.chats.findIndex(f => f.username === user.username) > 0
      ) {
        // don't let user add a user twice
        return;
      }

      // create a chatroom and store the chatroom id
      const newChatroomRef = push(ref(database, 'chatrooms'), {
        firstUser: myData.username,
        secondUser: user.username,
        messages: [],
      });

      const newChatroomId = newChatroomRef.key;

      const userChats = user.chats || [];
      //join myself to this user chat list
      update(ref(database, `users/${user.username}`), {
        chats: [
          ...userChats,
          {
            username: myData.username,
            avatar: myData.avatar,
            chatroomId: newChatroomId,
            fullName: myData?.fullName,
          },
        ],
      });

      const myChats = myData.chats || [];
      //add this user to my chat list
      update(ref(database, `users/${myData.username}`), {
        chats: [
          ...myChats,
          {
            username: user.username,
            avatar: user.avatar,
            chatroomId: newChatroomId,
            fullName: user?.fullName,
          },
        ],
      });

      navigation.navigate('Chat', { myData, selectedUser: {...user, chatroomId: newChatroomId }});

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button title="Mesage" onPress={startChat}>Message</Button>
  )
}

export default MessageButton
