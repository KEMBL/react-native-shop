
echo "asdasdasdasdas"
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

for %%x in (
        packages\components
        packages\rns-core
        packages\rns-theme
        packages\rns-web-app
        packages\rns-mobile-app
       ) do (
        call :remove-build-files-by-ext-from-dir %%x
       )

exit 0

:remove-files-by-ext-from-dir

for %%G in (
    .js, .js.map, .jsx, .jsx.map, .d.ts, .d.ts.map
    ) do (
    FORFILES /P "%ProjectDir%\%1" /S /M *%%G /C "CMD /C DEL /Q @path"
    )
exit /b

:removefile
echo "%ProjectDir%\%1"
DEL /Q "%ProjectDir%\%1"
exit /b

:remove-build-files-by-ext-from-dir
DEL /Q "%ProjectDir%\%1\yarn-error.log"
DEL /Q "%ProjectDir%\%1\tsconfig.tsbuildinfo"
exit /b
