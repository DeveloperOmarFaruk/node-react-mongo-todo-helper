import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  getIdToken,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import FirebaseInitilaiz from "../Firebase/FirebaseInitilaiz";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

FirebaseInitilaiz();

const useFirebase = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [users, setUsers] = useState([]);
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [resetEmail, setResetEmail] = useState("");
  const URL = `${process.env.REACT_APP_URL}`;
  const auth = getAuth();
  const navigate = useNavigate();

  // =================================
  // Firebase Register Functionality
  // =================================

  const handleRegisterChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const res = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return res.test(String(email).toLowerCase());
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;

    if (!validateEmail(email)) {
      toast.error("Invalid email address!");
      return;
    }

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        toast.error("Email already in use");
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const newUser = { email, displayName: name };
            const role = "user";
            setUserInfo(newUser);
            saveUserDB(email, name, role);
            updateProfile(auth.currentUser, {
              displayName: name,
            })
              .then(() => {})
              .catch((error) => {});
            toast.success("Register Successful");
            navigate(`/`);
            setFormData({
              name: "",
              email: "",
              password: "",
            });
          })
          .catch((error) => {
            setError(error.message);
          });
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(true);
  };

  // ============================
  // Save User DB Functionality
  // ============================
  const saveUserDB = async (email, displayName, role) => {
    const user = { email, displayName, role };
    const res = await axios.post(`${URL}/users`, user);
    if (res.data.insertedId) {
    }
  };

  // ===============================
  // Firebase Login Functionality
  // ===============================
  const windowScroll = () => {
    window.scrollTo(0, 0);
    toast.success("Login Successful");
    navigate("/");
  };

  const handleLoginChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = formData.email;
    const password = formData.password;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserInfo(user);
        setFormData({
          email: "",
          password: "",
        });
        windowScroll();
      })
      .catch((error) => {
        setError(error.message);
      });
    setLoading(true);
  };

  // =====================================
  // Firebase Current User Functionality
  // =====================================

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        getIdToken(user).then((idToken) => {
          setAuthToken(idToken);
        });
      }
      setLoading(false);
    });
  }, [auth]);

  // =====================================
  // Firebase Logout  Functionality
  // =====================================

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserInfo({});
        toast.success("Logout Successful");
        navigate(`/login`);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // =====================================
  // Firebase Password Reset  Functionality
  // =======================================

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const email = resetEmail;
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent");
      navigate(`/login`);
    } catch (error) {
      setError(error.message);
    }
  };

  // ====================================================
  //  Users Load Functionality
  // ====================================================

  const handleFetchUser = async () => {
    const res = await axios.get(`${URL}/users`);

    try {
      const result = await res.data;
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  // ====================================================
  //  Users Role Create Functionality
  // ====================================================

  const handleUserRoleCreate = async (email, role) => {
    const roleInfo = {
      email: email,
      role: role,
    };

    const res = await axios.put(`${URL}/users/admin`, roleInfo, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });

    if (res.data.matchedCount > 0) {
      toast.success("User Role Change Successful");
    }
  };

  // ==================================================
  // Admin Load Functionality
  // ====================================================

  useEffect(() => {
    axios
      .get(`${URL}/users/${userInfo.email}`)
      .then((res) => {
        setAdminEmail(res.data.adminEmail);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [userInfo.email, URL]);

  return {
    userInfo,
    authToken,
    auth,
    formData,
    users,
    adminEmail,
    loading,
    setUserInfo,
    setFormData,
    setError,
    handleRegisterChange,
    handleLoginChange,
    handleRegister,
    handleLogin,
    signInWithEmailAndPassword,
    handleLogout,
    handleUserRoleCreate,
    handleFetchUser,
    handlePasswordReset,
    setResetEmail,
  };
};

export default useFirebase;
