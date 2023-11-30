import css from './Login.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isByInvitation, setIsByInvitation] = useState(false);
  const [nickname, setNickname] = useState('');
  const [gameId, setGameId] = useState('');
  const navigate = useNavigate();
  
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const {
      elements: { nickname, variant, gameId }
    } = e.target;
    let id = variant.value === 'newGame' ? new Date().getTime() : gameId.value;
    if (nickname && id) {
      localStorage.setItem('nickname', nickname.value);
      navigate(`/game/${id}`);
    }
  }
  
  return (
    <div className={css.wrapper}>
      <h1 className={css.heading}>Enter the game</h1>
      <form className={css.form} onSubmit={handleSubmitLogin}>
        <ul className={css.variantList}>
          <li className={css.variantItem}>
            <input
              className={css.variantInput}
              name="variant"
              type="radio"
              id="newGame"
              value="newGame"
              onClick={() => setIsByInvitation(false)}
              defaultChecked
              required/>
            <label htmlFor="newGame" className={css.variantLabel}>New game</label>
          </li>
          <li className={css.variantItem}>
            <input
              className={css.variantInput}
              name="variant"
              type="radio"
              id="byGameId"
              value="byGameId"
              onClick={() => setIsByInvitation(true)}
              required/>
            <label htmlFor="byGameId" className={css.variantLabel}>Continue existing game</label>
          </li>
        </ul>
        <input
          className={css.inputName}
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required/>
        {isByInvitation && <input
          className={css.inputId}
          type="text"
          name="gameId"
          placeholder="Game ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          required/>}
        <button className={css.btnSubmit} type="submit">Play</button>
      </form>
    </div>
  )
}

export default Login;
