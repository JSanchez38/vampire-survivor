class Enemy {
    constructor(ctx, x, y) {
        this.ctx = ctx
        
        this.x = x
        this.vx = ENEMY_SPEED_MOVE
        this.y = y
        this.w = 30 * 1.5
        this.h = 20 * 1.5

        this.sprite = new Image()
        this.sprite.src = Math.random() > 0.5 ? '/assets/img/sprites/enemy-1-sprite.png' : '/assets/img/sprites/enemy-2-sprite.png'

        this.sprite.verticalFrames = 1
        this.sprite.horizontalFrames = 3
        this.sprite.verticalFrameIndex = 0
        this.sprite.horizontalFrameIndex = 0

        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames)
        }
        
        this.animationTick = 0
        this.lives = 1


        

    }

    isDead() {
        return this.lives <= 0

    }


    draw() {

        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.w,
                this.h
            )
        }
        this.animate()

    }

    move(positionX, positionY) {
        const diffX = positionX - this.x
        const diffY = positionY - this.y

        this.x += diffX * 0.015
        this.y += diffY * 0.015
    }


    animate() {
        this.animationTick++

        if (this.animationTick >= ENEMY_RUN_ANIMATION_TICK) {
            this.animationTick = 0
            this.sprite.horizontalFrameIndex++

            if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0
            }
        }
    }

    collidesWith(element) {
        return (
            this.x < element.x + element.w &&
            this.x + this.w > element.x &&
            this.y < element.y + element.h &&
            this.h + this.y > element.y
        )
    }

}