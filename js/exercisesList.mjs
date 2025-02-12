import { exerciseDetail } from "./exerciseDetail.mjs";

const URL = "https://api.api-ninjas.com/v1/exercises?muscle=";
const key = "gp9rSHSWnOvRqZujumCF4A==4D8Ir3ONl1241BPL";

export async function searchBy(name) {
  try {
    const response = await fetch(`${URL}${name}`, {
      headers: {
        "X-Api-Key": key,
      },
    });
    const resJson = await response.json();
    console.log(resJson);
    return resJson;
  } catch (err) {
    console.error(err);
  }
}

export async function displayExercices(data) {
  const exercise = document.querySelector("#data-results");
  const div = document.createElement("div");
  const name = document.createElement("h2");
  const inst = document.createElement("p");
  const info = document.createElement("p");
  div.classList.add("data-div");
  name.textContent = data.name;
  info.innerHTML = `<strong>${data.type}</strong> : ${data.difficulty}`;

  div.appendChild(name);
  div.appendChild(info);
  div.appendChild(inst);
  div.addEventListener("click", () => {
    const exercise = new exerciseDetail(data);
    exercise.render();
  });
  exercise.appendChild(div);
}

export default class Exercise {
  async getData(text) {
    const message = document.querySelector("#results-message");
    const exercise = await searchBy(text);
    let data = [];
    try {
      if (exercise !== null) {
        exercise.forEach((element) => {
          if (element != null) {
            data.push(element);
          }
        });

        data.forEach((element) => {
          displayExercices(element);
        });

      } else {
        message.innerHTML = `No results for: <strong>"${searchValue}"</strong>`;
      }

    } catch (error) {
      console.error(error);
    }
  }
}
