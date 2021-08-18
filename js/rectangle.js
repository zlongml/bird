/**\
 * 可移动的矩形
 * 
 * 宽 高 横坐标 纵坐标 横向速度 纵向速度 对应dom
 */
class Rectangle {
  constructor(width, height, left, top, xSpeed, ySpeed, dom){
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.dom = dom;
    this.render();
  }

  render() {
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
    this.dom.style.left = this.left + 'px';
    this.dom.style.top = this.top + 'px';
  }


  move(istime) {
    const xDis = this.xSpeed * istime;
    const yDis = this.ySpeed * istime;
    const newleft = this.left + xDis;
    const newtop = this.top + yDis;
    this.left = newleft;
    this.top = newtop;

    if(this.onMove) {
      this.onMove();
    }

    this.render();
  }

}