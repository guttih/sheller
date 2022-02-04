#Function: frame()
#
#Brief: Writes pretty frame around provied text to the terminal
#
# Usage frame [OPTION]... <text>
# OPTIONS
#  --    The frame will drawn with a single line
#  -=    The frame will drawn with a double line
#  -c    The frame will be drawn with provided character.  This option must be 
#        followed be the character to be used for drawing the frame surrounding
#        frame. b Sometimes you will need to double qoute this characther, 
#        For example for * you will need to double qoute like this "*".
#  -t    Only top part of the frame will be printed <text> will be ignored
#  -b    Only the bottom part of the fram will be printed <text> will be ignored
#  -m    Only provided text will be printed with surrounding frame sides
#  -l    Provided <text> should be left aligned
#  -r    Provided <text> should be right aligned
#  -f    If provided the next parameter must contain the formatting to be used
#        on the text inside the frame.
#  -w    If provided the next parameter must contain a number representing how
#        wide you want the surrouding frame to be, by default this number is 80.
#
#Please remember to double qoute all parameters
#example on how to write a blue text with double quoted frame around it:
#  frame  -c = -f $(echo -en '\033[01;34m') "I am blue text"
frame() {
    declare align='center'; #Allignment for text inside the frame
    declare format;         #Text formatting
    declare parts="all";    #Print frame part- top, lower, middle or all parts.
    declare box="-";        #character(s) surrounding the text which will make the frame.
    declare width="80";     #The frame width
    declare text;
    declare normal=$(echo -en '\033[0m')

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
            if [[ -z $1 || -n $1 && ${#1} -ne 1 ]]; then echo "Option -c will need to be followed by a character" ; exit 1; fi;
            box="$1"
        elif [[ "$1" = "-w" ]]; then
           #We will need string of length 1 next
           shift;
           re='^[0-9]+$'
            if ! [[  "$1" =~ $re ]] ; then echo "Option -w will need to be followed by a number" ; exit 1; fi;
            width="$1"
        elif [[ "$1" = "-f" ]]; then
           shift;
           #We will need the formatting string next
            if [ -z $1 ]; then echo "Formatting option provided but formatting value missing!" ; exit 1; fi;
            format="$1"
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
    pad=$(printf '%*s' "$size")
    
    if [ $((${#STRING} % 2)) -eq 0 ]; then pad2="${pad}"; else pad2="${pad} "; fi
    
    if [[ "$parts" = "all" || "$parts" = "middle" ]]; then
        if [[ "$align" = "left" ]]; then
            size=$((($((width - 2)) - (${#STRING}))))
            pad=$(printf '%*s' "$size")
            if [[ -n "$format" ]]; then STRING="$format${STRING}${normal}"; fi
            echo -e "$side$STRING$pad$side"
        elif [[ "$align" = "right" ]]; then
            size=$((($((width - 2)) - (${#STRING}))))
            pad=$(printf '%*s' "$size")
            if [[ -n "$format" ]]; then STRING="$format${STRING}${normal}"; fi
            echo -e "$side$pad$STRING$side"
        else
            if [[ -n "$format" ]]; then STRING="$format${STRING}${normal}"; fi
            echo -e "$side$pad$STRING$pad2$side"
        fi
    fi
    #normal
    if [[ "$parts" = "all" || "$parts" = "bottom" ]]; then
        printf "$downLeft"
        printf $str $(seq 1 $((width - 2)))
        printf "$downRight\n"
    fi
}

highlight=$(echo -en '\033[01;34m')
echo "Program frame"
frame  -c = -f ${highlight} "I am blue text" -r
