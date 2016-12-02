## Get Started

#### Step 1

Go to the root of your local repository. Install 3rd party software via `npm`
```sh
$ sudo npm install
```

#### Step 2

Install react-native-vector-icons (if you do not already have it)

```sh
$ npm i react-native-vector-icons --save && react-native link react-native-vector-icons
```

*If you have any issues with icons not working or installation of React Native Vector Icons, check out their installation guide [here](https://github.com/oblador/react-native-vector-icons#installation)*

#### Step 3

Install Xcode project dependencies via `pod install`. Check out their installation guide [here](https://guides.cocoapods.org/)
```sh
$ pod install
```

#### Step 4

Double click /ios/BKKGo.xcworkspace to open Xcode project instead of BKKGo.xcodeproj


#### Step 5

Install [react-native-css](https://github.com/sabeurthabti/react-native-css) module globally
```sh
$ npm i react-native-css -g
```
React-native-css comes with a cli and you can watch a file and compile it.
```sh
$ react-native-css -i stylesheets/main.scss -o styles.js --watch
```
-or-
```sh
$ react-native-css -i stylesheets/main.scss -o styles.js --watch --pretty
```