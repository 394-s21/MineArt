import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, } from "@ui-kitten/components";
import MuseumGalleryScreen from "./src/screens/MuseumGalleryScreen";
import SocialGalleryScreen from "./src/screens/SocialGalleryScreen";

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SocialGalleryScreen />
    </ApplicationProvider>
  );
};

export default App;
