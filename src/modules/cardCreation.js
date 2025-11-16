import '../style.css'
import axios from 'axios'

const findGit = document.getElementsByName('findGit')[0]
const githubRe = /^^([a-z0-9A-Z.-]+)\/([a-z0-9A-Z.-]+)$/
let cardAmount = document.getElementsByName('card')

export function createCard(e,userLogger){
  userLogger.innerText = ''
  const cardHolder = document.getElementsByName('cardHolder')[0]
  const gitString = e.target.childNodes[1].childNodes[3].value.split(' ')
  const regexCheckArr = new Map(gitString.map((element)=>{
    let res = githubRe.exec(element)
    if(res){

      return [res[1], res[2]]
    }
    userLogger.innerText+=`Неверный ввод данных!(${element})\n`
    return undefined
  })
.filter(Boolean))

console.log(regexCheckArr)

regexCheckArr.forEach((name, owner, map)=>{
    axios.get(`https://api.github.com/repos/${owner}/${name}`)
    .then((githubInfo)=>{
      console.log(githubInfo)
      cardAmount = document.getElementsByName('card');
      if(cardAmount%3===0 && cardAmount!=0){
        
      }
    const html = `
        <div class="card col-4" name="card">
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
          </div>
        </div>
          `

  cardHolder.innerHTML += html
})
.catch((err)=>{
      console.log(err)
      userLogger.innerText += `${owner}/${name} не найден!\n`
    })
})
}
