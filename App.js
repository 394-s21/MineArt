import React from "react";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, } from "@ui-kitten/components";
import { FirebaseProvider, useFirebaseContext } from "./src/providers/firebaseProvider";

import { Navigator } from "./src/navigation/Navigator";

const App = () => {
  return (
    <FirebaseProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Navigator />
      </ApplicationProvider>
    </FirebaseProvider>
  );
};

export default App;
