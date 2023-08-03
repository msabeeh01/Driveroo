import React, {useLayoutEffect, useState, useCallback} from 'react'
import { Stack } from 'native-base'
import { GiftedChat } from 'react-native-gifted-chat'
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { auth, database } from '../../config/firebase';

export const Chat = () => {
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('cratedAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      console.log('snapshot');
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    });
    return () => unsubscribe();
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  return (
    <Stack flex={1}>
      <GiftedChat 
        messages={messages} 
        onSend={messages => onSend(messages)}
        user={{_id: auth?.currentUser.email, avatar: 'https://i.pravata.cc/300'}} />
    </Stack>
  )
}
