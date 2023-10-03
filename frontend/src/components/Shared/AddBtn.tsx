export default function AddBtn(props:{feature:Function, command?:string}):JSX.Element {

  // 버튼 스타일
  const AddBtnStyle = {
    width:"90%",
    height: "5vh",
    color: "white",
    backgroundColor: "#5cb15a",
    boxShadow: "2px 2px 2px 1px lightgray",
    margin: "1vh",
    borderRadius: '10px',
    fontSize: "2.5vh",
    fontWeight: "bold",
    Border: "none"
  }
  return (
    <>
      <button className={``} onClick={() => props.feature()} style={AddBtnStyle}>
        {props.command ? props.command : "추가하기"}
      </button>
    </>
  )
}