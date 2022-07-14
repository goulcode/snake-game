let canvas = document.getElementById("snake");                            // chama o canvas do html
let context = canvas.getContext("2d");                                    // cria um canvas 2d
let box = 32;                                                             // cria a caixa com valor 32
let snake = [];                                                           // cria a cobrinha e declara o valor do tamanho x e y em relação a caixa
snake[0] = {
    x: 8 * box,
    y: 8 * box,
}

let direction = "right";                                                  // cria a variável da direção da cobrinha
let food = {                                                              // cria a variável da direção da cobrinha
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,

}

function criarBG(){
    context.fillStyle = "gray";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for(i=0; i < snake.length; i++){
        context.fillStyle = "lightgreen";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function criarFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";   // recebe event em update e movimenta para esquerda
    if(event.keyCode == 38 && direction != "down") direction = "up";      // recebe event em update e movimenta para direita
    if(event.keyCode == 39 && direction != "left") direction = "right";   // recebe event em update e movimenta para cima
    if(event.keyCode == 40 && direction != "up") direction = "down";      // recebe event em update e movimenta para baixo
}

function iniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            alert('Você perdeu :( Recarregue a páina!');
            clearInverval(jogo);
        }
    }

    criarBG();
    criarCobrinha();
    criarFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);

