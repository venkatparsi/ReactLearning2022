#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

#c::
Run, "C:\Program Files\Google\Chrome\Application\chrome.exe" ; dierect application exe.
Run, C:\Users\sys\Desktop\code ; windows new uwp apps or the shortcuts.
Run, "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
return

#v::
Run, C:\Users\sys\Desktop\code
return

#s:: ;runs snipping tool and autosaves it (almost)
Send #+S
return

#z::
Send #c
return

