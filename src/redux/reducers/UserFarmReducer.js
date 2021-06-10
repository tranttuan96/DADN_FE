const stateUserFarm = {
    currentFarmIndex: -1,
    listFarm: [
    ]
}

const UserFarmReducer = (state = stateUserFarm, action) => {
    switch (action.type) {
        case "SET_LIST_FARMS":
            {
                state.listFarm = action.listFarm;
                return { ...state }
            }; break;
        case "SET_CHOOSE_FARM_INDEX":
            {
                state.currentFarmIndex = parseInt(action.index);
                return { ...state }
            }; break;
        case "SET_EMPTY_STATE":
            {
                console.log("Set empty state");
                state.currentFarmIndex = -1;
                state.listFarm = [];
                return { ...state }
            }; break;
    }
    return { ...state }
}

export default UserFarmReducer;