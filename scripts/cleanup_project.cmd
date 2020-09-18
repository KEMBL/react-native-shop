@echo off

REM TODO http://documentup.com/shelljs/shelljs 

SET CurrentDir=%~dp0

call "%CurrentDir%\remove-node_modules.cmd"
call "%CurrentDir%\remove-compiled-files.cmd"

exit 0