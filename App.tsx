import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MovieNavigation } from "./src/navigation/MovieNavigation";
import { GradientProvider } from "./src/context/GradientContext";
import { Tabs } from "./src/navigation/Tabs";
import { LoginScreen } from "./src/screens/LoginScreen";

// import { FadeScreen } from './src/screens/FadeScreen';
import { AuthNavigation } from "./src/navigation/AuthNavigation";
import { AuthProvider } from "./src/context/authContext/AuthContext";
import { Navigator } from "./src/navigation/Navigator";
import { ReviewsProvider } from "./src/context/reviewsContext/ReviewsContext";
const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <GradientProvider>
        <ReviewsProvider>{children}</ReviewsProvider>
      </GradientProvider>
      {/* <GradientProvider>{children}</GradientProvider> */}
    </AuthProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        {/* <Tabs /> */}
        {/* <FadeScreen /> */}
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
