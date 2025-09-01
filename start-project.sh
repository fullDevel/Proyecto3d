#!/bin/bash
# Script para abrir frontend y backend en iTerm2

# Abrir backend en nueva ventana
osascript <<EOF
tell application "iTerm"
    create window with default profile
    tell current session of current window
        write text "cd /Users/eliezerconeo/Documents/proyecto/backend && npm start"
    end tell
end tell
EOF

# Abrir frontend en nueva pestaña
osascript <<EOF
tell application "iTerm"
    tell current window
        create tab with default profile
        tell current session
            write text "cd /Users/eliezerconeo/Documents/proyecto/frontend && ng serve"
        end tell
    end tell
end tell
EOF
