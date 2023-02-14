import React from "react"
const Header:React.FC = () => {
    return (
        <div className="header" style={{
            width: "50%",
            margin: "10px auto",
            textAlign:"center"
        }}>
            <img src="/imgs/iconCheck.svg" style={{width:"40px"}}  alt="" />
            <span style={{fontSize: "3em",fontFamily: "cursive"}} >PomoDo</span>
        </div>
    )
}

export default Header