const Info = ({ready, canShoot, shipsReady})=>{
  if(!shipsReady){
    return <button type="button" onClick={()=>ready()}>Ready to play</button>
  }
  return <div>
    {canShoot ? <p>Your turn</p> : <p>Rivals turn</p>}
  </div>
}

export default Info;
