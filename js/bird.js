const birdDom = document.querySelector('.bird');
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdTop = parseFloat(birdStyles.top);
const birdLeft = parseFloat(birdStyles.left);
const gameDom = document.querySelector('.game');
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle{
  constructor(){
    super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0,birdDom);
    this.g = 1500;//向下加 速
    this.maxY = gameHeight - landHeight - this.height;
    this.swingStatus = 1; //翅膀状态
    this.timer = null;
    this.render();
  }

  //开始煽动翅膀
  startSwing() {
    if(this.timer) {
      return;
    }
    this.timer = setInterval(() =>{
      this.swingStatus++;
      if(this.swingStatus === 4){
        this.swingStatus = 1;
      }
      this.render();
    },220)
  }

  render() {
    super.render();
    this.dom.className = `bird swing${this.swingStatus}`

  }

  //开始煽动翅膀
  stopSwing() {
    clearInterval(this.timer);
    this.timer = null;
  }

  move(istime) {
    super.move(istime);// 调用父类方法
    this.ySpeed += this.g * istime;
  }

  onMove(){
    if(this.top < 0) {
      this.top = 0;
    }
    else if(this.top > this.maxY) {
      this.top = this.maxY;
    }
  }

  jump(){
    this.ySpeed = -400;
  }

}
