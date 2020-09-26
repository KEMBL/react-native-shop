# Entities guidelines

Package contains application entities which can be reused by other packages. The idea is - each entity contains all necessary parts which are required to use it in react-redux application, look at folders as at dedicated npm packages.

Mostly inspired by these articles:

	* https://erock.io/scaling-js-codebase-multiple-platforms/
	* https://erock.io/redux-saga-style-guide/
	* https://github.com/neurosnap/youhood


## Each entity folder can contain:
	    
	* actions - Redux actions
	* default - file with default storage entity description
	* effects - actions' functions' bodies
	* reducers - Redux reducers
	* sagas - Redux sagas
	* slice - access to entity's slice in store
	* selectors - Redux selectors
	* style - style related to entity, only for UI entities
	* types - entity type description
	* utils - entity related utilities


