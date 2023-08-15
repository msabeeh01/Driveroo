import React from "react";
import { HStack, IconButton, Icon, Text, Box, StatusBar } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

function AppBar(props) {
  return <>
    <Box safeAreaTop bg="indigo.600" />
    <HStack bg="indigo.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
      <HStack alignItems="center">
        <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
        <Text color="white" fontSize="20" fontWeight="bold">
          {props.title}
        </Text>
      </HStack>
      <HStack>
        {/* <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} /> */}
        {/* <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} /> */}
        {/* <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} /> */}
      </HStack>
    </HStack>
  </>;
}

export default AppBar;
