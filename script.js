correctAnswer = 24

const answerButton = document.getElementById("answerButton");
const answer = document.getElementById("answer");
const guesses = document.getElementById("guesses");
const guessHeader = document.getElementById("guessHeader");
const winImg = document.getElementById("winImg");

function submitAnswer() {
    guess = answer.value;
    all_guesses.push(guess);
    setCookie(all_guesses)
    checkAnswer(guess)
    return false    
}

function getCookie(){
    cookie = document.cookie.split(';').map(function(c) {
      return c.trim().split('=').map(decodeURIComponent);
    }).reduce(function(a, b) {
    try {
      a[b[0]] = JSON.parse(b[1]);
    } catch (e) {
      a[b[0]] = b[1];
    }
    return a;
    }, {});
    return cookie
  }

  function setCookie(all_guesses){
    var json_str = JSON.stringify(all_guesses);
    var cookieString = "guesses=" + json_str
    document.cookie = cookieString;
}



function checkAnswer(guess) {
    guessHeader.hidden = false;
    if (guess == correctAnswer) {
        result = "correct";
        fetch(url="https://source.unsplash.com/random/?plants/200")
        .then((response) => winImg.src = (response.url));
    } else {
        result = "incorrect";
    }
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(guess));
    li.classList.add(result)
    guesses.appendChild(li);
}

cookie = getCookie()
let all_guesses = []

if (cookie && cookie["guesses"]){
    all_guesses = cookie["guesses"];
    console.log(all_guesses)
}

if (all_guesses) {
    all_guesses.forEach(checkAnswer)
}


answerButton.onclick = submitAnswer