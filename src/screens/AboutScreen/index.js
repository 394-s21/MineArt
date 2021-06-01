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
    'Lexie Z.',
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
      <ScrollView style={styles.contentWrapper} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Header text={"What is MineArt?"} />
          <Text category='p1'style={{paddingTop: 10}}>
            Learning in museums has increasingly come to be characterized in terms of 
            participatory and active engagement on the part of visitors. Here, we present 
            a design prototype for an online interactive art museum exhibit called MineArt, 
            an exhibit that allows visitors to create art pieces through modifications of 
            famous artworks. It also has flip cards containing art-related knowledge and a 
            gallery for sharing and community building. In this work we hope to facilitate 
            the meaning-making process of art through creating exhibits that incorporate 
            audience participation and active prolonged engagement. We hope to empower 
            visitors by promoting their art appreciation, interpretation, and discussion 
            in a fun and engaging manner.
          </Text>
        </View>
        <View style={styles.section}>
          <Header text={"Meet the Team"} />
          <View style={styles.profileWrapper}>
            {profiles}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;