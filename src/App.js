import React from 'react';

import {connect} from 'react-redux';

const App = (props) => {
    return <section>
      <div style={{textAlign: 'center'}}>
      {(props.you.hp > 0 && props.enemy.hp > 0) && <div>
        <p>You</p>
        <p>HP: {props.you.hp}</p>
        <p>Attack: {props.you.power}</p>
        <p>Enemy</p>
        <p>HP: {props.enemy.hp}</p>
        <p>Attack: {props.enemy.power}</p>

        <button onClick={props.attackHandler}>Attack</button>
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
    restartHandler: () => dispatch({type: 'RESTART'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
