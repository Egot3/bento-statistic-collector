import { createCard } from "./modules/cardCreation"

const userLogger = document.getElementsByName('userLogger')[0]

findGit.addEventListener('submit',(e)=>createCard(e,userLogger))