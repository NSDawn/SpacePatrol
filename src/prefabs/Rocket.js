// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
         super(scene, x, y, texture, frame);
         this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
  
        // add object to existing scene
         scene.add.existing(this);
         this.isFiring = false;
         this.ACC = 0.025;
         this.DEC = 0.15;
         this.MAX_SPEED = 5;
         this.motion = [0, 0]
    }
  
    update() {
        // update pos
        if ((this.x >= (borderUISize + this.width) && this.motion[0] <= 0) ||  (this.x <= (game.config.width - borderUISize - this.width) && this.motion[0] >= 0)) {
            this.x += this.motion[0]
        } else {
            this.motion[0] = 0
        }
        this.y += this.motion[1]
         
        // left/right movement
        if(!this.isFiring) {
            if (game.input.mousePointer.x + 2 * borderUISize <= this.x) {
                this.motion[0] -= 2 * this.ACC;
                this.motion[0] = Math.max(this.motion[0], -this.MAX_SPEED);
            } else if(game.input.mousePointer.x + borderUISize <= this.x) {
                this.motion[0] -= this.ACC;
                this.motion[0] = Math.max(this.motion[0], -this.MAX_SPEED);
            } else if (game.input.mousePointer.x - 2 * borderUISize >= this.x) {
                this.motion[0] += 2 * this.ACC;
                this.motion[0] = Math.min(this.motion[0], this.MAX_SPEED);
            } else if (game.input.mousePointer.x - borderUISize >= this.x) {
                this.motion[0] += this.ACC;
                this.motion[0] = Math.min(this.motion[0], this.MAX_SPEED);
            } else {
                if (this.motion[0] < this.DEC) {
                    this.motion[0] += this.DEC;
                } else if (this.motion[0] > this.DEC) {
                    this.motion[0] -= this.DEC;
                } else {
                    this.motion[0] = 0;
                }
            }
        }
        // fire button
        if(mouseClicked && !this.isFiring) { 
            mouseClicked = false;
            this.isFiring = true;
            this.sfxRocket.play();
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderPadding * 2.5) {
            this.motion[1] -= 10 * this.ACC;
            this.motion[0] *= 1.02
        }
        // reset on miss
        if(this.y <= borderPadding * 2.5) {
            this.reset();
        }     

        p1isFiring = this.isFiring;
    } 
    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.motion = [0,0]
        this.y = game.config.height - borderUISize - borderPadding;
    } 
}

