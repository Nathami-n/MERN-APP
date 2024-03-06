import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import api from "../utils/postAxios.jsx";
const url = "/api/v1/googleAuth";
const FirebaseAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginwithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const email = user.email;
      const userName = user.displayName;
      const avatar = user.photoURL;
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
      dispatch(setUser({ user: data.data }));
      if (data.success === true) {
        navigate("/");
      }
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
