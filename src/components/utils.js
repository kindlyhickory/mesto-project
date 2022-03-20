import { addCard } from "./cards.js";
import { cardsContainer, createCard } from "./cards.js";

//Html loaded
function docReady([...cards]) {
  cards.forEach(card => {
    addCard(cardsContainer, createCard(card.name, card.link));
  })
}

export { docReady }
