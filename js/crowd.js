class Crowd {
    constructor(x, y, w,h) 
    {
      let options = {
       isStatic:true
      };
      
      this.body = Bodies.rectangle(x, y, w, h, options);
      this.w = w;
      this.h = h;
      this.crowd = loadImage("./assets/crowd.jpg");
      World.add(world, this.body);
    }
  
    show() {
      let pos = this.body.position;
      push();
      imageMode(CENTER);
      fill(255);
      image(this.crowd,pos.x,pos.y, this.w, this.h);
      pop();
    }
  }