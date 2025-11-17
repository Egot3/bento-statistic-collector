import "../style.css";
import axios from "axios";

const findGit = document.getElementsByName("findGit")[0];
const githubRe = /^^([a-z0-9A-Z.-]+)\/([a-z0-9A-Z.-]+)$/;
let cardAmount = document.getElementsByName("card");
let cardIteration = 0;

export function createCard(e, userLogger) {
  userLogger.innerText = "";
  const gitString = e.target.childNodes[1].childNodes[3].value.split(" ");
  const regexCheckArr = new Map(
    gitString
      .map((element) => {
        let res = githubRe.exec(element);
        if (res) {
          return [res[1], res[2]];
        }
        userLogger.innerText += `Неверный ввод данных!(${element})\n`;
        return undefined;
      })
      .filter(Boolean)
  );

  //console.log(regexCheckArr);

  regexCheckArr.forEach((name, owner, map) => {
    axios
      .get(`https://api.github.com/repos/${owner}/${name}`)
      .then((githubInfo) => {
        console.log(githubInfo);
        cardAmount = document.getElementsByName("card").length;

        if (cardAmount % 3 === 0 && cardAmount != 0) {
          cardIteration++;
          const carouselHolder =
            document.getElementsByClassName("carousel-inner")[0];
          console.log(carouselHolder);
          const carouselItemNew = document.createElement("div");
          carouselItemNew.className += "carousel-item container-fluid";
          const cardHolderNew = document.createElement("div");
          cardHolderNew.className += "row";
          cardHolderNew.setAttribute("name", `cardHolder-${cardIteration}`);
          carouselHolder.appendChild(carouselItemNew);
          carouselItemNew.appendChild(cardHolderNew);
          console.log(carouselHolder);

          const indicatorHolder = document.getElementsByClassName(
            "carousel-indicators"
          )[0];
          // const indicatorHolder = document.getElementById("carouselExampleIndicators")

          const newIndicator = document.createElement("button");
          newIndicator.setAttribute("type", "button");
          newIndicator.setAttribute(
            "data-bs-target",
            "#carouselExampleIndicators"
          );
          newIndicator.setAttribute(
            "data-bs-slide-to",
            cardIteration.toString()
          );
          newIndicator.setAttribute("aria-label", `Slide ${cardIteration + 1}`);

          indicatorHolder.appendChild(newIndicator);

          const myCarousel = new bootstrap.Carousel(
            document.getElementById("carouselExampleIndicators")
          );
        }

        const cardHolder = document.getElementsByName(
          `cardHolder-${cardIteration}`
        )[0];
        console.log(
          cardIteration,
          document.getElementsByName(`cardHolder-${cardIteration}`)[0]
        );

        const card = `
        <div class="card col-4 p-3" name="card" style="overflow:visible">
          <div class="card-body">
            <a href='${githubInfo.data.git_url}'>${owner}/${name}</a>
            <span>Звёзд: ${githubInfo.data.stargazers_count}</span>
            <h6 class="card-subtitle mb-3 text-body-secondary">
              ${githubInfo.data.description}
            </h6>
            <p class="card-text">
              ${githubInfo.data.language}\n
              
            </p>
            <p class="card-text">
              Обновлен: ${githubInfo.data.updated_at}
            </p>
          
          <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Color
  </button>
  <ul class="dropdown-menu" style='z-index:16;'>
    <li><a class="dropdown-item" role="button" href="#">blue    </a></li>
    <li><a class="dropdown-item" role="button" href="#">indigo  </a></li>
    <li><a class="dropdown-item" role="button" href="#">purple  </a></li>
    <li><a class="dropdown-item" role="button" href="#">pink    </a></li>
    <li><a class="dropdown-item" role="button" href="#">red     </a></li>
    <li><a class="dropdown-item" role="button" href="#">orange  </a></li>
    <li><a class="dropdown-item" role="button" href="#">yellow  </a></li>
    <li><a class="dropdown-item" role="button" href="#">green   </a></li>
    <li><a class="dropdown-item" role="button" href="#">teal    </a></li>
    <li><a class="dropdown-item" role="button" href="#">cyan    </a></li>
    <li><a class="dropdown-item" role="button" href="#">gray    </a></li>
  </ul>
        
        </div>
        </div>
          `;

        cardHolder.innerHTML += card;
        const colorOption = document.getElementsByClassName('dropdown-item');
Array.from(colorOption).forEach(element => {
  element.addEventListener('click', (event) => console.log(element.textContent.trim()));
});
      })
      .catch((err) => {
        console.log(err);
        userLogger.innerText += `${owner}/${name} не найден!\n`;
      });
  });
}
