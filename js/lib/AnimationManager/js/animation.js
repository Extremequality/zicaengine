
   function Animation(sy, width, height, frameCount, id)
   {
      this.sy = sy;
      this.width = width;
      this.height = height;
      this.frameCount = frameCount;
      this.frame = 0;
      this.id = id;
   }

   Animation.prototype.nextFrame = function()
   {
      this.frame = (this.frame + 1) % this.frameCount;
   }

   Animation.prototype.drawFrame = function(context, objImg, x, y)
   {
	if(!parent.Editor)return;

	var sel = parent.Editor.selected || parent.Editor.scene;

	if(sel)
	var img = sel.__image;
	if(!img.src)img = new Image();
			
	  //this.width, this.height
      context.drawImage(img, this.frame*this.width, this.sy, this.width, this.height, x, y,canvas.width,canvas.height );
   }