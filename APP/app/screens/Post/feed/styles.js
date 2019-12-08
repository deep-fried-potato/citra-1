import {StyleSheet} from "react-native"

export default StyleSheet.create({
    card:{marginHorizontal:10},
    image:{height: 200, width: 200, flex: 1,  borderBottomLeftRadius:8, borderBottomRightRadius:8, borderTopLeftRadius:0, borderTopRightRadius:0},
    caption:{paddingTop:1, fontSize:20, fontWeight:'bold'},
    subCaption:{marginTop:-2},
    description:{marginTop:10, color:'rgb(80,80,80)'},
    icon:{alignSelf:'flex-end'},
    cardText:{paddingHorizontal:8, marginBottom:15},
    hr:{
        flex:0,
        alignSelf:'center',
        marginVertical:10,
        borderBottomColor: 'rgb(230,230,230)',
        borderBottomWidth: 1,
        width:'50%'
    }
})
