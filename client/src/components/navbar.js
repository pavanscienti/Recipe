import { Link,useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie" 


export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate();
  const logout = ()=>{
    setCookies("access_token","");
    window.localStorage.removeItem("userID")
    navigate("/auth");
  }
 
  const style = {
    display:"flex",
    width:"100%",
    justifyContent:'space-evenly',
    alignItems:'center',
    backgroundColor:'teal',
    height:'50px' 
  }

  return (
    <div className="navbar" style={{display:"flex",width:"100%",justifyContent:'space-evenly',alignItems:'center',backgroundColor:'teal',height:'50px'}}>
        <Link to="/" style={{textDecoration:'none',color:'silver',fontWeight:600,fontFamily:'fantasy'}}>Home</Link>
        <Link to="/create-recipe" style={{textDecoration:'none',color:'silver',fontWeight:600,fontFamily:'fantasy'}}>create</Link>
       
        {!cookies.access_token?(<Link to="/auth" style={{textDecoration:'none',color:'silver',fontWeight:600,fontFamily:'fantasy'}}>Login/Register</Link>):( 
       <><Link to="/saved-recipes" style={{textDecoration:'none',color:'silver',fontWeight:600,fontFamily:'fantasy'}}>Saved</Link>
       <button onClick={logout}>Logout</button></> 
        
        )}
    </div>
  )
}
