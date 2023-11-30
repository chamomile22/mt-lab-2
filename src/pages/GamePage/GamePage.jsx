import css from './GamePage.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BoardClass } from "../../models/BoardClass";
import Board from "../../components/Board/Board";
import Info from "../../components/Info/Info";
import { toast } from "react-toastify";

const wss = new WebSocket('ws://localhost:4000');

const GamePage = () => {
  const [board, setBoard] = useState(new BoardClass());
  const [rivalBoard, setRivalBoard] = useState(new BoardClass());
  const [rivalName, setRivalName] = useState('');
  const [shipsReady, setShipsReady] = useState(false);
  const [canShoot, setCanShoot] = useState(false);
  const navigate = useNavigate();
  const { gameId } = useParams();
  const name = localStorage.getItem('nickname');
  
  useEffect(() => {
    const isWin = board.cells.flatMap(cells => cells).filter(cell => {
      return cell.mark?.name === 'damage' || cell.mark === 'miss'
    }).length === 20;
    const isRivalWin = rivalBoard.cells.flatMap(cells => cells).filter(cell => {
      return cell.mark?.name === 'damage' || cell.mark === 'miss'
    }).length === 20;
    
    if(isWin){
      wss.send(JSON.stringify({
        event: 'win',
        payload: {
          username: rivalName,
          gameId,
          winner: rivalName,
        }
      }));
      navigate('/');
    }
    if(isRivalWin){
      navigate('/');
    }
  }, [board, rivalBoard]);
  
  wss.onmessage = (response) => {
    const { type, payload } = JSON.parse(response.data);
    const { username, firstPlayer, x, y, canStart, rivalName, success } = payload;
    
    switch (type) {
      case 'connectToGame':
        if (!success) {
          return navigate('/');
        }
        setRivalName(rivalName);
        break;
      case 'readyToPlay':
        if (payload.username === name && canStart && firstPlayer) {
          setCanShoot(true);
        }
        break;
      case 'afterShoot':
        if (username !== name && board.cells[y][x].mark?.name !== 'damage' && board.cells[y][x].mark?.name !== 'miss') {
          const isHit = board.cells[y][x].mark?.name === 'ship';
          changeBoardAfterShoot(board, setBoard, x, y, isHit);
          wss.send(JSON.stringify({
            event: 'checkShoot',
            payload: {
              ...payload,
              isHit: isHit
            }
          }))
          if (!isHit) {
            setCanShoot(true);
          }
        }
        break;
      case 'isHit':
        if (username === name) {
          changeBoardAfterShoot(rivalBoard, setRivalBoard, x, y, payload.isHit);
          payload.isHit ? setCanShoot(true) : setCanShoot(false);
        }
        break;
      case 'won':
          toast.success(`Winner is ${payload.winner}`)
        break;
      default:
        break;
    }
  }
  
  function restart() {
    const newBoard = new BoardClass();
    const newRivalBoard = new BoardClass();
    newBoard.initCells();
    newRivalBoard.initCells();
    setBoard(newBoard)
    setRivalBoard(newRivalBoard)
  }
  
  function shoot(x, y) {
    wss.send(JSON.stringify({
      event: 'shoot',
      payload: {
        username: name,
        x,
        y,
        gameId
      }
    }));
  }
  
  function ready() {
    const shipsAmount = board.cells.flatMap(cells => cells).filter(cell => {
      return cell.mark?.name === 'ship'
    }).length;
    if (shipsAmount === 20) {
      wss.send(JSON.stringify({
        event: 'ready',
        payload: {
          username: name,
          gameId
        }
      }));
      setShipsReady(true);
    } else{
      toast.warn(`Ships amount must be 20. Your amount is ${shipsAmount}`);
    }
  }
  
  useEffect(() => {
    wss.send(JSON.stringify({
      event: 'connect',
      payload: {
        username: name,
        gameId: gameId
      }
    }))
    restart();
  }, []);
  
  function changeBoardAfterShoot(board, setBoard, x, y, isHit) {
    isHit ? board.addDamage(x, y) : board.addMiss(x, y);
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }
  
  return (
    <div className={css.wrapper}>
      <h1 className={css.heading}>Welcome!</h1>
      <p>Game ID: {gameId}</p>
      <div className={css.boardsContainer}>
        <div>
          <p className={css.playerName}>{name}</p>
          <Board
            board={board}
            setBoard={setBoard}
            isShipsReady={shipsReady}
            canShoot={false}
            isMyBoard/>
        </div>
        <div>
          <p className={css.rivalName}>{rivalName || 'no rivals'}</p>
          <Board
            board={rivalBoard}
            setBoard={setRivalBoard}
            isShipsReady={shipsReady}
            canShoot={canShoot}
            shoot={shoot}/>
        </div>
      </div>
      <Info ready={ready} canShoot={canShoot} shipsReady={shipsReady}/>
    </div>
  )
}

export default GamePage;
