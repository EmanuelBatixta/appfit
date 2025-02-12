import { modalModel, getLocalStorage, setLocalStorage } from "./utils.mjs"

export function detail(exercise){
    return`
        <div class="details">
            <h1>${exercise.name}</h1>
            <h2>Infomation</h2>
            <p>${exercise.muscle} - ${exercise.type} : ${exercise.difficulty} </p>
            <h2>Instructions</h2>
            <p>${exercise.instructions}</p>
            <button class="btn-add" id="add">Add exercise</button>
        </div>

    `
}

export class exerciseDetail {

    constructor(data){
        this.data = data
        this.addToExercise = this.addToExercise.bind(this)
    }

    render(){
        const template = detail(this.data)
        modalModel(template, this.addToExercise)
    }

    addToExercise(){
        const btn = document.querySelector("#add")
        const info = `${this.data.name} - ${this.data.muscle}`

        btn.addEventListener("click", () => {
            const training = getLocalStorage("training")
            training.find(item => item === info) ? none :
            training.push(info)
            setLocalStorage("training", training)           
        })
    }

}