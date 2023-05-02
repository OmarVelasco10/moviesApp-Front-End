import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { GradientProvider } from "./src/context/GradientContext";
import { AuthProvider } from "./src/context/authContext/AuthContext";
import { Navigator } from "./src/navigation/Navigator";
import { ReviewsProvider } from "./src/context/reviewsContext/ReviewsContext";

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <GradientProvider>
        <ReviewsProvider>{children}</ReviewsProvider>
      </GradientProvider>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
