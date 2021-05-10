import React from "react";
import { SafeAreaView } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, } from "@ui-kitten/components";
import MuseumGalleryScreen from "./src/screens/MuseumGalleryScreen";

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <MuseumGalleryScreen />
    </ApplicationProvider>
  );
};

export default App;
