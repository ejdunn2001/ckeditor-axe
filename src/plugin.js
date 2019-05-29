"use strict";

(function(CKEDITOR, axe) {
  CKEDITOR.plugins.add("axe", {
    // @todo: Investigate axe-core languages system.
    lang: "en",
    // The plugin initialization logic goes inside this method.
    init: function(editor) {
      // @todo: Multilanguage.
      let lang = editor.lang.axe;
      // Create the toolbar button that executes the above command.
      editor.ui.addButton("axe", {
        label: lang.name,
        command: "axe",
        icon: this.path + "icons/axe.png",
        // According to other plugins - property "toolbar" should be added by default.
        // @see plugins/about/plugin.js
        toolbar: "others"
      });

      // Define the editor command.
      editor.addCommand("axe", {
        // Define the function that will be fired when the command is executed.
        exec: function(editor) {
          // Get ckeditor AXE config.
          let instanceName = CKEDITOR.currentInstance.name;
          let axeTags = ["best-practice"];
          // @todo: Review list of excluded rules.
          let axeExcludedRules = {
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

          let CKEdocument = CKEDITOR.instances[instanceName].document;
          let data = CKEdocument.getBody().getHtml();

          let parser = new DOMParser();
          let el = parser.parseFromString(data, "text/xml");

          axe.run(
            el,
            {
              runOnly: {
                type: "tag",
                values: axeTags
              },
              rules: axeExcludedRules
            },
            function(err, results) {
              // @todo: Center CKEditor on the screen without jQuery.

              // Get axe result.
              let axeResult = {};
              axeResult.instanceName = instanceName;
              axeResult.results = results;

              if (
                typeof results.passes !== "undefined" &&
                results.passes.length > 0
              ) {
                let title = "<p>" + results.passes[0].help + "</p>";
                let content = "<p>" + results.passes[0].description + "</p>";
                let panel = new CKEDITOR.ui.balloonPanel(CKEDITOR.instances["cke_edit-body-0-value"], {
                    title: title,
                    content: content
                });
                console.log(results);

                // Balloon panel demo.
                // @todo: this row "document.querySelectorAll("#test_image"))" is not working correctly.
                let target = new CKEDITOR.dom.element(CKEdocument["$"].getElementById("test_image"));
                panel.attach(target);
              }
            }
          );
        }
      });
    }
  });
})(CKEDITOR, axe);
