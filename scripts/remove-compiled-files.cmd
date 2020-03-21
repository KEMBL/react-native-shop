@echo off

del /s "..\tsconfig.tsbuildinfo"

del /s /q ..\packages\components\src\*.js
del /s /q ..\packages\components\src\*.js.map
del /s /q ..\packages\components\src\*.jsx
del /s /q ..\packages\components\src\*.jsx.map
del /s /q ..\packages\components\src\*.d.ts
del /s /q ..\packages\components\src\*.d.ts.map


del /s /q ..\packages\rns-core\src\*.js
del /s /q ..\packages\rns-core\src\*.js.map
del /s /q ..\packages\rns-core\src\*.jsx
del /s /q ..\packages\rns-core\src\*.jsx.map
del /s /q ..\packages\rns-core\src\*.d.ts
del /s /q ..\packages\rns-core\src\*.d.ts.map

del /s /q ..\packages\rns-theme\src\*.js
del /s /q ..\packages\rns-theme\src\*.js.map
del /s /q ..\packages\rns-theme\src\*.jsx
del /s /q ..\packages\rns-theme\src\*.jsx.map
del /s /q ..\packages\rns-theme\src\*.d.ts
del /s /q ..\packages\rns-theme\src\*.d.ts.map

REM forfiles /p "..\packages\rns-theme\src" /s /m *.d.ts /c "cmd /c del @file"

del /s /q ..\packages\rns-mobile-app\index.js
del /s /q ..\packages\rns-mobile-app\index.js.map
del /s /q ..\packages\rns-mobile-app\index.jsx
del /s /q ..\packages\rns-mobile-app\index.jsx.map
del /s /q ..\packages\rns-mobile-app\index.d.ts
del /s /q ..\packages\rns-mobile-app\index.d.ts.map

del /s /q ..\packages\rns-web-app\src\*.js
del /s /q ..\packages\rns-web-app\src\*.js.map
del /s /q ..\packages\rns-web-app\src\*.jsx
del /s /q ..\packages\rns-web-app\src\*.jsx.map
del /s /q ..\packages\rns-web-app\src\*.d.ts
del /s /q ..\packages\rns-web-app\src\*.d.ts.map
