#Function: frame()
# Usage frame [OPTION]... <text>
# OPTIONS
#  --    he frame will drawn with a single line
#  -=    he frame will drawn with a double line
#  -c    if provided the next parameter must contain the formatting to be used
#        character to be used as the frame surrounding character.
#  -t    Only top part of the frame will be printed <text> will be ignored
#  -b    Only the bottom part of the fram will be printed <text> will be ignored
#  -m    Only provided text will be printed with surrounding frame sides
#  -l    Provided <text> should be left aligned
#  -r    Provided <text> should be right aligned
#  -f    if provided the next parameter must contain the formatting to be used
#        on the text inside the frame.
#  -w    if provided the next parameter must contain a number representing how
#        wide you want the surrouding frame to be, by default this number is 80.
#Brief: Writes pretty frame around provied text to the terminal
#
#Please remember to double qoute all parameters
#example on how to write a red text with double quoted frame around it:
#  frame "I am red" "-=" "-f" "\033[01;31m"
frame() {
    declare align='center'; #Allignment for text inside the frame
    declare format;         #Text formatting
    declare parts="all";    #Print frame part- top, lower, middle or all parts.
    declare box="+";        #character(s) surrounding the text which will make the frame.
    declare width="80";     #The frame width
    declare text;

    while (("$#")); do # While there are arguments still to be shifted
        
        if [[ "$1" = "--" ]]; then
           box="-"
        elif [[ "$1" = "-=" ]]; then
           box="="
        elif [[ "$1" = "-t" ]]; then
            parts="top";
        elif [[ "$1" = "-m" ]]; then
            parts="middle";
        elif [[ "$1" = "-b" ]]; then
            parts="bottom";
        elif [[ "$1" = "-l" ]]; then
            align="left";
        elif [[ "$1" = "-r" ]]; then
            align="right";
        elif [[ "$1" = "-c" ]]; then
           #We will need string of length 1 next
           shift;
            if [[ -n $1 && ${#1} -ne 1 ]]; then echo "Option -c will need to be followed by a character" ; exit 1; fi;
            box="$1"
        elif [[ "$1" = "-w" ]]; then
           #We will need string of length 1 next
           shift;
           re='^[0-9]+$'
            if ! [[  "$1"  =~ $re ]] ; then echo "Option -w will need to be followed by a number" ; exit 1; fi;
            width="$1"
        elif [[ "$1" = "-f" ]]; then
           shift;
           #We will need the formatting string next
            if [-z $1 ]; then echo "Formatting option provided but formatting value missing!" ; exit 1; fi;
            format ="$1"
        else
            text="$1"
        fi
        shift
    done
    if [[ -z "$text" &&  ( "$parts" != "top" && "$parts" != "bottom"  ) ]]; then echo "Error No text Provided"; exit 1; fi;
        declare char="$box"
        declare side="$box"
        declare upLeft="$box"
        declare upRight="$box"
        declare downLeft="$box"
        declare downRight="$box"
    if [[ "$box" = "=" ]]; then
        char="═"
        side="║"
        upLeft="╔"
        upRight="╗"
        downLeft="╚"
        downRight="╝"
    elif [[ "$box" = "-" ]]; then
        char="─"
        side="│"
        upLeft="┌"
        upRight="┐"
        downLeft="└"
        downRight="┘"
    fi
    STRING=$text
    size=$((($((width - 2)) - (${#STRING})) / 2))
    str="%0.s$char"
    if [[ "$parts" = "all" || "$parts" = "top" ]]; then
        echo -en "$upLeft"
        printf $str $(seq 1 $((width - 2)))
        printf "$upRight\n"
    fi
    echo "align=$align"
    pad=$(printf '%*s' "$size")
    if [[ -n "$4" ]]; then STRING="$${STRING}${norm}"; fi
    if [ $((${#STRING} % 2)) -eq 0 ]; then pad2="${pad}"; else pad2="${pad} "; fi
    
    if [[ "$parts" = "all" || "$parts" = "middle" ]]; then
        echo -e "$side$pad$STRING$pad2$side"
    fi
    if [[ "$parts" = "all" || "$parts" = "bottom" ]]; then
        printf "$downLeft"
        printf $str $(seq 1 $((width - 2)))
        printf "$downRight\n"
    fi
}

echo "Program frame"

frame  "eight að krapp feitta" -c "="
