import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

export default function ElementsScreen({navigation}) {
  const [elements, setElements] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    firestore()
      .collection('Elements')
      .onSnapshot(snapshot =>
        setElements(
          snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
          })),
        ),
      );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.elementsWrapper}>
        <Text style={styles.sectionTitle}>Design Data Book</Text>
        <Text style={styles.elementTitle}>ELEMENTS</Text>

        <ScrollView style={styles.elements}>
          {elements
            .filter(element =>
              element.name.toLowerCase().includes(searchString.toLowerCase()),
            )
            .map(element => (
              <TouchableOpacity
                style={styles.item}
                key={element.id}
                onPress={() =>
                  navigation.navigate('SubElementsScreen', {
                    name: element.name,
                    id: element.id,
                  })
                }>
                <View style={styles.itemLeft}>
                  <View style={styles.square}></View>
                  <Text style={styles.itemText}>{element.name}</Text>
                </View>
                <View style={styles.circular}></View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      {/* search */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.searchElement}>
        <TextInput
          style={styles.input}
          placeholder={'Search a element'}
          value={searchString}
          onChangeText={string => setSearchString(string)}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  elementsWrapper: {
    paddingTop: 35,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fdfdfd',
    textAlign: 'center',
    backgroundColor: '#FE7F9C',
    padding: 7,
    marginHorizontal: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  elementTitle: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#FE7F9C',
    color: '#fdfdfd',
    marginHorizontal: 100,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
  elements: {
    height: '79%',
    backgroundColor: '#fdfdfd',
    marginTop: 71,
    marginHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  searchElement: {
    position: 'absolute',
    top: 123,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    padding: 2,
    paddingHorizontal: 15,
    marginBottom: 11,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    color: 'black',
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 3,
    borderColor: '#FE7F9C',
    borderWidth: 2,
    marginHorizontal: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#FE7F9C',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#FE7F9C',
    borderWidth: 2,
    borderRadius: 5,
  },
});
