import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Register from "./Sign/Register/Register";
import Login from "./Sign/Login/Login";
import ProtectedRoute from "./ProtectedRoutes";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import { setToken, getToken } from "../utils/token";
import InfoTooltip from "./Main/components/popup/components/InfoTooltip/InfoTooltip";
import signupFail from "../images/signup-fail.svg";
import signupSuccess from "../images/signup-success.svg";
import Popup from "./Main/components/popup/Popup";
import { getUserAuth } from "../utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    getUserAuth(jwt).then((response) => {
      const email = { email: response.data.email };
      setCurrentUser((prevData) => ({ ...prevData, ...email }));
      setIsLoggedIn(true);
      navigate("/");
    });
  }, [navigate]);

  useEffect(() => {
    (async () => {
      await api.getUserInfo().then((response) => {
        setCurrentUser((prevData) => ({ ...prevData, ...response }));
      });
    })();

    (async () => {
      await api
        .getInitialCards()
        .then((response) => {
          setCards(response);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api.updateUserInfo(data).then((newData) => {
        setCurrentUser((prevData) => ({ ...prevData, ...newData }));
        handleClosePopup();
      });
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.updateProfileAvatar(data).then((newData) => {
        setCurrentUser((prevData) => ({ ...prevData, ...newData }));
        handleClosePopup();
      });
    })();
  };

  const handleRegistration = ({ email, password }) => {
    auth
      .register(email, password)
      .then(() => {
        const infoTooltip = {
          children: (
            <InfoTooltip
              icon={signupSuccess}
              message="Vitória! Você precisa se registrar."
            />
          ),
        };

        handleOpenPopup(infoTooltip);
        navigate("/signin");
      })
      .catch(() => {
        const infoTooltip = {
          children: (
            <InfoTooltip
              icon={signupFail}
              message="Ops, algo saiu de errado! Por favor, tente novamente."
            />
          ),
        };
        handleOpenPopup(infoTooltip);
      });
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((response) => {
        setCurrentUser((prevData) => ({ ...prevData, ["email"]: email }));
        setToken(response.token);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(() => {
        const infoTooltip = {
          children: (
            <InfoTooltip
              icon={signupFail}
              message="Ops, algo saiu de errado! Por favor, tente novamente."
            />
          ),
        };
        handleOpenPopup(infoTooltip);
      });
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup();
  }

  function checkCurrentUserLiked(card) {
    return card.likes.some((like) => like._id === currentUser._id);
  }

  async function handleCardLike(card) {
    const isLiked = checkCurrentUserLiked(card);

    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => console.error(error));
  }

  const handleAddPlaceSubmit = (data) => {
    (async () => {
      await api.addCard(data).then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      });
    })();
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
        isLoggedIn,
      }}
    >
      <div className="page">
        <Header setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={<Register handleRegistration={handleRegistration} />}
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
        </Routes>
        <Footer />
        {popup && (
          <Popup onClose={handleClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
