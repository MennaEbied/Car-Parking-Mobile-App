import React from 'react';
import { View, Text, StyleSheet,Pressable,Image } from 'react-native';
import { router } from "expo-router";

const ParkingSlots = () => {
  const slots = [
    { id: 'A1', image: { uri: 'https://i.pinimg.com/474x/09/93/ef/0993ef778f6b7bb80621fbd96d2c837a.jpg' } },
    { id: 'A6', image: { uri: 'https://i.pinimg.com/474x/64/ba/04/64ba04d7c3b531ee14a4ffb35a4a619e.jpg' }},
    { id: 'A2',  },
    { id: 'A7', },
    { id: 'A3',image:{uri:'https://i.pinimg.com/474x/d4/93/e4/d493e4198352e55cc829ab1460191df9.jpg'} },
    { id: 'A8', },
    { id: 'A4',  },
    { id: 'A9',image:{uri:'https://i.pinimg.com/474x/d6/ac/d1/d6acd1ad0e61c8e6f51ca455b84c48a8.jpg'}  },
    { id: 'A5',image:{uri:'https://i.pinimg.com/474x/28/f3/10/28f310fec909f709058408b2edc2543e.jpg'}  },
    { id: 'A10', },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parking Slots!</Text>
      <View style={styles.slotsContainer}>
        {slots.map((slot,index) => (
          <View key={slot.id} style={styles.slotContainer}>
          <View
            style={[
              styles.slot,
            ]}
          >
            <Image source={slot.image} style={styles.image} ></Image>
            <Text style={styles.slotLabel}>{slot.id}</Text>
          </View>
          {index < slots.length  && <View style={styles.line} />}
          </View>
        ))}
        <Pressable
            style={styles.button}
            onPress={() => router.push("app-pages/home")}
                   >
                  <Text style={styles.continue}> Continue </Text>
                  </Pressable>
      </View>     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: "center",
    padding:15,
  },
  title: {
    color: 'black',
    fontSize: 25,
    fontWeight:"bold",
    paddingBottom:50,
    paddingTop:50
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
  },
  slot:{
  height:80,
  justifyContent: "center",
  
  },
  slotLabel: {
    color: '#989898',
    fontWeight: 'bold',
    marginLeft:50
  },
  image: {
    width: 120, 
    height: 55,  
    marginTop:15
  },
  line: {
    height: 2,
    width:130, 
    backgroundColor: 'black', 
  },
  button:{
    backgroundColor:"#3786e8",
    width:335,
    height:40,
    alignItems: 'center',
    borderRadius:30,
    paddingTop:8,
    marginTop:50
  },
 continue:{
  fontSize:17,
  fontWeight:"medium"
  }
});
export default ParkingSlots;