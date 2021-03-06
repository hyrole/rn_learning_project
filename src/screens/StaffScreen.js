import React, { Component } from 'react'
import { View, Text, ActivityIndicator, FlatList,

    RefreshControl

} from 'react-native'

import axios from 'axios'

import BarButton from '../components/BarButton'
import MyButton from '../components/MyButton'

import _ from 'lodash'

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const arr = [
    { firstName: 'Will', lastName: 'Riker', rank: 'Commander' },
    { firstName: 'Beverly', lastName: 'Crusher', rank: 'Commander' },
    { firstName: 'Wesley', lastName: 'Crusher', rank: 'Ensign' }
  ];

class StaffScreen extends Component {

    static options = ({navigation}) => ({
        headerRight: ()=> (
            <View>
            <Text>Hello</Text>
            </View>
        ),
        headerTitle: (
            <View>
              
            </View>
        )
    })

    constructor(props){
        
        super(props);

        this.state = {
            staff_list: [],
            loading: true,
        }

    }

    

    componentDidMount(){

      this.subs = [
          this.props.navigation.addListener('focus', ()=> { this.callAPI() })
      ]

      this.callAPI();     
      
      
      // Test data

    //   let filteredArray = _.filter(arr, { firstName: '' });

    //   let filteredArray = arr;

    //   console.log('hi', filteredArray);


    }

    callAPI(){

        this.setState({
            loading: true,
        });


        axios.get('https://backend.sofebiz.com/superadmin/views').then((response)=>{

            // console.log('res', response.data);

            this.setState({
                staff_list: response.data,
                loading:false,
            })

            

        }).catch((e)=>{

            // console.log('error', e);

            this.setState({                
                loading:false,
            })

        })

        
    }


    render(){

        return (
            <View style={{flex:1}}>
            
            <View style={{padding:12}}>            
            <MyButton 
              title="Add Staff"
              onPress={()=>{
                this.props.navigation.navigate('StaffAddEditScreen')
              }}
            />
            </View>

            {/* {
                this.state.loading === true && 
                <View style={{flexDirection:'row', flex:1, justifyContent:'center', padding:6, margin:12, alignItems:'center'}}>
                <ActivityIndicator/>
                <View style={{width:5}}></View>
                <Text>Loading</Text>
                </View>    
            }    */}


            <FlatList
                refreshControl={
                    <RefreshControl refreshing={this.state.loading} onRefresh={()=>{
                        this.callAPI();
                    }} 
                    />
                }
                style={{flex:1}}
                data={this.state.staff_list}
                renderItem={({item, index}) => this.renderItem(item, index) }
            />

            
            {/* Contoh guna map */}
            {/* {
                this.state.staff_list.map((staff, idx)=>{
                    return (
                        <BarButton
                            key={idx}
                            title={staff.name}
                            secondaryTitle={staff.phone}
                            onPress={()=>{
                                this.props.navigation.push('StaffDetailScreen',staff);
                            }}
                        />
                    )
                })
            } */}

            </View>
        )

    }

    renderItem(item, index){
        return (
            <BarButton                
                title={item.name}
                secondaryTitle={item.phone}
                onPress={()=>{
                    this.props.navigation.push('StaffDetailScreen',item);
                }}
            />
        )
    }
    

}


export default StaffScreen