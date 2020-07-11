/*
 * Project: Image Manager.
 * Module: HTML Helper
 * Author: Georgy Bunin (bunin.co.il@gmail.com)
 * */

window.ImageManager = window.ImageManager || {};

ImageManager.HTMLBuilder = {
    config:{
        ImageContainerId:"images",
        ImagePrefix : "image",
		Size : window.parent.settings.Assete.iconSize + 'px' //'100px'
    },

    getContainerObj:function () {
        return $("#" + ImageManager.HTMLBuilder.config.ImageContainerId + " > ul");
    },

    getHTMLObject : function(data) {

		var that = ImageManager.HTMLBuilder;
        // HTML Structure
        /*
         <li>
         <a class="img">
         <img src="" class="thumbnail"/>
         </a>
         <a class="icon delete">&nbsp;</a>
         <a class="icon fav disable">&nbsp;</a>
         <span class="imgName">Name.jpg</span>
         </li>
         */

        var li = $(document.createElement('li'));
        var a = $(document.createElement('a'));
        var img = $(document.createElement('img'));
        var iconDelete = $(document.createElement('a'));
        var iconFav = $(document.createElement('a'));
        var imgName = $(document.createElement('span'));
		
		a[0].style.width = that.config.Size;
		a[0].style.height = that.config.Size;
		
		img[0].style.width  = '100%';
		img[0].style.height  = '100%';
		img[0].onload = function(){window.parent.Editor.update();};
		img[0].ondragstart = function(event){
			var name = this.parentElement.parentElement.lastElementChild.innerHTML;
			var type  = that.getType(name);
			
			var obj = {};
			obj.name = name;
			obj.type = type;
			obj = JSON.stringify(obj);
			
			event.dataTransfer.setData("Text", obj);
		}
		
		iconDelete[0].style.top = '1px';
		iconDelete[0].style.right = '1px';
		iconDelete[0].data = data;
		iconDelete[0].onclick = function(){
			ImageManager.HTMLBuilder.RemoveImageId(this.data.id);
		};
		
		iconFav[0].style.display = 'none';
		iconFav[0].style.bottom = '20px';
		iconFav[0].style.right = '1px';
		iconFav[0].data = data;
		iconFav[0].onclick = function(){
			ImageManager.HTMLBuilder.ToggleFavorite(this.data.id);
		};
		
		imgName[0].style.width  = that.config.Size;
		
		/* data.fileBody;
		data.fileName;
		data.id;
		data.favorite; */
		
        // Generate HTML
        img.attr('src', data.fileBody).addClass("thumbnail");
        a.addClass("img").append(img).attr('alt', data.fileName).attr('title', data.fileName);
        iconDelete.addClass("icon").addClass("delete");//.attr("onclick", "DelImg('" + data.id + "');");
        iconFav.addClass("icon").addClass("fav");//.attr("onclick", "FavImg('" + data.id + "');");
        if (data.favorite) { iconFav.addClass('enable'); } else { iconFav.addClass('disable');}
        imgName.addClass('imgName').html(data.fileName);
        li.attr("id", "image" + data.id).append(a).append(iconDelete).append(iconFav).append(imgName);

        return li;
    },


    BuildImages:function (data) {
        var that = ImageManager.HTMLBuilder;
        that.getContainerObj().empty();
        for (var i = 0; i < data.rows.length; i++) {
            var li = that.getHTMLObject(data.rows.item(i));
            that.getContainerObj().append("\n").append(li);
        }
    },
	
	AppendAll:function (data) {
		if(!data)data = ImageManager.assetManager.assets;
        var that = ImageManager.HTMLBuilder;
		that.clear();
        //that.getContainerObj().empty();
        for (var i = 0; i < data.length; i++) {
            that.AppendImage(data[i]);
        }
    },
	
	RenameImage : function(id,newId,path){
		
		/* console.log(id);
		console.log(newId);
		console.log(path); */
		
		path = path + id;
		
		if(!ImageManager.assetManager.getFromPath(path))return;
		
		var that = ImageManager.HTMLBuilder;
		
		var asset = ImageManager.assetManager.getFromId(id);
		
		var asset1 = ImageManager.assetManager.getFromId(newId);
		if(asset1) that.RemoveImageId(newId); //for now can be two same name 
		
		//fatal error must be fixsed;
		
		if(asset){		
				
				var ImgObj = $(document.getElementById(that.config.ImagePrefix + id));
				
				asset.id = newId;
				asset.fileName = newId;
				asset.fileBody = asset.fileBody.replace(id,newId);
				
				ImgObj.attr("id", "image" + newId); //PREFIX MATHER FACKER
				ImgObj.find('span')[0].innerHTML = newId;
				ImgObj.find('img').attr('src',asset.fileBody);
				//Editor.update();
			}
		
		
	},

    AppendImage : function(data) {
		
		var that = ImageManager.HTMLBuilder;
		that.setIcon(data);
	
		var asset = ImageManager.assetManager.getFromId(data.id);
		
		if(asset){
			asset.fileBody = data.fileBody;
			var ImgObj = $(document.getElementById(that.config.ImagePrefix + data.id));
			ImgObj.find('img').attr('srcset',asset.type);
			ImgObj.find('img').attr('src',asset.fileBody);
			ImageManager.assetManager.update();
			//da se ubrza ako bi se unaprijed znao tip dadoteke
			parent.Editor.updateImage(asset.fileName);
			parent.Editor.updateAudio(asset.fileName);
		}else{
			
        var li = that.getHTMLObject(data);
		if(data.type)
		li.find('img').attr('srcset',data.type);
        that.getContainerObj().append("\n").append(li);
		ImageManager.assetManager.append(data);
		
		}
    },
	
	clear : function() {
		
		var that = ImageManager.HTMLBuilder;
        that.getContainerObj().empty();
		ImageManager.assetManager.clear();
		
	},
	
	update : function() {
		
		var that = ImageManager.HTMLBuilder;
        that.getContainerObj().empty();
		var asset = ImageManager.assetManager.assets;
		for(var i = 0 ; i<= asset.length-1;i++){
			that.AppendImage(asset[i]);
		}
	},
	
	RemoveImageId : function(id) {
		var asset = ImageManager.assetManager.getFromId(id);
		
		//console.log(ImageManager.assetManager.assets[0].fileBody);
		
		if(asset){
			var that = ImageManager.HTMLBuilder;
			var ImgObj = $(document.getElementById(that.config.ImagePrefix + asset.id));
			ImgObj.remove();
			ImageManager.assetManager.remove(asset);
		//Editor.update();
			return true;
		}else{
			
			console.error('error ...');
			return false;
		}
    },
	
    RemoveImage : function(path) {
		var asset = ImageManager.assetManager.getFromPath(path);
		
		//console.log(path);
		//console.log(ImageManager.assetManager.assets[0].fileBody);
		
		if(asset){
			var that = ImageManager.HTMLBuilder;
			var ImgObj = $(document.getElementById(that.config.ImagePrefix + asset.id));
			ImgObj.remove();
			ImageManager.assetManager.remove(asset);
		//Editor.update();
			return true;
		}else{
			
			console.error('error ...');
			return false;
		}
        /* var that = ImageManager.HTMLBuilder;
        that.getContainerObj()
            .find("#" + ImageManager.HTMLBuilder.config.ImagePrefix + id)
            .remove(); */
    },
	
	setIcon : function(data) {
		var that = ImageManager.HTMLBuilder;
		
		var name = that.getType(data.fileName);
			
		if(name == 'File')data.type = 'images/fileicons/default.png';
		//if(name == 'Image')data.type = 'images/fileicons/other_image.png';
		if(name == 'Audio')data.type = 'images/fileicons/other_music2.png';
		if(name == 'Video')data.type = 'images/fileicons/other_movie.png';
		
		data.atype = name;
		return data;
	},
	
	getType : function(name){
		
		var type = '';
		
		if (name.match(/.(jpg|jpeg|png|gif)$/i))type = 'Image';
		if (name.match(/.(mp3|ogg|wav)$/i))type = 'Audio';
		if (name.match(/.(js|json|txt)$/i))type = 'File';
		
		return type;
	},
	
    ToggleFavorite : function(id) {
        var that = ImageManager.HTMLBuilder;
		var a = $(document.getElementById(that.config.ImagePrefix + id));
		var ImgObj = a.find('.fav');
       /*  var ImgObj = that.getContainerObj()
            .find("#" + ImageManager.HTMLBuilder.config.ImagePrefix + id + " .fav"); */
	   if (ImgObj.hasClass('enable')) {
            ImgObj.removeClass('enable').addClass('disable');
        } else if (ImgObj.hasClass('disable')) {
            ImgObj.removeClass('disable').addClass('enable');
        }
    }
};

