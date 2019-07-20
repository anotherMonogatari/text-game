import React from 'react';

import {connect} from 'react-redux';

const App = (props) => {
  // Displaying stats while HP != 0 and fight result when HP < 0
    return <section>
      <div style={{textAlign: 'center'}}>
      {(props.you.hp > 0 && props.enemy.hp > 0) && <div>
        <p>You</p>
        <p>HP: {props.you.hp} <span
          style={(props.you.wound > 0) ? {color: 'red'} : {color: 'green'}}>{(props.you.wound !== 0) && -props.you.wound}</span></p>
        <p>Armor: {props.you.armor}</p>
        <p>Attack: {props.you.power}</p>
        <p>Enemy</p>
        <p>HP: {props.enemy.hp} <span 
          style={{color: 'red'}}>{(props.enemy.wound !== 0) && -props.enemy.wound}</span></p>
        <p>Armor: {props.enemy.armor}</p>
        <p>Attack: {props.enemy.power}</p>

        <button onClick={props.attackHandler}>Attack</button>
        <button onClick={props.thunderHandler} disabled={(props.you.thunderCD <= 0) ? false : true}>Thunder</button>
        <button onClick={props.armorHandler} disabled={(props.you.armorCD <= 0) ? false : true}>Armor Up</button>
        <button onClick={props.healHandler} disabled={(props.you.healCD <= 0) ? false : true}>Heal up</button>
        <button onClick={props.powerHandler} disabled={(props.you.powerCD <= 0) ? false : true}>Power Up</button>
      </div>}
     
      <button onClick={props.restartHandler}>Restart</button>

      <h3>Turn {props.turn}</h3>

      {(props.enemy.hp <= 0 && props.you.hp <= 0) && <p>Draw</p>} 
      {(props.you.hp <= 0 && props.enemy.hp > 0) && <p>You lost</p>}
      {(props.enemy.hp <= 0 && props.you.hp > 0) && <p>You won</p>}
    </div>
    </section>
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    attackHandler: () => dispatch({type: 'ATTACK'}),
    restartHandler: () => dispatch({type: 'RESTART'}),
    thunderHandler: () => dispatch({type: 'THUNDER'}),
    armorHandler: () => dispatch({type: 'ARMOR'}),
    healHandler: () => dispatch({type: 'HEAL'}),
    powerHandler: () => dispatch({type: 'POWER'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
