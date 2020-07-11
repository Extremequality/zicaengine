/*
 * Project: Image Manager.
 * Module: DataBase Helper
 * Author: Georgy Bunin (bunin.co.il@gmail.com)
 * */

window.ImageManager = window.ImageManager || {};

ImageManager.dbHelper = {
    db : null,
    isInit : false,
    currentFilter : "",

    Init : function() {
        var dbSize = 100 * 1024 * 1024; // 100MB
        ImageManager.dbHelper.db = openDatabase("Images", "1.0", "Image Collection", dbSize);
        var sqlCreateQuery = "CREATE TABLE IF NOT EXISTS images";
        sqlCreateQuery += "(id INTEGER PRIMARY KEY ASC, fileName TEXT, fileBody BLOB, favorite BOOLEAN, added_on DATETIME)";
        ImageManager.dbHelper.db.transaction(function(tx) { tx.executeSql(sqlCreateQuery, []); });

        ImageManager.dbHelper.isInit = true;
    },

    /**
     * @return {boolean}
     */
    CheckDatabase : function() {
        var that = ImageManager.dbHelper;
        if (that.isInit) {
            return true;
        } else {
            console.log("Error: Database in not initialized");
            return false;
        }
    },

    GetImages : function(OnlyFavorites) {
        OnlyFavorites = OnlyFavorites || false;
        var that = ImageManager.dbHelper;
        if (that.CheckDatabase()) {
            var db = that.db;
            db.transaction(function(tx) {
                var query = "SELECT * FROM images";
                if (OnlyFavorites) { query += " WHERE favorite = 1" }
                tx.executeSql(query, [],
                    function(tx, rs) { ImageManager.HTMLBuilder.BuildImages(rs); },
                    function() { console.log("Error in [GetImages]"); });
            });
        }
    },

    CreateImage : function(fileName, fileBody, favorite) {
        var that = ImageManager.dbHelper;

        favorite = favorite || 0;

        if (that.CheckDatabase()) {
            var db = that.db;
            db.transaction(function(tx){
                tx.executeSql("INSERT INTO images(fileName, fileBody, favorite, added_on) VALUES (?,?,?,?)",
                    [fileName, fileBody, favorite, new Date()],
                    function(tx, results) { // success
                        ImageManager.HTMLBuilder.AppendImage({
                            id : results.insertId,
                            fileName : fileName,
                            fileBody : fileBody,
                            favorite : favorite
                        })
                    },
                    function() { console.log("Error in [CreateImage]"); });
            });
        }
    },

    RemoveImage : function(id) {
        var that = ImageManager.dbHelper;
        if (that.CheckDatabase()) {
            var db = that.db;
            db.transaction(function(tx){
                tx.executeSql("DELETE FROM images WHERE ID=?", [id],
                    function() { ImageManager.HTMLBuilder.RemoveImage(id); },
                    function() { console.log("Error in [RemoveImage]"); });
            });
        }
    },

    ToggleFavorite : function(id) {
        var that = ImageManager.dbHelper;
        if (that.CheckDatabase()) {
            var db = that.db;
            db.transaction(function(tx) {
                var query = "UPDATE images SET favorite = not favorite WHERE id = (?)";
                tx.executeSql(query, [id],
                    function(tx, rs) { ImageManager.HTMLBuilder.ToggleFavorite(rs, id); },
                    function() { console.log("Error in [GetImages]"); });
            });
        }
    }
};

