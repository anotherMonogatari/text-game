const initState = {
    turn: 0,
    you: {
      hp: 100,
      power: 19
    },
    enemy: {
      hp: 150,
      power: 7
    }
  }

const reducer = (state = initState, action) => {
    if (action.type === 'ATTACK') {
        return {
            turn: state.turn + 1,
            you: {
              ...state.you,
            hp: state.you.hp - state.enemy.power
          },
            enemy: {
              ...state.enemy,
            hp: state.enemy.hp - state.you.power
          }}
    }
    if (action.type === 'RESTART') {
        document.location.reload()
    }
 return state
}

export default reducer
