import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import ImageTile from "../../components/ImageTile";

const MuseumGalleryScreen = () => {
  const dummy_data = new Array(5).fill(0);
  return (
    <Layout>
      <Text>This is the museum gallery screen</Text>
      {dummy_data.map((data) => {
        return <ImageTile />;
      })}
    </Layout>
  );
};

export default MuseumGalleryScreen;
