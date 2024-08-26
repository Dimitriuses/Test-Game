import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  Color,
  Engine,
  Scene,
  SceneActivationContext,
  vec,
  Vector,
} from 'excalibur';
import { Alert } from '../shared/actors/alertActor';

export class DefaultGameScene extends Scene{

  private _padde:Actor;
  private _ball:Actor;
  private _bricks: Actor[] = [];
  private ballSpeed: Vector;
  private ballFirstPosition: Vector;
  private colliding: Boolean;
  private alert: Alert;
  private isPaused:boolean = false;


  constructor(){
    super();

    this.ballFirstPosition = new Vector(100, 300);

    this._padde = new Actor({
      x: 150,
      y: 150,
      width: 200,
      height: 20,
      // Let's give it some color with one of the predefined
      // color constants
      color: Color.Chartreuse,
    });
    this._padde.body.collisionType = CollisionType.Fixed;

    this._ball = new Actor({
      pos: this.ballFirstPosition,
      // Use a circle collider with radius 10
      radius: 10,
      // Set the color
      color: Color.Red,
    });
    this.ballSpeed = vec(250, 250);
    this._ball.body.collisionType = CollisionType.Passive;
    
    this.colliding = false;
    this.alert = new Alert();
    

  }

  public onInitialize(engine: Engine) {
    engine.add(this._padde);
    this._padde.pos.y = engine.drawHeight - 40;
    engine.add(this._ball);

    engine.input.pointers.primary.on('move', (evt) => {
      if(!this.isPaused) this._padde.pos.x = evt.worldPos.x;
    });
    
    this._ball.on('postupdate', () => { if(!this.isPaused) this.updateBall(engine); });
    this._ball.on('collisionstart', (event: CollisionStartEvent) => { this.ballColisionEnter(event, engine); });
    this._ball.on('collisionend', () => { this.ballColisionEnd(); });
    this._ball.on('exitviewport', () => { this.Lose(engine);})

    this.genBricks(engine);
    
    this.alert = new Alert({
      height: engine.screen.canvasHeight,
      width: engine.screen.canvasWidth,
      pos: engine.screen.center,
      color: Color.fromRGB(1,1,1,0.5)
    });
    
    this.alert.events.on("closed", () => {engine.remove(this.alert); this.engine.goToScene('menu');});
    
  }

  public onActivate(context: SceneActivationContext<unknown>) {

    this._bricks.forEach(b => { if(b.isKilled())context.engine.add(b); });
    this._ball.pos = this.ballFirstPosition;

    setTimeout(() => {
      this._ball.vel = this.ballSpeed;
    }, 1000);

    this.isPaused = false;
    
  }

  private genBricks(engine: Engine){
    const padding = 20; // px
    const xoffset = 65; // x-offset
    const yoffset = 20; // y-offset
    const columns = 5;
    const rows = 3;

    const brickColor = [Color.Violet, Color.Orange, Color.Yellow];

    // Individual brick width with padding factored in
    const brickWidth = engine.drawWidth / columns - padding - padding / columns; // px
    const brickHeight = 30; // px
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < columns; i++) {
        this._bricks.push(
          new Actor({
            x: xoffset + i * (brickWidth + padding) + padding,
            y: yoffset + j * (brickHeight + padding) + padding,
            width: brickWidth,
            height: brickHeight,
            color: brickColor[j % brickColor.length],
          })
        );
      }
    }

    this._bricks.forEach(function (brick) {
      // Make sure that bricks can participate in collisions
      brick.body.collisionType = CollisionType.Active;

      // Add the brick to the current scene to be drawn
      engine.add(brick);
    });
  }

  private updateBall(engine: Engine) {
    if (this._ball.pos.x < this._ball.width / 2) {
      this._ball.vel.x = this.ballSpeed.x;
    }

    // If the ball collides with the right side
    // of the screen reverse the x velocity
    if (this._ball.pos.x + this._ball.width / 2 > engine.drawWidth) {
      this._ball.vel.x = this.ballSpeed.x * -1;
    }

    // If the ball collides with the top
    // of the screen reverse the y velocity
    if (this._ball.pos.y < this._ball.height / 2) {
      this._ball.vel.y = this.ballSpeed.y;
    }
  }

  private ballColisionEnter(event: CollisionStartEvent, engine: Engine){
    if (this._bricks.indexOf(event.other) > -1) {
      // kill removes an actor from the current scene
      // therefore it will no longer be drawn or updated
      event.other.kill();
    }

    if (this._bricks.every(b=> b.isKilled())){
      this.Win(engine);
    }
    
    // reverse course after any collision
    // intersections are the direction body A has to move to not be clipping body B
    // `ev.content.mtv` "minimum translation vector" is a vector `normalize()` will make the length of it 1
    // `negate()` flips the direction of the vector
    const intersection = event.contact.mtv.normalize();
    
    // Only reverse direction when the collision starts
    // Object could be colliding for multiple frames
    if (!this.colliding) {
      this.colliding = true;
      // The largest component of intersection is our axis to flip
      if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        this._ball.vel.x *= -1;
      } else {
        this._ball.vel.y *= -1;
      }
    }

  }

  private ballColisionEnd(){
    this.colliding = false;
  }

  private Lose(engine: Engine){
    //alert('You lose!');
    this.pause();
    this.alert.Text = "You lose!"
    engine.add(this.alert);
    //this.engine.goToScene('menu');
  }

  private Win(engine: Engine){
    //alert('You Win!');
    this.pause();
    this.alert.Text = "You Win!"
    engine.add(this.alert);
    //this.engine.goToScene('menu');
  }

  private pause(){
    this.isPaused = true;
    this._ball.vel = vec(0,0);
  }



  public onDeactivate(ctx: SceneActivationContext) {
    //this.saveState();
  }
  
}
 
  