import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../utils/FirebaseConfig'
const FirebaseAuth = () => {
    const handleLoginwithGoogle = async ()=> {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider);
            console.log(result);
        } catch(e) {
            console.error(e)
        }
    }
  return (
    <button onClick={handleLoginwithGoogle} type='button' className="w-full bg-orange-400 -mt-2 hover:bg-blue-700 transition-colors p-2 text-white  ">
        Login with Google
    </button>
  )
}

export default FirebaseAuth