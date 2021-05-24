import React, { useState, useEffect } from "react";
import { ScrollView, View, Image, SafeAreaView } from 'react-native';
import { Divider, Text } from "@ui-kitten/components";
import { useFirebaseContext } from '../../providers/firebaseProvider';
import styles from "./styles";

const Profile = ({imageUrl, name}) => {
  return (
    <View style={styles.profile}>
      <Image style={styles.profileImage} source={{uri: imageUrl}} />
      <Text category='label'>{name}</Text>
    </View>
  );
};

const Header = ({text}) => {
  return (
    <View style={styles.header}>
      <Text category='h5' appearance='hint'>
        {text}
      </Text>
      <Divider/>
    </View>
  );
}

const AboutScreen = () => {
  const firebase = useFirebaseContext();
  const storage = firebase.storage();
  const [profiles, setProfiles] = useState(<></>);
  const teamMembers = [
    'Andy M.',
    'Aura U.',
    'Elise L.',
    'Jeff Y.',
    'Peizhi L.',
    'Sanath A.',
  ];

  useEffect(() => {
    const getProfilePics = async() => {
      const urlOps = teamMembers.map((member) => {
        const fileName = `team-profile-pictures/${member}-thumbnail.jpg`;
        const imageUrl = storage.ref(fileName).getDownloadURL();
        return imageUrl;
      });
      const urls = await Promise.all(urlOps);
      const updatedProfiles = urls.map((url, idx) => 
        <Profile 
          imageUrl={url}
          key={`profilePic${idx}`}
          name={teamMembers[idx]} 
        />);
      setProfiles(updatedProfiles);
    };

    getProfilePics();
  }, []);

  return (
    <SafeAreaView style={styles.layout}>
      <ScrollView style={styles.contentWrapper}>
        <View style={styles.section}>
          <Header text={"What is MineArt?"} />
          <Text category='p1'style={{paddingTop: 10}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
        <View style={styles.section}>
          <Header text={"Developers"} />
          <View style={styles.profileWrapper}>
            {profiles}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
