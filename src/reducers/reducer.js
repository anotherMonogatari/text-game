// Characters stats

const initState = {
    class: 'monk',
    turn: 0,
    you: {
      hp: 1500,
      power: 100,
      armor: 10,
      wound: 0,
      thunderCD: 0,
      healCD: 0,
      armorCD: 0,
      powerCD: 0
    },
    enemy: {
      hp: 2500,
      power: 120,
      armor: 40,
      wound: 0
    }
  }

const reducer = (state = initState, action) => {
    // Randomazing attack
    const minEnemyAttack = state.enemy.power * 0.9;
    const maxEnemyAttack = state.enemy.power * 1.1;
    const minYouAttack = state.you.power * 0.9;
    const maxYouAttack = state.you.power * 1.1;
    const attackRandom = (min, max) => {
        return Math.round(Math.random() * (max - min + 1) ) + min;
      }
    // Calculating damage reduction by armor
    const yourAttack = attackRandom(minYouAttack, maxYouAttack) - state.enemy.armor;
    const enemyAttack = attackRandom(minEnemyAttack, maxEnemyAttack) - state.you.armor;
    const yourHeal = attackRandom(minYouAttack, maxYouAttack);
    // here you can change ballance of your abilities
    const healMultiplier = 3;
    const healTimeOut = 6;

    const thunderMultiplier = 4;
    const thunderAttack = (yourAttack + state.enemy.armor) * thunderMultiplier - state.enemy.armor;
    const thunderTimeOut = 3;

    const armorBonus = 70;
    const armorDuration = 5;
    const armorTimeOut = 10;
    const powerBonus = 90;
    const powerDuration = 5;
    const powerTimeOut = 10;

    if (action.type === 'CLASS') {
      return {
        ...state,
        class: action.payload
      }
    }

    if (action.type === 'ATTACK') {
          // Changing HP of characters and writing wounds they got
          // attack decrease abilities CDs by 1 (if CD <= 0 you can use it again)
          // when using some ability it also decrease CD of other abilities by 1
            // Basic attack
            return {
            ...state,
            turn: state.turn + 1,
            you: {
              ...state.you,
              // Returning initial armor after 5 turns
              // in the turn when armor up ends change your armor              
              hp: (() => {
                if (state.you.armorCD === armorDuration) {return state.you.hp - enemyAttack - armorBonus}
                else {return state.you.hp - enemyAttack}
              })(),
              armor: (() => {
                if (state.you.armorCD === armorDuration) {return initState.you.armor}
                else {return state.you.armor}
              })(),
              wound: (() => {
                if (state.you.armorCD === armorDuration) {return enemyAttack + armorBonus}
                else {return enemyAttack}
              })(),
            // Returning initial power after 5 turns
              power: (() => {
                if (state.you.powerCD === powerDuration) {return initState.you.power}
                else {return state.you.power}
              })(),
              thunderCD: state.you.thunderCD - 1,
              healCD: state.you.healCD - 1,
              powerCD: state.you.powerCD - 1,
              armorCD: state.you.armorCD - 1
            },
            enemy: {
              ...state.enemy,
              // in the turn when power up ends change your attack
              hp: (() => {
                if (state.you.powerCD === powerDuration) {return state.enemy.hp - yourAttack + powerBonus}
                else {return state.enemy.hp - yourAttack}
              })(),
              wound: (() => {
                if (state.you.powerCD === powerDuration) {return yourAttack - powerBonus}
                else {return yourAttack}
              })()
          }} }         
    // Thunder strike mechanic
    if (action.type === 'THUNDER') {
        return {
          ...state,
          turn: state.turn + 1,
          you: {
            ...state.you,
            hp: (() => {
              if (state.you.armorCD === armorDuration) {return state.you.hp - enemyAttack - armorBonus}
              else {return state.you.hp - enemyAttack}
            })(),
            armor: (() => {
              if (state.you.armorCD === armorDuration) {return initState.you.armor}
              else {return state.you.armor}
            })(),
            wound: (() => {
              if (state.you.armorCD === armorDuration) {return enemyAttack + armorBonus}
              else {return enemyAttack}
            })(),
            power: (() => {
              if (state.you.powerCD === powerDuration) {return initState.you.power}
              else {return state.you.power}
            })(),
            thunderCD: thunderTimeOut,
            healCD: state.you.healCD - 1,
            powerCD: state.you.powerCD - 1,
            armorCD: state.you.armorCD - 1
          },
            enemy: {
              ...state.enemy,
              hp: (() => {
                if (state.you.powerCD === powerDuration) {return state.enemy.hp - thunderAttack + 
                  (yourAttack + state.enemy.armor - powerBonus) * 4 - state.enemy.armor}
                else {return state.enemy.hp - thunderAttack}
              })(),
              wound: (() => {
                if (state.you.powerCD === powerDuration) {return thunderAttack - 
                  (yourAttack + state.enemy.armor - powerBonus) * 4 - state.enemy.armor}
                else {return thunderAttack}
              })()
          }}
    }
    // Healing mechanic
    if (action.type === 'HEAL') {
        return {
          ...state,
          turn: state.turn + 1,
          you: {
            ...state.you,
            // Preventing heal over max hp
            hp: (() => {
                  if (state.you.hp - enemyAttack + yourHeal*healMultiplier >= initState.you.hp) {return initState.you.hp}
                  else {return state.you.hp - enemyAttack + yourHeal*healMultiplier}
                  })(),
            wound: enemyAttack  - yourHeal*healMultiplier,
            healCD: healTimeOut,
            thunderCD: state.you.thunderCD - 1
          },
          enemy: {
            ...state.enemy,
            wound: 0
          }}
    }
    // Armor up
    if (action.type === 'ARMOR') {
      return {
        ...state,
        turn: state.turn + 1,
        you: {
        ...state.you,
        armor: state.you.armor + armorBonus,
        hp: state.you.hp - enemyAttack + armorBonus,
        wound: enemyAttack - armorBonus,
        armorCD: armorTimeOut,
        thunderCD: state.you.thunderCD - 1
      },
        enemy: {
        ...state.enemy,
        wound: 0
      }}
    }
    // power up
    if (action.type === 'POWER') {
      return {
        ...state,
        turn: state.turn + 1,
        you: {
        ...state.you,
        hp: state.you.hp - enemyAttack,
        wound: enemyAttack,
        power: state.you.power + powerBonus,
        powerCD: powerTimeOut,
        thunderCD: state.you.thunderCD - 1
      },
        enemy: {
        ...state.enemy,
        wound: 0
      }}
    }
    // RESTART button will refresh page
    if (action.type === 'RESTART') {
      return initState
    }
 return state
}

export default reducer
