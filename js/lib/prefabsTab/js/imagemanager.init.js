/*
* Project: Image Manager.
* Module: Initialization
* Author: Georgy Bunin (bunin.co.il@gmail.com)
* */

window.ImageManager = window.ImageManager || {};

$(document).ready(function() {

    $(".dropArea").each(function(i,e) {
        e.addEventListener("dragenter", ImageManager.ddHelper.dragEnter, false);
        e.addEventListener("dragover",  ImageManager.ddHelper.dragOver, false);
        e.addEventListener("dragexit",  ImageManager.ddHelper.dragLeave, false);
        e.addEventListener("dragleave", ImageManager.ddHelper.dragLeave, false);
        e.addEventListener("drop", ImageManager.ddHelper.drop, false);
    });

    document.body.addEventListener("drop", ImageManager.ddHelper.drop, false);

    function handleFileSelect(evt) { ImageManager.ddHelper.drop(evt); }
    document.getElementById('files').addEventListener('change', handleFileSelect, false);

    ImageManager.dbHelper.Init();
    ImageManager.dbHelper.GetImages();

    // ------------------------------------------------------------------------
    // Filter Favorites (bind events)

    $("#FilterAll").click(function() {
        var allObj = $("#FilterAll");
        var favObj = $("#FilterFavorite");

        if (!allObj.hasClass("green")) {
            allObj.addClass("green").removeClass("black");
            favObj.addClass("black").removeClass("green");
            ImageManager.dbHelper.currentFilter = allObj.attr('id');
            ImageManager.dbHelper.GetImages();
        }
    });

    $("#FilterFavorite").click(function() {
        var allObj = $("#FilterAll");
        var favObj = $("#FilterFavorite");

        if (!favObj.hasClass("green")) {
            favObj.addClass("green").removeClass("black");
            allObj.addClass("black").removeClass("green");
            ImageManager.dbHelper.currentFilter = favObj.attr('id');
            ImageManager.dbHelper.GetImages(true);
        }
    });
});

// public aliases
window.DelImg = ImageManager.dbHelper.RemoveImage;
window.FavImg = ImageManager.dbHelper.ToggleFavorite;
