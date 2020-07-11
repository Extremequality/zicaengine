class Sprite
{
   constructor(image, x, y)
   {
      this.image = image;
      this.x = x;
      this.y = y;
      this.left = false;
      this.right = false;
      this.stop = true;
      this.animations = [];
      this.currentAnimation = null;

      this.objImg = new Image();
   }

   addAnimation(animation)
   {
      this.animations.push(animation);
   }

   getAnimationbyId(id)
   {
      let animation = this.animations.find(function (animation){
         return animation.id === id });

      return animation;
   }

   moveRight(condition)
   {
      if(condition)
      {
         this.setAnimation("right");
      }
      else
      {
         this.setAnimation("standing");
      }
   }

   moveLeft(condition)
   {
      if(condition)
      {
         this.setAnimation("left");
      }
      else
      {
         this.setAnimation("standing");
      }
   }

   stop()
   {
      this.setAnimation("standing");
   }

   setAnimation(id)
   {
      this.currentAnimation = this.getAnimationbyId(id);
   }

   update()
   {
      this.currentAnimation.nextFrame();
   }

   draw(context)
   {
      this.currentAnimation.drawFrame(context, this.objImg, this.x, this.y);
   }
}
