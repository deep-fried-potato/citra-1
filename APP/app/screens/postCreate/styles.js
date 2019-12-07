import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    safeAreaContainer:{flex:1},
    btn:{backgroundColor:'blue'},
    banner: {backgroundColor: 'white'},
    footer: {position: 'absolute', bottom: 0, backgroundColor: 'white'},
    icon: {justifyContent: 'center'},
    iconStyle: {alignSelf: 'center'},
    description: {marginTop: 10, marginHorizontal: 10},
    media: {alignSelf:'center', width: "90%", height: 100, borderRadius: 10, margin: 10},
    category: {margin: 10}
});

const multiSelect = {
    chipContainer: {
        backgroundColor: 'blue', borderWidth: 0, padding: 0,
    },
    chipIcon: {
        color: 'white',
        fontSize: 12
    },
    chipText: {
        color: 'white',
        fontSize: 12
    },
    item: {
        paddingHorizontal: 10,
    },
    subItem: {
        paddingHorizontal: 10,
    },
    selectedItem: {
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    selectedSubItem: {
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    scrollView: {paddingHorizontal: 0},
};

export {
    styles,
    multiSelect
}

