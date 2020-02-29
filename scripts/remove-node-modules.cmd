del "..\yarn.lock"
del "..\package-lock.json"
del "..\yarn-error.log"

rmdir /s /q ..\node_modules
rmdir /s /q ..\packages\components\node_modules 
rmdir /s /q ..\packages\rns-core\node_modules 
rmdir /s /q ..\packages\rns-theme\node_modules
rmdir /s /q ..\packages\rns-mobile-app\node_modules 

REM cd .. 
REM yarn
