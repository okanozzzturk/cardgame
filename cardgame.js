import { cards } from './cards.js';
const duplicatedCards = [...cards, ...cards];

const board = ["","","","","",
"","","","","",
"","","","","",
"","","","","",
];



createBoard();
createImage();
divSelection();
playGame();



function createBoard() {
  board.forEach((card) => {
    card = document.createElement("div");
    card.classList.add("mainDiv")
    const createBoard = document.querySelector(".cardboard-js")
    createBoard.append(card);
  })
}

function createImage() {
  const createImageElements = document.querySelectorAll(".mainDiv")
  const shuffledCards = shuffleArray(duplicatedCards);
  createImageElements.forEach((element,index) => {
    const pokeName = shuffledCards[index].name;
    const pokeId = shuffledCards[index].id;
    //gereksiz ise kalkabilir
    element.innerHTML = `
    <div id="${pokeId}" class="poke-container">
      <img class="pokePics" src="cardImages/${pokeName}.png">
    </div>
    `
  })

  setTimeout(()=> {
    const pokepics = document.querySelectorAll('.pokePics');
    pokepics.forEach(poke => {
      //poke.classList.add('pokeUnVisible');
    })
  },1500)
}

  function shuffleArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
  }


  function playGame() {
    const selectedCards = [];
    const pokemons = document.querySelectorAll('.poke-container');
    pokemons.forEach(poke => {
      poke.addEventListener('click',() => {

      const pokeID = poke.id;
       poke.querySelector('img').classList.add('pokeVisible');
        
        if(selectedCards.includes(pokeID)) {
          noClick();
          selectedCards.push(pokeID);
          selectedCards.length = 0;
          removeElements(pokeID);
        } else {
          selectedCards.push(pokeID);
          console.log(selectedCards.length)
            if(selectedCards.length === 2){
                noClick();
              if(!areMatching(selectedCards)){
                selectedCards.length = 0;
                setTimeout(()=> {
                  removeSelected();
                  const pokeChildren = document.querySelectorAll('.pokeVisible')
                  pokeChildren.forEach(child => {
                    child.classList.remove('pokeVisible')
                    openClick();
                  })
                },1000)
                
              }
            }    
            
        }
      })
    })
   }


   function finishGame() {
    const allDiv = document.querySelectorAll('.mainDiv');
    const oyunBitti = Array.from(allDiv).every(div => div.children.length === 0);
    if(oyunBitti){
      alert('oyun bitti');
    }
   }
   
   function noClick() {
        const unselectedCards = document.querySelectorAll('.mainDiv');
              unselectedCards.forEach(card=> {
                if(!card.classList.contains('pokeVisible')){
                  card.classList.add('pokeClick')
                }
              })
   }

   function openClick() {
    const cards = document.querySelectorAll('.mainDiv');
    cards.forEach(card => {
        if(card.classList.contains('pokeClick')){
          card.classList.remove('pokeClick')
        }
    }
    )
   }
   

   function divSelection(){

    const pokeDivs = document.querySelectorAll('.mainDiv');
    pokeDivs.forEach(pokeBorder => {
      pokeBorder.addEventListener('click',()=> {
        pokeBorder.classList.add('selectedPoke');
        
      })
    })
  }

  

   function removeElements(id){
    setTimeout(()=> {
        const elements = document.querySelectorAll(`#${id}`)
        const pokeDiv = document.querySelectorAll('.mainDiv');

        elements.forEach(element => {
          element.remove()
        })

        pokeDiv.forEach(pokeDiv => {
          if(pokeDiv.classList.contains('selectedPoke')){
            pokeDiv.classList.remove('selectedPoke');
            pokeDiv.style.backgroundColor = "white";
          }
        })
        openClick();
        finishGame();
        },1000)
   }


   function removeSelected() {
    const pokeDiv = document.querySelectorAll('.mainDiv');

      pokeDiv.forEach(pokeDiv => {
        if(pokeDiv.classList.contains('selectedPoke')){
          pokeDiv.classList.remove('selectedPoke');
        }
      })


      
   }


   function areMatching(cards) {
    return cards[0] === cards[1];
  }
  
  

  