const DELTA = 1 / 100;


function GameWorld() {

    this.balls = [
        [new Vector2(1056, 433), COLOR.RED], //3
        [new Vector2(1090, 374), COLOR.RED], //4
        [new Vector2(1126, 393), COLOR.RED], //8
        [new Vector2(1126, 472), COLOR.RED], //10;
        [new Vector2(1162, 335), COLOR.YELLOW], //11
        [new Vector2(1162, 374), COLOR.YELLOW], //12
        [new Vector2(413, 413), COLOR.WHITE] //14
    ].map(params => new Ball(params[0], params[1]));

    this.whiteBall = this.balls[this.balls.length - 1];
    this.stick = new Stick(
        new Vector2(413, 413),
        this.whiteBall.shoot.bind(this.whiteBall)
    );
}

GameWorld.prototype.handleCollisions = function  (){
    for(let i =0; i < this.balls.length ; i++) {
        for(let j = i + i; j < this.balls.length ; j++){
            const firstBall = this.balls[i];
            const secondBall = this.balls[j];
            firstBall.collideWith(secondBall);
        }
    }
}

GameWorld.prototype.update = function () {
    this.handleCollisions();
    
    this.stick.update();
    for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].update(DELTA);
    }

    if (!this.ballsMoving() && this.stick.shot) {
        this.stick.reposition(this.whiteBall.position);
    }
}

GameWorld.prototype.draw = function () {
    Canvas.drawImage(sprites.background, {
        x: 0,
        y: 20
    });

    for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].draw();

        this.stick.draw();


    }
}
GameWorld.prototype.ballsMoving = function () {
    let ballsMoving = false;

    for (let i = 0; i < this.balls.length; i++) {
        if (this.balls[i].moving) {
            ballsMoving = true;
            break;

        }
    }
    return ballsMoving;
}