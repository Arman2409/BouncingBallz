type BallStatus = "bouncing" | "rolling" | "falling" | "stopped"

type DirectionStatus = "left" | "right" | false
interface GradientCoordinates {
    startX: number
    startY: number
    endX: number
    endY: number
}
