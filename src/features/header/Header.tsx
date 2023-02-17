import React from "react"

type TypeHeader = {
    activeModal: () => void
}

const Header:React.FC<TypeHeader> = ({activeModal}) => {
    return (
        <div className="header" style={{
            width: "50%",
            margin: "10px auto",
            borderBottom: "2px solid white"
            // textAlign:"center"
        }}>
            <img src="/imgs/iconcheck.svg" style={{width:"40px"}}  alt="" />
            <span style={{fontSize: "3em",fontFamily: "cursive",color:"white"}} >PomoDo</span>
            <img src="/imgs/settings.svg" style={{width:"40px",float:"right",position:"relative",top:"14px", cursor:"pointer"}}  alt="" onClick={ activeModal } />
        </div>
    )
}

export default Header