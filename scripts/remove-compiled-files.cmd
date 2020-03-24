@echo off

SET ProjectDir=%~dp0..

for %%x in (
        tsconfig.tsbuildinfo
        packages\rns-mobile-app\index.js
        packages\rns-mobile-app\index.js.map
        packages\rns-mobile-app\index.jsx
        packages\rns-mobile-app\index.jsx.map
        packages\rns-mobile-app\index.d.ts
        packages\rns-mobile-app\index.d.ts.map        
       ) do (
        call :removefile %%x
       )

for %%x in (
        packages\components\src
        packages\rns-core\src
        packages\rns-theme\src
        packages\rns-web-app\src
       ) do (
        call :remove-files-by-ext-from-dir %%x
       )

exit 0

:remove-files-by-ext-from-dir

for %%G in (
    .js, .js.map, .jsx, .jsx.map, .d.ts, .d.ts.map
    ) do (
    FORFILES /P "%ProjectDir%\%1" /S /M *%%G /C "CMD /C ECHO @path"
    )
exit /b

:removefile
DEL /Q "%ProjectDir%\%1"
exit /b