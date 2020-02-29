# React native shop

It is a monorepo. It's used for creation of Mobile React Native ecommerce application.
The programming language is Typescript. Os Windows.

# What it uses already

- Rect (with hooks), Redux (controls the global store), Redux ducks, Immutable, Axios
- Java dependent modules are injected to core. Core supposed to not know anything about platform dependent things like Java modules (unless they work fine in web and mobile platforms)

# Current activity

Check Issues to get know about planned changes https://github.com/KEMBL/react-native-shop/issues

For now works that:

    a) Monorepo
    b) The package with React-native application (Core)
    c) Android application package
    d) React components package
    e) Theme package
    f) upcoming: web application based on react-native-web

Famous problems were fixed:

    a) metro.config config is not picked-up from a react-native package folder #6
    b) "Module AppRegistry is not a registered ..." #8
    c) "Invalid hook call ..." for react hooks #9

# How to start mobile app

1. You should have installed Android studio: https://developer.android.com/studio

2. Download Dev branch

3. yarn

4. yarn compile

5. yarn android

After this android emulator shold start and you will see current progress

# Packages

- Componens - context unrelated components like button, text formatters, image, etc

- RNS-Core - platform independent apllication logics. Supposed to be started on mobile and Web platforms

- RNS-Theme - A visual style for RNS-Core

- RNS-Mobile-App - consumer of all other packages - ecomerce mobile application (Android only for now)
