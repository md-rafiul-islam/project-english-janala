const lessonContainer = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((jsonData) => {
      displayLessonBtn(jsonData.data);
    });
};
lessonContainer();

// lessons btn
const displayLessonBtn = (jsonData) => {
  //get section id
  const lessonContainerId = document.getElementById("lesson-container");
  lessonContainerId.innerHTML = "";

  //creat element

  for (const info of jsonData) {
    const btnDiv = document.createElement("div");
    // console.log(info);
    btnDiv.innerHTML = `
        <button onclick="loadLessonWords(${info.level_no})" id="btn-${info.level_no}" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i>Learn-${info.level_no}
        </button>
    `;
    //apend to lesson container
    lessonContainerId.appendChild(btnDiv);
  }
};

//active btn remove
const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  console.log(lessonBtn);
  for (const xyz of lessonBtn) {
    xyz.classList.remove("active");
  }
};
// lessons word
const loadLessonWords = (level) => {
  //active btn add
  const lsnBtn = document.getElementById(`btn-${level}`);
  removeActive();
  lsnBtn.classList.add("active");

  const url = `https://openapi.programming-hero.com/api/level/${level}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showWords(data.data));
};

const showWords = (levelId) => {
  const wordContainer = document.getElementById("words-container");
  wordContainer.innerHTML = "";

  //   id: 1;
  //   level: 3;
  //   meaning: null;
  //   pronunciation: "অবানডান্ট";
  //   word: "Abundant";

  for (words of levelId) {
    const wordBox = document.createElement("div");
    wordBox.innerHTML = `
        <div class="bg-white text-center rounded-lg shadow-md py-4">
            <p class="text-lg font-bold">${words.word}</p>
            <p class="text-xs py-2">Meaning /Pronounciation</p>
            <p class="font-bangla text-lg font-semibold">"${words.meaning} / ${words.pronunciation}"</p>
            <div class="flex justify-around pt-2">
              <div class="bg-gray-100 p-1 rounded-md hover:bg-sky-200">
                <i class="fa-solid fa-circle-info"></i>
              </div>

              <div class="bg-gray-100 p-1 rounded-md hover:bg-sky-200">
                <i class="fa-solid fa-volume-high"></i>
              </div>
            </div>
        </div>
    `;

    wordContainer.appendChild(wordBox);
  }
};
