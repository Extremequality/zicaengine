/*
 * Project: Image Manager.
 * Module: HTML Helper
 * Author: Georgy Bunin (bunin.co.il@gmail.com)
 * */

window.ImageManager = window.ImageManager || {};

ImageManager.HTMLBuilder = {
    config:{
        ImageContainerId:"images",
        ImagePrefix : "image"
    },

    getContainerObj:function () {
        return $("#" + ImageManager.HTMLBuilder.config.ImageContainerId + " > ul");
    },

    getHTMLObject : function(data) {

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
		
		var icon = img[0];
		
		var type = data.fileName.substring(data.fileName.lastIndexOf('.') + 1);
		(type == 'entity')?icon.srcset = 'img/entity.png':icon.srcset = 'img/scene.jpg';
		
		var name = data.fileName.substring(0,data.fileName.lastIndexOf('.'));
		data.fileName = name;
		
		icon.name1 = name;
		icon.type1 = type;
		icon.data = JSON.parse(data.fileBody);
		
		icon.ondragstart = function(event){
			
			var obj = {};
			obj.name = this.name1;
			obj.type = this.type1;
			obj.data = this.data;
			obj = JSON.stringify(obj);
			
			event.dataTransfer.setData("text", obj);
		}
		
        // Generate HTML
        img.attr('src', data.fileBody).addClass("thumbnail");
        a.addClass("img").append(img).attr('alt', data.fileName).attr('title', data.fileName);
        iconDelete.addClass("icon").addClass("delete").attr("onclick", "DelImg(" + data.id + ");");
        iconFav.addClass("icon").addClass("fav").attr("onclick", "FavImg(" + data.id + ");");
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

    AppendImage : function(data) {
        var that = ImageManager.HTMLBuilder;
        var li = that.getHTMLObject(data);
        that.getContainerObj().append("\n").append(li);
    },

    RemoveImage : function(id) {
        var that = ImageManager.HTMLBuilder;
        that.getContainerObj()
            .find("#" + ImageManager.HTMLBuilder.config.ImagePrefix + id)
            .remove();
    },

    ToggleFavorite : function(data, id) {
        var that = ImageManager.HTMLBuilder;
        var ImgObj = that.getContainerObj()
            .find("#" + ImageManager.HTMLBuilder.config.ImagePrefix + id + " .fav");
        if (ImgObj.hasClass('enable')) {
            ImgObj.removeClass('enable').addClass('disable');
            if (ImageManager.dbHelper.currentFilter == "FilterFavorite") {
                that.RemoveImage(id);
            }
        } else if (ImgObj.hasClass('disable')) {
            ImgObj.removeClass('disable').addClass('enable');
        }
    }
};

