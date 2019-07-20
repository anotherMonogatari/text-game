// Characters stats
const initState = {
    turn: 0,
    you: {
      hp: 100000,
      power: 100,
      armor: 10,
      wound: 0,
      thunderCD: 0,
      healCD: 0,
      armorCD: 0,
      powerCD: 0
    },
    enemy: {
      hp: 100000,
      power: 100,
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
    let yourAttack = attackRandom(minYouAttack, maxYouAttack) - state.enemy.armor;
    let enemyAttack = attackRandom(minEnemyAttack, maxEnemyAttack) - state.you.armor;
    let yourHeal = attackRandom(minYouAttack, maxYouAttack);

    if (action.type === 'ATTACK') {
          // Changing HP of characters and writing wounds they got
          // attack decrease abilities CDs by 1 (if CD <= 0 you can use it again)
          // when using some ability it also decrease CD of other abilities by 1
            return {
              turn: state.turn + 1,
              you: {
                ...state.you,
              hp: state.you.hp - enemyAttack,
              wound: enemyAttack,
              thunderCD: state.you.thunderCD - 1,
              healCD: state.you.healCD - 1,
              powerCD: state.you.powerCD - 1,
              armorCD: state.you.armorCD - 1
            },
              enemy: {
                ...state.enemy,
              hp: state.enemy.hp - yourAttack,
              wound: yourAttack
            }} 
    }
    // Thunder strike mechanic
    let thunderAttack = yourAttack * 4

    if (action.type === 'THUNDER') {
        return {
            turn: state.turn + 1,
            you: {
              ...state.you,
            hp: state.you.hp - enemyAttack,
            wound: enemyAttack,
            thunderCD: 3,
            healCD: state.you.healCD - 1,
            powerCD: state.you.powerCD - 1,
            armorCD: state.you.armorCD - 1
          },
            enemy: {
              ...state.enemy,
            hp: state.enemy.hp - thunderAttack,
            wound: thunderAttack
          }}
    }
    // Healing mechanic
    if (action.type === 'HEAL') {
        return {
            turn: state.turn + 1,
            you: {
              ...state.you,
            hp: state.you.hp - enemyAttack + yourHeal*2,
            wound: enemyAttack - yourHeal*2,
            healCD: 4,
            thunderCD: state.you.thunderCD - 1,
            powerCD: state.you.powerCD - 1,
            armorCD: state.you.armorCD - 1
          },
            enemy: {
              ...state.enemy,
            wound: 0
          }}
    }
    // Armor up
    if (action.type === 'ARMOR') {
      const armorBonus = 40;
      return {
        turn: state.turn + 1,
        you: {
          ...state.you,
        armor: state.you.armor + armorBonus,
        hp: state.you.hp - enemyAttack + armorBonus,
        wound: enemyAttack - armorBonus,
        armorCD: 5,
        thunderCD: state.you.thunderCD - 1,
        powerCD: state.you.powerCD - 1,
        healCD: state.you.healCD - 1
      },
        enemy: {
          ...state.enemy,
        wound: 0
      }}
    }
    // power up
    if (action.type === 'POWER') {
      const powerBonus = 100;
      return {
        turn: state.turn + 1,
        you: {
          ...state.you,
        hp: state.you.hp - enemyAttack,
        wound: enemyAttack,
        power: state.you.power + powerBonus,
        powerCD: 5,
        armorCD: state.you.armorCD - 1,
        thunderCD: state.you.thunderCD - 1,
        healCD: state.you.healCD - 1
      },
        enemy: {
          ...state.enemy,
        wound: 0
      }}
    }
    // RESTART button will refresh page
    if (action.type === 'RESTART') {
        document.location.reload()
    }
 return state
}

export default reducer
