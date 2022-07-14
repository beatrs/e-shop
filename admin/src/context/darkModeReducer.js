
const DarkModeReducer = (state, action) => {
    if (action.type === "TOGGLE") {
        return {
            darkMode : !state.darkMode
        }
    }
}

export default DarkModeReducer