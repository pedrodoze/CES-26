const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var pos_aviao = {
    x: 0,
    y: 0
}

var pos_missil = {
    x: 50,
    y: 50
}
var mouseX = 0;
var mouseY = 0;

canvas.addEventListener("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function draw_image_plane(){
  const image1 = new Image();
  image1.src = "fig_01.png";
  pos_aviao.x = mouseX;
  pos_aviao.y = mouseY;
  ctx.drawImage(image1, pos_aviao.x, pos_aviao.y, 100, 100);
}

function draw_image_missil(){
  const image2 = new Image();
  image2.src = "missil.png";
  const angle = Math.atan2(mouseY - pos_missil.y, mouseX - pos_missil.x) + Math.PI / 4;
  // ctx.drawImage(image2, pos_missil.x, pos_missil.y, 100, 100);
  //follow the plane with the missil just rotating

  ctx.translate(pos_missil.x, pos_missil.y);
  ctx.rotate(angle);
  ctx.drawImage(image2, -50, -50, 100, 100);
  ctx.rotate(-angle);
  ctx.translate(-pos_missil.x, -pos_missil.y);
}

var state = 0;
//se clicar com botao direito do mouse
canvas.addEventListener("contextmenu", function (abc) {
  abc.preventDefault();
  console.log("clicou");
  state = 1;
  //desabilita o menu de contexto
});

function update_missil(){
  const angle = Math.atan2(mouseY - pos_missil.y, mouseX - pos_missil.x);
  pos_missil.x += Math.cos(angle) * 5;
  pos_missil.y += Math.sin(angle) * 5;
}
var mute = 0;

//event listener para o teclado letra M
canvas.addEventListener("keydown", function (e) {
  if (e.key == "m" && mute == 0){
    mute = 1;
    const audio = new Audio('explosion.mp3');
    audio.muted = true;
  }
  else if (e.key == "m" && mute == 1){
    mute = 0;
    const audio = new Audio('explosion.mp3');
    audio.muted = false;
  }
});

function check_collision(){
  if (Math.abs(pos_missil.x - pos_aviao.x)<50 && Math.abs(pos_missil.y - pos_aviao.y)<50 && state == 1){
    if (mute == 0){
      const audio = new Audio('explosion.mp3');
      audio.play();
    }
    state = 2;
  }
}


const tick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw_image_plane();
  draw_image_missil();
  if (state == 1){
    update_missil();
  }
  check_collision();
  requestAnimationFrame(tick);
}

tick();