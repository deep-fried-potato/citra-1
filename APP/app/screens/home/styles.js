import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex:3,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    text: {fontSize: 16, color: 'rgb(100,100,100)', paddingLeft: 10, paddingTop: 5},
    circleShapeView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 90,
        borderRadius: 90 / 2,
        backgroundColor: '#00f',
        margin: 10,
    },
    iconName:{color: 'white'}
});
