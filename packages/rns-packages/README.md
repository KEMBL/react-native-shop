# Entities guidelines

This package contains application entities which are supposed to be used with redux-package-loader. The general idea is - each entity folder contains all necessary parts which are required to use it in react-redux application. Look at folders as at dedicated npm packages.

Mostly inspired by these articles:

	* https://www.npmjs.com/package/redux-package-loader
	* https://erock.io/scaling-js-codebase-multiple-platforms/
	* https://erock.io/redux-saga-style-guide/
	* https://github.com/neurosnap/youhood


## Each entity folder can contain:
	    
	* actions - Redux actions' handlers
	* default - file with default storage entity description
	* effects - actions' functions' bodies
	* reducers - Redux reducers
	* sagas - Redux sagas
	* slice - access to entity's slice in store
	* selectors - Redux selectors
	* style - style related to entity, only for UI entities
	* types - entity type description
	* utils - entity related utilities


