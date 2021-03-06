# React native shop

It is a monorepo based on yarn workspaces. It's used for the creation of Mobile React Native e-commerce application.
The programming language is Typescript. Os Windows.

(!) Some application interfaces could be in Russian and have no translation yet.

# What it uses already

- React (with hooks), Rect-Navigation, Redux (local data state), Redux saga, GraphQL by Appolo Client (remote data state)
- Java dependent modules are injected into the core package. Core package supposed not to know anything about platform-dependent things like Java modules (unless they work fine in both web and mobile platforms)
- Everyting what is related to Redux resides in `rns-packages` project, other projects just import only actions and selectors from it and does not care about Redux at all
- Redux uses GraphQL to update its state from the backend. That theoretically allows to interoperate with arbitrary backend itit supports used GQL scheme
- Metro for bundling the Android buld and Webpack for the Web build

# How it looks like

Click on the image below to make it bigger. Just a demo that Monorepo with react-native and react-native-web with all components and even theme in a dedicated package is possible. 

The Left side is a web version and right is an Android version. Yes, they look a bit different as web version is used just to speed up developing process, but still, to make everything live together was a challengeable goal.

<img src="images/android_and_web_together.jpg" width="400px" />

# Current activity

Check Issues to get know about planned changes https://github.com/KEMBL/react-native-shop/issues

For now, works:

    a) Monorepo
    b) The package with application services (Core)
    c) React components package
    d) Theme package
    e) Redux abstraction package
    f) Android application package
    g) Web application package based on `react-native-web`. Allows to make a faster development of UI unrelated things
    h) A package with shared types for logic decoupling
    
Famous problems were fixed:

    a) metro.config file content is not picked-up from a react-native package folder #6
    b) "Module AppRegistry is not a registered ..." #8
    c) "Invalid hook call ..." for react-hooks #9
    d) Zero Screen height in react navigation v5 used with react-native-web 

# How to start the app

1. You should install NodeJs v14.5+ including build tools

2. Download app grom Git. Dev branch usually has more app features

3. go to app root folder and perform `npx yarn`

Now you can go two ways - faster is start app as a web page

4. `npx yarn web`

That way web app could be bundled. Just open index.html from packages\rns-web-app\dist in a modern web browser. Many styles are not correct but this mode supposed to be used for improving app logic without needing of android device/emulator. 

Or you can try android version

5. Installed Android studio: https://developer.android.com/studio

6. `npx yarn android`

After this, the Android emulator should start and you will see the app's interface.


# Packages

- Components - context unrelated components like button, text formatters, image, etc

- RNS-Core - platform-independent application logics. Supposed to be started on mobile and Web platforms

- RNS-Packages - Redux related logic, other packages should know only how to dispatch actions and query selectors

- RNS-Theme - A visual style for RNS-Core

- RNS-Types - contains shared types, used mostly for logic decoupling among other packages

- RNS-Mobile-App - a consumer of all other packages - e-commerce mobile application (Android only for now)

- RNS-Web-App - web version of the mobile app, allows to debug app logic without mobile device or emulator

# Versioning

- A version consists of 3 numbers like this: 1.0.0

- If something was changed in any package or even new package added it changes: 1.0.\*

- If a new release was made it changes: 1._._
