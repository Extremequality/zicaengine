define(["require", "exports", "../../../entity", "../../../game", "../../../enums", "../../../scene", "../../../keys"], function (require, exports, entity_1, game_1, enums_1, properties_1, keys_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ko = require("knockout");
    var EditorViewModel = (function () {
        /****************************************************/
        function EditorViewModel() {
			
            this.canvas = document.getElementById("field");
			this.progress = document.getElementById('progress');
			//this.splash = ...
            
            this.game = new game_1.GameRunner(this.canvas);
			window.Game = this.game;
			
			this.game.progress = this.progress;
			if(window.gameData)
			this.game.startFromData(gameData);	
			
        };
		
        return EditorViewModel;
    }());
    exports.EditorViewModel = EditorViewModel;
});