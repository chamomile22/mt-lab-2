import css from './Info.module.css';

const Info = ({ready=false, canShoot=false, shipsReady})=>{
  if(!shipsReady){
    return <button className={css.buttonReady} type="button" onClick={()=>ready()}>Ready to play</button>
  }
  return <div>
    {canShoot ? <p>Your turn</p> : <p>Rivals turn</p>}
  </div>
}

export default Info;
