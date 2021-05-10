import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, } from "@ui-kitten/components";
import MuseumGalleryScreen from "./src/screens/MuseumGalleryScreen";
import EditImageScreen from "./src/screens/EditImageScreen";

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <EditImageScreen />
    </ApplicationProvider>
  );
};

export default App;
