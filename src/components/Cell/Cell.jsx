import css from './Cell.module.css';

const Cell = ({ cell, addMark }) => {
  return (
    <div className={`${css.container} ${cell?.mark?.name}`} onClick={() => addMark(cell.x, cell.y)}>
      {cell?.mark?.name === 'miss'
      ? <div>&#183;</div>
      : <span>{cell?.mark?.logo}</span>}
    </div>
  )
}

export default Cell;

