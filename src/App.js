import React from 'react';

import {connect} from 'react-redux';

import './styles/style.scss';

const App = (props) => {
  // Displaying stats while HP != 0 and fight result when HP < 0
  // also signaling when buffs are active
    return <section>
      <div className='class'>
        <h2>Choose a class:</h2>
        <div className='class-container'>

              
          <div><div className={'player-icon monk'}></div>
        <button onClick={props.classHandler}>Monk</button>
        <p>Can heal himself</p></div>
        

        <div><div className={'player-icon mage'}></div>
                <button onClick={props.classHandler}>Mage</button>
                <p>Can temporary boost his attack power</p></div> 
          
        <div><div className={'player-icon warrior'}></div>
        <button onClick={props.classHandler}>Warrior</button>
        <p>Can temporary boost his defence</p></div>
        </div>
      </div>

      <div className='game' style={{textAlign: 'center',
                     display: 'none'}}>
      {(props.you.hp > 0 && props.enemy.hp > 0) && <div>
        <div className='flex'>
          <div className='player'>
            <div className={`player-icon ${props.class}`}></div>
            <p><b>You:</b></p>
        <p>Health:<br></br> <b>{props.you.hp}</b> <span
          style={(props.you.wound > 0) ? {color: 'red'} : {color: 'green'}}>
            {(props.you.wound !== 0) && <b>{(props.you.wound > 0) ? -props.you.wound : `+${-props.you.wound}`}</b>}</span></p>

        <p>
          Armor:<br></br> <b>{`${props.you.armor} `}</b>
            {(props.you.armorCD >= 5) ? <i class="fas fa-angle-double-up"></i> : null}
           </p>

        <p>
           Power:<br></br> <b>{`${props.you.power}  `}</b> 
              {(props.you.powerCD >= 5) ? <i class="fas fa-angle-double-up"></i> : null}
              </p></div>

       

        <div className='player'>
            <div className='enemy-icon'></div>
          <p><b>Enemy:</b></p>
        <p>Health:<br></br> <b>{props.enemy.hp}</b> <span 
          style={{color: 'red'}}>{(props.enemy.wound !== 0) && <b>{-props.enemy.wound}</b>}</span></p>
        <p>Armor:<br></br> <b>{props.enemy.armor}</b></p>
        <p>Power:<br></br> <b>{props.enemy.power}</b></p></div>
        </div> 
        

        <button title='Your basic attack' className='button' onClick={props.attackHandler}>Attack</button>

        <button title='Deals massive amount of damage' className='button' onClick={props.thunderHandler} disabled={(props.you.thunderCD <= 0) ? false : true}>
          Crushing Blow {(props.you.thunderCD > 0) && <span>({props.you.thunderCD})</span>}</button>

        <button title='Heals your character' className='button' onClick={props.healHandler} disabled={(props.you.healCD <= 0) ? false : true}
         style={props.class !== 'monk' ? {display: 'none'} : null}>
          Heal Up {(props.you.healCD > 0) && <span>({props.you.healCD})</span>}</button>

        <button title='Power boost for 5 turns' className='button' onClick={props.powerHandler} 
        disabled={(props.you.powerCD <= 0) ? false : true} 
        style={props.class !== 'mage' ? {display: 'none'} : null}>
          Power Up {(props.you.powerCD > 0) && <span>({props.you.powerCD})</span>}</button>

        <button title='Armor boost for 5 turns' className='button' onClick={props.armorHandler} 
        disabled={(props.you.armorCD <= 0) ? false : true}
        style={props.class !== 'warrior' ? {display: 'none'} : null}>
        Armor Up {(props.you.armorCD > 0) && <span>({props.you.armorCD})</span> }</button>
      </div>}


     {(props.enemy.hp <= 0 && props.you.hp <= 0) && <p className='result'>Draw <br/><span className='hint'>
        Almost won. Want to try again?</span></p>} 
      {(props.you.hp <= 0 && props.enemy.hp > 0) && <p className='result'>You lost <br/><span className='hint'>
        Next time try to use abilities more often</span></p>}
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
    classHandler: (event) => {
      document.querySelector('.class').style.display = 'none'
      document.querySelector('.game').style.display = 'block'
      return dispatch({type: 'CLASS', payload: event.target.innerHTML.toLowerCase()})
    },
    attackHandler: () => dispatch({type: 'ATTACK'}),
    restartHandler: () => {
      document.querySelector('.class').style.display = 'block'
      document.querySelector('.game').style.display = 'none'
      return dispatch({type: 'RESTART'})},
    thunderHandler: () => dispatch({type: 'THUNDER'}),
    armorHandler: () => dispatch({type: 'ARMOR'}),
    healHandler: () => dispatch({type: 'HEAL'}),
    powerHandler: () => dispatch({type: 'POWER'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
