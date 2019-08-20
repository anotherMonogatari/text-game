import React from 'react';

import {connect} from 'react-redux';

import './styles/style.css';

const App = (props) => {
  // Displaying stats while HP != 0 and fight result when HP < 0
  // also signaling when buffs are active
    return <section>
      <div style={{textAlign: 'center'}}>
      {(props.you.hp > 0 && props.enemy.hp > 0) && <div>
        <div className='flex'>
          <div className='player'><p>You</p>
        <p><i className='fas fa-heart'></i> {props.you.hp} <span
          style={(props.you.wound > 0) ? {color: 'red'} : {color: 'green'}}>
            {(props.you.wound !== 0) && -props.you.wound}</span></p>

        <p>
          <span className={(props.you.armorCD >= 5) && 'activeBuff'} ><i className='fas fa-shield-alt'></i></span> {props.you.armor}</p>

        <p>
           <span className={(props.you.powerCD >= 5) && 'activeBuff'} ><i className='fas fa-fist-raised'></i></span> {props.you.power}</p></div>

        <span className='vs'>VS</span>

        <div className='player'><p>Enemy</p>
        <p><i className='fas fa-heart'></i> {props.enemy.hp} <span 
          style={{color: 'red'}}>{(props.enemy.wound !== 0) && -props.enemy.wound}</span></p>
        <p><i className='fas fa-shield-alt'></i> {props.enemy.armor}</p>
        <p><i className='fas fa-fist-raised'></i> {props.enemy.power}</p></div>
        </div> 
        

        <button className='button' onClick={props.attackHandler}>Attack</button>

        <button className='button' onClick={props.thunderHandler} disabled={(props.you.thunderCD <= 0) ? false : true}>
          Thunder Strike {(props.you.thunderCD > 0) && <span>({props.you.thunderCD})</span>}</button>

        <button className='button' onClick={props.healHandler} disabled={(props.you.healCD <= 0) ? false : true}>
          Heal Up {(props.you.healCD > 0) && <span>({props.you.healCD})</span>}</button>

        <button className={(props.you.powerCD >= 5) ? 'button button-active' : 'button'} onClick={props.powerHandler} 
        disabled={(props.you.powerCD <= 0) ? false : true} 
         >
          Power Up {(props.you.powerCD > 0) && <span>({props.you.powerCD})</span>}</button>

        <button className={(props.you.armorCD >= 5) ? 'button button-active' : 'button'} onClick={props.armorHandler} 
        disabled={(props.you.armorCD <= 0) ? false : true}
        >
        Armor Up {(props.you.armorCD > 0) && <span>({props.you.armorCD})</span> }</button>
      </div>}


     {(props.enemy.hp <= 0 && props.you.hp <= 0) && <p className='result'>Draw <br/><span className='hint'>
        Almost won. Want to try again?</span></p>} 
      {(props.you.hp <= 0 && props.enemy.hp > 0) && <p className='result'>You lost <br/><span className='hint'>
        Next time try this OP combos: Power Up + Thunder Strike and Power Up + Heal Up</span></p>}
      {(props.enemy.hp <= 0 && props.you.hp > 0) && <p className='result'>You won <br/><span className='hint'>
        Looks like we have a God Gamer here</span></p>}
    
      <button className='button button-restart' onClick={props.restartHandler}>Restart</button>


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
