import React from "react";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, } from "@ui-kitten/components";


import MuseumGalleryScreen from "./src/screens/MuseumGalleryScreen";
import SocialGalleryScreen from "./src/screens/SocialGalleryScreen";
import { Navigator } from "./src/navigation/Navigator";

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Navigator />
      </ApplicationProvider>
    </>
  );
};

export default App;
