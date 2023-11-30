import Cell from "../Cell/Cell";
import css from './Board.module.css';

const Board = ({board, setBoard, isShipsReady, isMyBoard=false, canShoot, shoot})=>{
  
  const updateBoard = ()=>{
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }
  
  const addMark = (x, y)=>{
    if(!isShipsReady && isMyBoard){
      board.addShip(x, y);
    } else if(canShoot && !isMyBoard) {
      shoot(x, y);
    }

    updateBoard();
  }

  return (<div className={`${css.container} ${canShoot && css.activeShoot}`}>
    {board.cells.map((el, index)=>{
      return <div className={css.row} key={index}>
        {el.map(item=>{
          return <Cell key={item.id} cell={item} addMark={addMark}/>
        })}
      </div>
    })}
    <div className={css.rowMarksContainer}>
      <span className={css.rowMarks}>A</span>
      <span className={css.rowMarks}>B</span>
      <span className={css.rowMarks}>C</span>
      <span className={css.rowMarks}>D</span>
      <span className={css.rowMarks}>E</span>
      <span className={css.rowMarks}>F</span>
      <span className={css.rowMarks}>G</span>
      <span className={css.rowMarks}>H</span>
      <span className={css.rowMarks}>I</span>
      <span className={css.rowMarks}>J</span>
    </div>
    <div className={css.colsMarksContainer}>
      <span className={css.collsMarks}>1</span>
      <span className={css.collsMarks}>2</span>
      <span className={css.collsMarks}>3</span>
      <span className={css.collsMarks}>4</span>
      <span className={css.collsMarks}>5</span>
      <span className={css.collsMarks}>6</span>
      <span className={css.collsMarks}>7</span>
      <span className={css.collsMarks}>8</span>
      <span className={css.collsMarks}>9</span>
      <span className={css.collsMarks}>10</span>
    </div>
  </div>)
}

export default Board;
