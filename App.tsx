
import { Button, FlatList, Text, View,Image,StyleSheet, TouchableOpacity, ScrollView,Dimensions,ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({navigation, route}) {
  const limit = 40;
  const Url = `http://gateway.marvel.com/v1/public/characters?ts=1728407475&apikey=cccf70b95eca73643616b5a2dcc85084&hash=75d35aa1aae2ac93884569a534ebe7f4&limit=100`
  const [infos, setInsfos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(Url)
      .then(response => {
        setInsfos(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return<ActivityIndicator
  size="large"
  color="#FF0000"
  animating={true}
  style={{ margin: 10,flex:1}}
/>;
  if (error) return <Text>Error: {error.message}</Text>;
  
  
  return (

    <View style={styles.mainView} >
    
      <FlatList
        data={infos.data.results}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle = {styles.Grid}
        renderItem={({item})=> (
          
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => navigation.navigate('Details',{element:item})}>
              <Image
                source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }}
                style={styles.image} />
                <Text style={styles.title}>
                {JSON.stringify(item.name)}
              </Text>
            </TouchableOpacity>
              
          

          )
        }
      />
    </View>
    
  );
}



function SettingsScreen({navigation, route}) {

  const flatList = (list) => (
    <FlatList style={styles.flat}
         data={list}
         renderItem={({item})=> (
          <Text style={styles.listText}>
            {item.name}
          </Text>
         )}
         scrollEnabled={true}
         />
        
  
  );

  const {element: element} = route.params;
  const screenHeight = Dimensions.get('window').height;
  
  return (

    <ScrollView style={{ flex: 1, backgroundColor: '#191818' }} nestedScrollEnabled={true}>
      <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5,backgroundColor:'#FF0000',borderRadius:10}}>
        <Image 
        source={{ uri: `${element.thumbnail.path}.${element.thumbnail.extension}` }}
        style={styles.pfp} />
        <Text style={{fontSize:30,color:'#ffffff',fontWeight:'bold',paddingBottom:10}}>{element.name}</Text>
      </View>

      <View style={{height:2,backgroundColor:"#E8E4E4", marginLeft:15,marginRight:15, borderRadius:15}}></View>

        <View  style={{ marginVertical: 10 }}>
          <Text style={styles.listTitle}>COMICS</Text>
          {flatList(element.comics.items)}
        </View>
      
      
      <View  style={{ marginVertical: 10 }}>
        <Text style={styles.listTitle}>SERIES</Text>
        {flatList(element.series.items)}
      </View>
      
      <View  style={{ marginVertical: 10 }}>
        <Text style={styles.listTitle}>STORIES</Text>
        {flatList(element.stories.items)}
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
        <TouchableOpacity style={{width:200,height:50,backgroundColor:'#FF0000',alignItems:'center',justifyContent:'center',borderRadius:5,borderColor:'#ffffff',borderWidth:0.5}}
         onPress={()=> navigation.navigate('Home')}>
          <Text style={{fontSize:20,fontWeight:'bold',color:'#ffffff',fontFamily:'monospace'}}>
            Back
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
    
  );
}

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
      
        headerStyle: {
          backgroundColor: '#0f0f0f',
        },
        headerTintColor: '#E8E4E4', 
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          
          
        },
      }}>
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Details" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}





const styles = StyleSheet.create({
  mainView:{
    backgroundColor:'#FF0000'
  },
  Grid:{
    paddingHorizontal:5,
    alignContent:'center'
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#191818',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
    height: 150,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 10,
    marginTop:10,
    textAlign: 'center',
    color:'#ffffff'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ddd', 
  },
  pfp: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#ddd',
    margin:10,
    borderWidth:1.5,
    borderColor:'#000000'  
  },
  listTitle:{
    alignSelf:'center',
    width:200,
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
    marginTop:5,
    textAlign: 'center',
    color:'#E8E4E4',
    fontFamily:'sans-serif-condensed',
    borderWidth:0.5,
    borderColor:'#918B8B',
    borderRadius:10,
  },
  listText: {
    fontSize: 16,
    color: '#E8E4E4',
    margin:5,
    padding:4,
    paddingRight:15,
    paddingLeft:15,
    marginLeft:16,
    lineHeight: 24,
    textAlign: 'left',
    borderWidth:0.3,
    borderColor:"#918B8B",
    borderRadius:5,
    fontFamily:'monospace'
  },
  flat:{
    alignContent:'flex-start',
    
  }
    
  
});
