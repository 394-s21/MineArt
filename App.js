import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
import MuseumGalleryScreen from "./src/screens/MuseumGalleryScreen";

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <MuseumGalleryScreen />
      </Layout>
    </ApplicationProvider>
  );
};

export default App;
