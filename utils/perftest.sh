#!/bin/sh

CMD="$1"
RATE="$2"
DELAY="$3"

if [ "$RATE" = "" ] ; then
    RATE=500
fi
if [ "$DELAY" = "" ] ; then
    DELAY=500
fi

if [ "$CMD" = "start" ] ; then
    echo "\033[33mStarting test with low connectivity: \033[0m"
    echo "\033[37m=> ipfw add pipe 1 all from any to any \033[0m"
    sudo ipfw add pipe 1 all from any to any
    echo "\033[37m=> sudo ipfw pipe 1 config bw ${RATE}Kbit/s delay ${DELAY}ms\n"
    sudo ipfw pipe 1 config bw "$RATE"Kbit/s delay "$DELAY"ms

elif [ "$CMD" = "end" ] ; then
    echo "\033[33mEnding low connectivity test \033[0m"
    echo "\033[37m=> sudo ipfw flush"
    sudo ipfw flush
    echo ""

else
    echo "\033[33mAvailable commands"
    echo "\033[37m=> hardtest start [transfer-rate] [delay]"
    echo "\033[37m  [transfer-rate] in Kbit/s \033[33m(default: 500Kbit/s)"
    echo "\033[37m  [latency] in ms \033[33m(default: 500ms)"
    echo "\033[37m\n=> hardtest end\n"
fi
