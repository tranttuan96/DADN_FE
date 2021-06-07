export const setListFarms = (listFarm) => {
    return {
        type:'SET_LIST_FARMS',
        listFarm
    }
}

export const setCurrentFarmIndex = (index) => {
    return {
        type:'SET_CHOOSE_FARM_INDEX',
        index
    }
}

export const setEmptyState = () => {
    return {
        type:'SET_EMPTY_STATE',
    }
}