# React native shop

It is a monorepo. It's used for creation of Mobile React Native ecommerce application.
The programming language is Typescript. Os Windows.

Some interfaces could be in russian and have no translation yet.

# What it uses already

- React (with hooks), Redux (controls the global store), Redux ducks, Immutable, Axios
- Java dependent modules are injected into the core package. Core package supposed not to know anything about platform dependent things like Java modules (unless they work fine in both web and mobile platforms)

# Current activity

Check Issues to get know about planned changes https://github.com/KEMBL/react-native-shop/issues

For now works that:

    a) Monorepo
    b) The package with React-native application (Core)
    c) Android application package
    d) React components package
    e) Theme package
    f) Web application package for debug based on react-native-web

Famous problems were fixed:

    a) metro.config config is not picked-up from a react-native package folder #6
    b) "Module AppRegistry is not a registered ..." #8
    c) "Invalid hook call ..." for react hooks #9

# How to start mobile app

1. You should have installed Android studio: https://developer.android.com/studio

2. Download Dev branch

3. yarn

4. yarn android

After this android emulator shold start and you will see example of interface

5. yarn web

That way web app could be started. Many styles are not correct and images are not shown for now but this mode could be used for improoving app logic without needing of android device/emulator. Just open index.html from packages\rns-web-app\dist in Google Chrome.

# Packages

- Componens - context unrelated components like button, text formatters, image, etc

- RNS-Core - platform independent apllication logics. Supposed to be started on mobile and Web platforms

- RNS-Theme - A visual style for RNS-Core

- RNS-Mobile-App - consumer of all other packages - ecomerce mobile application (Android only for now)

- RNS-Web-App - web version of the mobile app, allows to debug app logic without mobile device or emulator

# Versioning

- A version consists of 3 numbers like this: 1.0.0

- If something was changed in any package or even new package added it changes: 1.0.\*

- If a new relaease made it changes: 1._._
