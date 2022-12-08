

const HEAD = (
  <div style={{ height: "50px", width: "50px", borderRadius: "100%", border: "10px solid black", position: "absolute", top: "50px", right: "-30px" }} />
)

const BODY = (
  <div style={{ height: "80px", width: "10px", background: "black", position: "absolute", top: "119px", right: "0px" }} />
)

const RIGHT_ARM = (
  <div style={{ height: "10px", width: "80px", background: "black", position: "absolute", top: "150px", right: "-80px", rotate: "-30deg", transformOrigin: "left bottom" }} />
)

const LEFT_ARM = (
  <div style={{ height: "10px", width: "80px", background: "black", position: "absolute", top: "150px", right: "10px", rotate: "30deg", transformOrigin: "right bottom" }} />
)

const RIGHT_LEG = (
  <div style={{ height: "10px", width: "100px", background: "black", position: "absolute", top: "190px", right: "-90px", rotate: "60deg", transformOrigin: "left bottom" }} />
)

const LEFT_LEG = (
  <div style={{ height: "10px", width: "100px", background: "black", position: "absolute", top: "190px", right: "0px", rotate: "-60deg", transformOrigin: "right bottom" }} />
)



const BODY_PARTS = [HEAD, BODY, LEFT_ARM, RIGHT_ARM, LEFT_LEG, RIGHT_LEG]


type HangmanDrawingProps = {
  numberOfGuesses: number
}


export function HangmanDrawing({ numberOfGuesses }:HangmanDrawingProps) {
  return (
    <div style={{ position: "relative" }}>
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div style={{ height: "50px", width: "10px", background: "black", position: "absolute", top: "0px", right: "0px" }} />
      <div style={{ height: "10px", width: "200px", background: "black", marginLeft: "120px" }} />
      <div style={{ height: "400px", width: "10px", background: "black", marginLeft: "120px" }} />
      <div style={{ height: "10px", width: "250px", background: "black" }} />
    </div>
  )
}