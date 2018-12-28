import {observable} from "mobx"

const state = observable({
    indexSelected : 1,
    records: [
        {
            id: "1",
            name: "Tom"
        },
        {
            id: "3",
            name: "Lisa"
        },
        {
            id: "4",
            name: "Sam"
        }
    ]
})

export { state }
