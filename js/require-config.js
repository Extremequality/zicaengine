require.config({
    paths: {
        "knockout": "lib/knockout-3.4.2",
        "vs": "lib/monaco-editor/min/vs"
    }
});
require(["vs/editor/editor.main", "knockout"], function (m, ko) {
    require(["./editor"], function (editorModule) {
        ko.bindingHandlers.boundEvent = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                function generateEvent(a) {
                    element.addEventListener(a, function (e) {
                        valueAccessor()[a].call(bindingContext["$parent"] || bindingContext["$root"], e, bindingContext["$data"]);
                    });
                }
                for (var event in valueAccessor()) {
                    generateEvent(event);
                }
            },
        };
        ko.applyBindings(new editorModule.EditorViewModel());
		Editor.eventViewModel.selectEntity(null);
		Editor.eventViewModel.initEditor();
    });
});
