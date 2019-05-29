"use strict";

(function (CKEDITOR, axe, $) {
  CKEDITOR.plugins.add("axe", {
    icons: "axe",
    // The plugin initialization logic goes inside this method.
    init: function init(editor) {
      // Define the editor command.
      editor.addCommand("axe", {
        // Define the function that will be fired when the command is executed.
        exec: function exec(editor) {
          // Get ckeditor AXE config.
          var instanceName = CKEDITOR.currentInstance.name;
          var axeTags = ["best-practice"];
          // @todo: Review list of excluded rules.
          var axeExcludedRules = {
            "aria-hidden-body": { enabled: false },
            bypass: { enabled: false },
            "document-title": { enabled: false },
            "empty-heading": { enabled: false },
            "frame-tested": { enabled: false },
            "frame-title-unique": { enabled: false },
            "frame-title": { enabled: false },
            "heading-order": { enabled: false },
            "html-has-lang": { enabled: false },
            "html-lang-valid": { enabled: false },
            "html-xml-lang-mismatch": { enabled: false },
            "landmark-banner-is-top-level": { enabled: false },
            "landmark-complementary-is-top-level": { enabled: false },
            "landmark-contentinfo-is-top-level": { enabled: false },
            "landmark-main-is-top-level": { enabled: false },
            "landmark-no-duplicate-banner": { enabled: false },
            "landmark-no-duplicate-contentinfo": { enabled: false },
            "landmark-one-main": { enabled: false },
            "meta-viewport-large": { enabled: false },
            "meta-viewport": { enabled: false },
            "page-has-heading-one": { enabled: false },
            region: { enabled: false },
            "valid-lang": { enabled: false }
          };

          var CKEdocument = CKEDITOR.instances[instanceName].document;
          var data = CKEdocument.getBody().getHtml();

          var parser = new DOMParser();
          var el = parser.parseFromString(data, "text/xml");

          axe.run(el, {
            runOnly: {
              type: "tag",
              values: axeTags
            },
            rules: axeExcludedRules
          }, function (err, results) {
            // Center a CKEditor on the screen.
            // TODO Get ckeditor container id.
            $([document.documentElement, document.body]).animate({
              scrollTop: $("#cke_edit-body-0-value").offset().top
            }, 2000);

            // Get axe result.
            var axeResult = {};
            axeResult.instanceName = instanceName;
            axeResult.results = results;

            if (typeof results.passes !== "undefined" && results.passes.length > 0) {
              var title = "<p>" + results.passes[0].help + "</p>";
              var content = "<p>" + results.passes[0].description + "</p>";
              var panel = new CKEDITOR.ui.balloonPanel(CKEDITOR.instances["cke_edit-body-0-value"], {
                title: title,
                content: content
              });
              console.log(results);

              // Balloon panel demo.
              // @todo: this row "document.querySelectorAll("#test_image"))" is not working correctly.
              var target = new CKEDITOR.dom.element(CKEdocument["$"].getElementById("test_image"));
              panel.attach(target);
            }
          });
        }
      });

      // Create the toolbar button that executes the above command.
      editor.ui.addButton("axe", {
        label: "axe",
        command: "axe",
        toolbar: "insert"
      });
    }
  });
})(CKEDITOR, axe, jQuery);