import {observable} from "mobx"

const state = observable({
    indexSelected : 0,

    modal: {
        isShown: false,
        title: "",
        id: "",
        name: "",
        alert: {
            isShown: false
        }
    },

    records: [],

    selectionActive: () => (state.records.length>0 && state.indexSelected>=0),

    getUniqueID: () => {
        return "" + (state.records.reduce(
            (currentMax, record) => {
                const currentId = parseInt(record.id, 10)
                return (currentId > currentMax) ? currentId : currentMax
            },
            0
        ) + 1)
    }
})

export { state }
