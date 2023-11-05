document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'card1', img: 'images/card1.png' },
        { name: 'card1', img: 'images/card1.png' },
        { name: 'card2', img: 'images/card2.png' },
        { name: 'card2', img: 'images/card2.png' },
        { name: 'card3', img: 'images/card3.png' },
        { name: 'card3', img: 'images/card3.png' },
        { name: 'card4', img: 'images/card4.png' },
        { name: 'card4', img: 'images/card4.png' },
        { name: 'card5', img: 'images/card5.png' },
        { name: 'card5', img: 'images/card5.png' },
        { name: 'card6', img: 'images/card6.png' },
        { name: 'card6', img: 'images/card6.png' },
        { name: 'card7', img: 'images/card7.png' },
        { name: 'card7', img: 'images/card7.png' },
        { name: 'card8', img: 'images/card8.png' },
        { name: 'card8', img: 'images/card8.png' }
    ];

    shuffle(cardArray);

    const grid = document.querySelector('.memory-game');
    const timeDisplay = document.querySelector('#time');
    const triesDisplay = document.querySelector('#tries');
    const restartButton = document.querySelector('#restart');
    const modal = document.getElementById('fact-modal');
    const closeBtn = document.querySelector('.close');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let timer = null;
    let time = 0;
    let tries = 0;
const facts = [
    "\"Jan Szczepkowski, rzeźbiarz, urodził się w 1878 roku w Stanisławowie w Galicji.\"",
    "\"Matka Jana Szczepkowskiego, Józefa z Kuczyńskich, w wieku 13 lat pomagała powstańcom styczniowym.\"",
    "\"W 1891 r. Szczepkowski rozpoczął naukę rzeźbiarstwa ornamentalnego w Cesarsko-Królewskiej Szkole Zawodowej Przemysłu Drzewnego.\"",
    "\"Akademię Sztuk Pięknych w Krakowie, gdzie Szczepkowski studiował rzeźbę, kierowali Alfred Daun i Konstanty Laszczka.\"",
    "\"W 1900 roku Szczepkowski został kierownikiem artystycznym w biurze inż. arch. Floriana Wyganowskiego.\"",
    "\"Wczesne dzieciństwo Szczepkowskiego było silnie naznaczone przywiązaniem do rodziny, zwłaszcza do matki.\"",
    "\"Alojzy Szczepkowski, ojciec Jana, był urzędnikiem C.K. Kolei Żelaznych i miał z Józefą trzech synów.\"",
    "\"W rodzinie Jana Szczepkowskiego talent aktorski przekazywany był z pokolenia na pokolenie, wśród potomków znajdują się znani aktorzy tacy jak Andrzej i Joanna Szczepkowscy.\"",
    "\"Jan Szczepkowski poślubił aktorkę Marię Morozowicz w 1913 roku w kościele bernardynów w Krakowie.\"",
    "\"Maria Morozowicz-Szczepkowska, żona Jana, była aktorką i pisarką, która po ślubie skupiła się na karierze literackiej.\"",
    "\"W 1925 roku Szczepkowski zdobył Grand Prix za swoją kapliczkę Bożego Narodzenia na wystawie w Paryżu.\"",
    "\"Generalny Delegat Polski na Wystawę w Paryżu w 1925 roku, Jerzy Warchałowski, wybrał artystów tworzących w duchu poszukiwań polskiego stylu narodowego.\"",
    "\"Polski pawilon na Wystawie Paryskiej w 1925 roku odniósł wielki sukces, zdobywając liczne nagrody, w tym 36 Grand Prix.\"",
    "\"Polska zajęła pierwsze miejsce pod względem liczby nagrodzonych wystawców na Wystawie Paryskiej w 1925 roku, otrzymując 172 nagrody.\"",
    "\"Według monografii 'Polska i Polacy na powszechnych wystawach światowych', Polska zdobyła 205 nagród na Wystawie Paryskiej w 1925 roku.\"",
    "\"Willa Waleria, zbudowana w 1910 roku, była własnością Rufina Morozowicza i jego żony Walerii.\"",
    "\"Ostatnia kondygnacja Willi Waleria została zniszczona w 1915 roku od wybuchu szrapnela.\"",
    "\"Parter Willi Walerii służył jako pracownia Jana Szczepkowskiego.\"",
    "\"Ogród Willi Waleria został zaprojektowany zgodnie z wizją Morozowicza, z alejkami i ozdobami rzeźbiarskimi.\"",
    "\"Willa Waleria od 1982 roku znajduje się w rejestrze zabytków województwa mazowieckiego.\"",
    "\"Willa Waleria reprezentuje styl zmodernizowanego historyzmu z elementami polskiego dworu.\"",
    "\"Maria Morozowicz-Szczepkowska opisywała Willę Walerię jako 'prawdziwy Raj'.\"",
    "\"W 2007 roku budynek Willi Waleria został zakupiony przez Gminę Milanówek.\"",
    "\"W 2020 roku Milanówek otrzymał dotacje na renowację Willi Waleria.\"",
    "\"Po renowacji Willa Waleria stanie się centrum kultury z ekspozycją dzieł Szczepkowskiego i miejscem na warsztaty artystyczne.\""
];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startGame() {
        timer = setInterval(() => {
            time++;
            timeDisplay.textContent = `Czas: ${time} sekund`;
        }, 1000);
    }

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.setAttribute('alt', 'Karta');
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
        startGame();
    }
function checkForMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
        if (cardsWon.length < cardArray.length/2) {
            showFact(); // Wyświetl ciekawostkę tylko jeśli gra nadal trwa
        }
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
    }
    cardsChosen = [];
    cardsChosenId = [];
    tries++;
    triesDisplay.textContent = `Próby: ${tries}`;

    if (cardsWon.length === cardArray.length/2) {
        congratulatePlayer();
    }
}

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function showFact() {
        const factText = document.getElementById('fact-text');
        factText.textContent = facts[Math.floor(Math.random() * facts.length)];
        modal.style.display = "block";
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    function restartGame() {
        clearInterval(timer);
        timer = null;
        time = 0;
        tries = 0;
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        timeDisplay.textContent = 'Czas: 0 sekund';
        triesDisplay.textContent = 'Próby: 0';
        grid.innerHTML = '';
        shuffle(cardArray);
        createBoard();
    }

    function congratulatePlayer() {
        clearInterval(timer);
        alert(`Gratulacje! Ukończyłeś grę w ${time} sekund i ${tries} prób.`);
        restartGame(); // Restart gry po gratulacjach
    }

    restartButton.addEventListener('click', restartGame);

    createBoard();
// Funkcja zamykająca modal
function closeModal() {
  var modal = document.getElementById('fact-modal');
  modal.style.display = 'none';
}

// Nasłuchiwanie kliknięć na okno, które zamyka modal, jeśli kliknięto poza jego treścią
window.onclick = function(event) {
  var modal = document.getElementById('fact-modal');
  if (event.target == modal) {
    closeModal();
  }
}

// Możesz również dodać nasłuchiwanie do elementu z klasą 'close', jeśli istnieje
var closeButton = document.querySelector('.close');
if (closeButton) {
  closeButton.onclick = function() {
    closeModal();
  }
}
});
