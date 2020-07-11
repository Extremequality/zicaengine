if (!Modernizr.websqldatabase) {
    $("#notSupported").show();
    $("section[id!='notSupported']").hide();
}
