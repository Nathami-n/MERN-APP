import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import api from "../utils/postAxios";
const url = '/api/auth/google/'
const FirebaseAuth = () => {
const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLoginwithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const email = user.auth.email;
      const userName = user.auth.displayName;
      const avatar = user.metadata.photoUrl;
      const sendUser = {
        email,
        userName,
        avatar,
      };
      const { data } = await api.post(url, JSON.stringify(sendUser), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(setUser({ user: data.data }))
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <button
      onClick={handleLoginwithGoogle}
      type="button"
      className="w-full bg-orange-400 -mt-2 hover:bg-blue-700 transition-colors p-2 text-white  "
    >
      Login with Google
    </button>
  );
};

export default FirebaseAuth;
