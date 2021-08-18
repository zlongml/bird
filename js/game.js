class Game {
  constructor(){
    this.sky = new Sky();
    this.land = new Land(-100);
    this.bird = new Bird();
    this.pipeProducor = new PipePareDui(-100);
    this.timer = null;
    this.tick = 16;
    this.gameOver = false;
  }

  start() {
    if(this.timer) {
      return;
    }
    if(this.gameOver) {
      window.location.reload();
    }
    this.pipeProducor.startProduce();
    this.bird.startSwing();
    this.timer = setInterval(() => {
      const time = this.tick / 1000;
      this.sky.move(time);
      this.land.move(time);
      this.bird.move(time);
      this.pipeProducor.pairs.forEach(pair =>{
        pair.move(time);
      })
      if(this.isGameOver()){
        this.stop();
        this.gameOver = true;
      }
    }, this.tick)
   
  }
  //判断两个矩形是否碰撞
  isHit(rec1, rec2) {
    // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
    // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
    var centerX1 = rec1.left + rec1.width / 2;
    var centerY1 = rec1.top + rec1.height / 2;
    var centerX2 = rec2.left + rec2.width / 2;
    var centerY2 = rec2.top + rec2.height / 2;
    var disX = Math.abs(centerX1 - centerX2);//中心点横向距离
    var disY = Math.abs(centerY1 - centerY2);//中心点纵向距离
    if(disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2){
      return true;
    }
    return false;

  }

  isGameOver() {
    if(this.bird.top === this.bird.maxY) {
      return true;
    }
    for(let i = 0;i < this.pipeProducor.pairs.length; i++) {
      const pair = this.pipeProducor.pairs[i];
      if(this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)){
        return true;
      }
    }
    return false;
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.bird.stopSwing();
    this.pipeProducor.stopProduce();
  }

  regEvent() {
    window.onkeydown = (e) => {
      if(e.key === 'Enter') {
        if(this.timer){
          this.stop();
        }else{
          this.start();
        }
      }
      else if(e.key === ' '){
        this.bird.jump();
      }
    } 
  }
}

var g = new Game();
g.regEvent();