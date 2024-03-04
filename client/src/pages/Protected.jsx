import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const Protected = () => {
    const {currentUser} = useSelector((state)=> state.user)
  return (
    <div>
        {currentUser ? <Outlet/> : <Navigate to={'/sign-in'}/>}
    </div>
  )
}

export default Protected