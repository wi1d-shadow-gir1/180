let uartData = ""
let j = 0
let g_mode = 0
let U_ago = 0
let U_now = 0
let U_distance = 0
let g_RGBMode = 0
let g_Red = 0
let g_Green = 0
let g_blue = 0
let distance = 0
let ago = ""
let CSB = ""
function FollowMode () {
    if (mbit_小车类.Avoid_Sensor(mbit_小车类.enAvoidState.OBSTACLE)) {
        mbit_小车类.CarCtrlSpeed(mbit_小车类.CarState.Car_Run, 200)
    } else {
        mbit_小车类.CarCtrl(mbit_小车类.CarState.Car_Stop)
    }
}
function bluecontrol () {
    if (uartData == "A") {
        mbit_小车类.CarCtrl(mbit_小车类.CarState.Car_Run)
    } else if (uartData == "B") {
        mbit_小车类.CarCtrl(mbit_小车类.CarState.Car_Back)
    } else if (uartData == "C") {
        mbit_小车类.CarCtrl(mbit_小车类.CarState.Car_SpinLeft)
    } else if (uartData == "D") {
        mbit_小车类.CarCtrl(mbit_小车类.CarState.Car_SpinRight)
    } else if (uartData == "E") {
        mbit_小车类.CarCtrl(mbit_小车类.CarState.Car_SpinLeft)
    } else if (uartData == "F") {
        mbit_小车类.CarCtrl(mbit_小车类.CarState.Car_SpinRight)
    } else if (uartData == "0") {
        mbit_小车类.CarCtrl(mbit_小车类.CarState.Car_Stop)
    }
}
Mbit_IR.onPressEvent(RemoteButton.Power, function () {
    Mbit_IR.init(Pins.P8)
    basic.showLeds(`
        . . . . .
        # . . . #
        # # # # #
        # . . . #
        . # # # .
        `)
})
function BreathLED () {
    mbit_小车类.RGB_Car_Program().clear()
    for (let k = 0; k <= 255; k++) {
        mbit_小车类.RGB_Car_Program().setBrightness(k)
        mbit_小车类.RGB_Car_Program().showColor(neopixel.colors(NeoPixelColors.Purple))
        mbit_小车类.RGB_Car_Program().show()
    }
    j = 255
    for (let l = 0; l <= 255; l++) {
        mbit_小车类.RGB_Car_Program().setBrightness(j)
        j += -1
        mbit_小车类.RGB_Car_Program().showColor(neopixel.colors(NeoPixelColors.Purple))
        mbit_小车类.RGB_Car_Program().show()
    }
}
function ModeSelect () {
    if (uartData == "S") {
        basic.showIcon(IconNames.House)
        g_mode = 1
    } else if (uartData == "T") {
        basic.showIcon(IconNames.Angry)
        g_mode = 2
    } else if (uartData == "U") {
        basic.showIcon(IconNames.EigthNote)
        g_mode = 3
    } else if (uartData == "V") {
        g_mode = 0
        basic.showLeds(`
            . . . . .
            # . . . #
            # # # # #
            # . . . #
            . # # # .
            `)
        mbit_小车类.CarCtrl(mbit_小车类.CarState.Car_Stop)
    }
}
function AvoidMode () {
    U_ago = mbit_小车类.Ultrasonic_Car()
    U_now = mbit_小车类.Ultrasonic_Car()
    if (U_ago - U_now <= 10 && U_ago - U_now >= 0 || U_now - U_ago <= 10 && U_now - U_ago >= 0) {
        U_distance = Math.idiv(U_ago + U_now, 2)
        if (U_distance < 15 && U_distance >= 2) {
            mbit_小车类.CarCtrlSpeed(mbit_小车类.CarState.Car_SpinLeft, 100)
            basic.pause(300)
        } else {
            mbit_小车类.CarCtrlSpeed(mbit_小车类.CarState.Car_Run, 130)
        }
    }
}
function HorseLED () {
    mbit_小车类.RGB_Car_Program().setBrightness(255)
    mbit_小车类.RGB_Car_Program().setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
    mbit_小车类.RGB_Car_Program().show()
    basic.pause(100)
    mbit_小车类.RGB_Car_Program().clear()
    mbit_小车类.RGB_Car_Program().setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
    mbit_小车类.RGB_Car_Program().show()
    basic.pause(100)
    mbit_小车类.RGB_Car_Program().clear()
    mbit_小车类.RGB_Car_Program().setPixelColor(2, neopixel.colors(NeoPixelColors.Blue))
    mbit_小车类.RGB_Car_Program().show()
    basic.pause(100)
    mbit_小车类.RGB_Car_Program().clear()
    mbit_小车类.RGB_Car_Program().show()
}
function TrackingMode () {
    if (mbit_小车类.Line_Sensor(mbit_小车类.enPos.LeftState, mbit_小车类.enLineState.White) && mbit_小车类.Line_Sensor(mbit_小车类.enPos.RightState, mbit_小车类.enLineState.White)) {
        mbit_小车类.CarCtrlSpeed(mbit_小车类.CarState.Car_Run, 60)
    } else if (mbit_小车类.Line_Sensor(mbit_小车类.enPos.LeftState, mbit_小车类.enLineState.White) && mbit_小车类.Line_Sensor(mbit_小车类.enPos.RightState, mbit_小车类.enLineState.Black)) {
        mbit_小车类.CarCtrlSpeed(mbit_小车类.CarState.Car_SpinRight, 80)
    } else if (mbit_小车类.Line_Sensor(mbit_小车类.enPos.LeftState, mbit_小车类.enLineState.Black) && mbit_小车类.Line_Sensor(mbit_小车类.enPos.RightState, mbit_小车类.enLineState.White)) {
        mbit_小车类.CarCtrlSpeed(mbit_小车类.CarState.Car_SpinLeft, 80)
    } else {
        mbit_小车类.CarCtrl(mbit_小车类.CarState.Car_Stop)
    }
}
function WaterLED () {
    mbit_小车类.RGB_Car_Program().setBrightness(255)
    mbit_小车类.RGB_Car_Program().setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
    mbit_小车类.RGB_Car_Program().show()
    basic.pause(100)
    mbit_小车类.RGB_Car_Program().clear()
    mbit_小车类.RGB_Car_Program().setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
    mbit_小车类.RGB_Car_Program().show()
    basic.pause(100)
    mbit_小车类.RGB_Car_Program().clear()
    mbit_小车类.RGB_Car_Program().setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
    mbit_小车类.RGB_Car_Program().show()
    basic.pause(100)
    mbit_小车类.RGB_Car_Program().clear()
    mbit_小车类.RGB_Car_Program().show()
}
function SevenColorLED () {
    if (uartData == "G") {
        mbit_小车类.RGB_Car_Big2(mbit_小车类.enColor.Red)
    } else if (uartData == "H") {
        mbit_小车类.RGB_Car_Big2(mbit_小车类.enColor.Green)
    } else if (uartData == "I") {
        mbit_小车类.RGB_Car_Big2(mbit_小车类.enColor.Blue)
    } else if (uartData == "J") {
        mbit_小车类.RGB_Car_Big2(mbit_小车类.enColor.Yellow)
    } else if (uartData == "K") {
        mbit_小车类.RGB_Car_Big2(mbit_小车类.enColor.Cyan)
    } else if (uartData == "L") {
        mbit_小车类.RGB_Car_Big2(mbit_小车类.enColor.Pinkish)
    } else if (uartData == "M") {
        mbit_小车类.RGB_Car_Big2(mbit_小车类.enColor.OFF)
    }
}
function SevenWaterLED () {
    if (uartData == "N") {
        g_RGBMode = 1
    } else if (uartData == "P") {
        g_RGBMode = 2
    } else if (uartData == "Q") {
        g_RGBMode = 3
    } else if (uartData == "R") {
        g_RGBMode = 4
    } else if (uartData == "W") {
        g_RGBMode = 5
    }
}
function music2 () {
    if (uartData == "1") {
        music.ringTone(262)
    } else if (uartData == "2") {
        music.ringTone(294)
    } else if (uartData == "3") {
        music.ringTone(330)
    } else if (uartData == "4") {
        music.ringTone(349)
    } else if (uartData == "5") {
        music.ringTone(392)
    } else if (uartData == "6") {
        music.ringTone(440)
    } else if (uartData == "7") {
        music.ringTone(494)
    } else if (uartData == "8") {
        music.ringTone(523)
    } else if (uartData == "B1") {
        music.ringTone(277)
    } else if (uartData == "B2") {
        music.ringTone(311)
    } else if (uartData == "B3") {
        music.ringTone(370)
    } else if (uartData == "B4") {
        music.ringTone(415)
    } else if (uartData == "B5") {
        music.ringTone(466)
    } else if (uartData == "O") {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
}
basic.forever(function () {
    if (g_mode == 1) {
        TrackingMode()
    } else if (g_mode == 2) {
        AvoidMode()
    } else if (g_mode == 3) {
        FollowMode()
    }
    if (g_RGBMode == 5) {
        mbit_小车类.RGB_Car_Program().clear()
        mbit_小车类.RGB_Car_Program().show()
    } else if (g_RGBMode == 1) {
        mbit_小车类.RGB_Car_Program().clear()
        WaterLED()
    } else if (g_RGBMode == 2) {
        mbit_小车类.RGB_Car_Program().clear()
        HorseLED()
    } else if (g_RGBMode == 3) {
        mbit_小车类.RGB_Car_Program().clear()
        BreathLED()
    } else if (g_RGBMode == 4) {
        mbit_小车类.RGB_Car_Program().clear()
        mbit_小车类.RGB_Car_Program().setBrightness(200)
        g_Red = randint(0, 255)
        g_Green = randint(0, 255)
        g_blue = randint(0, 255)
        mbit_小车类.RGB_Car_Program().showColor(neopixel.rgb(g_Red, g_Green, g_blue))
        mbit_小车类.RGB_Car_Program().show()
        g_RGBMode = 0
    }
    basic.pause(10)
})
basic.forever(function () {
    let connected = 0
    while (connected == 1) {
        distance = mbit_小车类.Ultrasonic_Car()
        ago = "" + distance + ","
        ago = "" + ago + input.temperature()
        ago = "" + ago + "#"
        CSB = "$CSB" + ago
        bluetooth.uartWriteString(CSB)
    }
    basic.pause(2000)
})
