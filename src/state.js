import {observable} from "mobx"

const state = observable({
    indexSelected : 0,
    modalTitle: "Modal Title",
    modalIsShown: false,
    records: [],

    selectionActive: () => (state.records.length>0 && state.indexSelected>=0)
})

export { state }
