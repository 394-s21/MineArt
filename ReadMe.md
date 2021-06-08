# MineArt

View us live: http://mineart-f2351.web.app

## What is MineArt?
Learning in museums has increasingly come to be characterized in terms of participatory and active engagement on the part of visitors. Here, we present a design prototype for an online interactive art museum exhibit called MineArt, an exhibit that allows visitors to create art pieces through modifications of famous artworks. It also has flip cards containing art-related knowledge and a gallery for sharing and community building. In this work we hope to facilitate the meaning-making process of art through creating exhibits that incorporate audience participation and active prolonged engagement. We hope to empower visitors by promoting their art appreciation, interpretation, and discussion in a fun and engaging manner.

## Installation and Set Up

First clone this repository to your local development machine, then install the dependencies using node package manager (npm).

```bash
npm install
```

We use Firebase for the database and for image storage. To set up Firebase for this app:
1) Create a new firebase project: https://console.firebase.google.com/u/0/
2) Click into your project. Go to "project settings" in the left sidebar. Scroll down and click "Add app." You will get information about the project's apiKey, authDomain, projectId, storageBucket, messagingSenderId, and appId. Paste these into firebaseProvider.js, replacing the "REPLACE_HERE" strings starting on line 10. (https://github.com/394-s21/MineArt/blob/main/src/providers/firebaseProvider.js#L10)
3) Install Firebase CLI with `npm install -g firebase-tools`
4) Install Firebase with `expo install firebase` on Mac/Linux or `npm install firebase` on Windows
5) Run `firebase init` and use the project you created
6) To deploy, run `expo build:web` and then `firebase deploy`.

## Running the code
To run the project locally, run:
```
expo start
```

## Technologies Used

The MineArt project is built with React Native, Expo, and Firebase. 

## Known Limitations

Image editing functionality is core to this app, and therefore the image editing library is arguably the most important external dependency. Originally, this project was planned to be a mobile app, and [react-native-photo-editor](https://github.com/prscX/react-native-photo-editor) was our library of choice at the time. During this process, we found the need to eject this app from expo. However due to pressing needs to be able to easily demo this project, we decided to focus on the web version of this app, which allowed for the usage of a [more advanced photo editor that suited our needs](https://www.npmjs.com/package/@toast-ui/react-image-editor).

## Contributors

This project was built by a team of student developers at Northwestern University (spring 2021). The project owner is Lexie Zhao.
