"use strict";

// Add extra plugins.
CKEDITOR.plugins.addExternal("axe", "/axe/", "plugin.js");
CKEDITOR.config.extraPlugins = "axe,balloonpanel";
// Set bigger height for testing.
CKEDITOR.config.height = 700;
// Set CKEditor.
CKEDITOR.replace("cke_edit-body-0-value");