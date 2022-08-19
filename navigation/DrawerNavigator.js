import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";
import CustomSidebarMenu from "../screens/CustomSidebarMenu";
import firebase from "firebase";
const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true
        };
    }

    componentDidMount() {
        let theme;
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", function (snapshot) {
                theme = snapshot.val().current_theme;
            });
        this.setState({ light_theme: theme === "light" ? true : false });
    }
    componentDidUpdate() {
        console.log("Drawer has updated")
    }

    componentWillUnmount() {
        console.log("Drawer has unmountd")

    }
    render() {
        let theme = this.state.light_theme
        return (
            <Drawer.Navigator
                drawerContent={props => <CustomSidebarMenu {...props} />}

                screenOptions={{
                    drawerActiveTintColor: "#e91e63",
                    drawerInactiveTintColor: theme ? "black" : "white",
                    drawerItemStyle: { marginVertical: 5 },
                    headerShown: false
                }}
            >

                <Drawer.Screen
                    name="Home"
                    component={StackNavigator}
                />
                <Drawer.Screen
                    name="Profile"
                    component={Profile}
                />
                <Drawer.Screen
                    name="Logout"
                    component={Logout}
                />

            </Drawer.Navigator >
        )
    }

}