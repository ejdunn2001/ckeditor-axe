"use strict";

// Add extra plugin.
CKEDITOR.config.extraPlugins = "balloonpanel";

CKEDITOR.replace("editor1");

function test() {
  // Create Doc object for axe-core library.
  var doc = document.implementation.createHTMLDocument("New Document");
  var p = doc.createElement("p");
  p.innerHTML = CKEDITOR.instances.editor1.document.getBody().getHtml();
  try {
    doc.body.appendChild(p);
  } catch (e) {
    console.log(e);
  }

  console.log(doc);

  // Axe core demo with image-alt.
  axe.run(doc, {
    runOnly: {
      type: "rule",
      values: ["image-alt"]
    }
  }, function (err, results) {
    console.log("buu");
    console.log(results);
    console.log(err);

    // @todo handle all violations not just first item.
    if (typeof results.violations !== "undefined" && results.violations.length > 0) {
      var title = "<p>" + results.violations[0].help + "</p>";
      var content = "<p>" + results.violations[0].description + "</p>";
      var panel = new CKEDITOR.ui.balloonPanel(CKEDITOR.instances.editor1, {
        title: title,
        content: content
      });

      // Balloon panel demo.
      panel.attach(document.querySelectorAll("#test_image"));
    }
  });
}

setTimeout(test, 2000);