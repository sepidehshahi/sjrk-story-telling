/*
Copyright 2018 OCAD University
Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.
You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/fluid-project/sjrk-story-telling/master/LICENSE.txt
*/

/* global fluid */

(function ($, fluid) {

    "use strict";

    fluid.defaults("sjrk.storyTelling.ui.testStoryViewer", {
        gradeNames: ["sjrk.storyTelling.ui.storyViewer"],
        events: {
            onNewBlockTemplateRendered: null
        },
        components: {
            story: {
                options: {
                    model: {
                        title: "A story about cats",
                        author: "Cat friend",
                        content: [{
                            blockType: "text",
                            heading: "Rootbeer",
                            text: "Rootbeer is a cute kitty.",
                            simplifiedText: "Cutebeer"
                        }]
                    }
                }
            },
            templateManager: {
                options: {
                    templateConfig: {
                        resourcePrefix: "../.."
                    }
                }
            },
            blockManager: {
                options: {
                    dynamicComponents: {
                        managedViewComponents: {
                            options: {
                                components: {
                                    templateManager: {
                                        options: {
                                            templateConfig: {
                                                resourcePrefix: "../.."
                                            },
                                            listeners: {
                                                "onTemplateRendered.notifyTestStoryViewer": {
                                                    func: "{testStoryViewer}.events.onNewBlockTemplateRendered.fire",
                                                    args: ["{that}.options.managedViewComponentRequiredConfig.containerIndividualClass"]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    fluid.defaults("sjrk.storyTelling.ui.storyViewerTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test Story Viewer UI.",
            tests: [{
                name: "Test UI controls",
                expect: 1,
                sequence: [{
                    "event": "{storyViewerTest storyViewer}.events.onControlsBound",
                    listener: "jqUnit.assert",
                    args: ["Story editor's onControlsBound event fired"]
                // },
                // TODO: waiting for this seems necessary because the block manager isn't fully created by the time onControlsBound fires; this should be fixed
                // {
                //     "event": "{storyViewer blockManager}.events.onCreate",
                //     listener: "jqUnit.assert",
                //     args: ["Block manager ready"]
                // },
                // TODO: verify blocks have been rendered in the correct order
                // {
                //     "event": "{storyViewer}.blockManager.events.viewComponentRegisteredWithManager",
                //     listener: "sjrk.storyTelling.ui.storyViewerTester.verifyBlockAdded",
                //     args: ["{storyViewer}.blockManager", "{arguments}.0", "sjrk.storyTelling.blockUi.editor.textBlockEditor"]
                // },
                // {
                //     func: "fluid.identity"
                // },
                // Wait for block to fully render
                // {
                //     "event": "{storyViewer}.events.onNewBlockTemplateRendered",
                //     listener: "jqUnit.assert",
                //     args: ["New block template fully rendered"]
                }]
            },
            {
                name: "Test buttons on page",
                expect: 1,
                sequence: [{
                    "jQueryTrigger": "click",
                    "element": "{storyViewer}.dom.storyViewerPrevious"
                },
                {
                    "event": "{storyViewer}.events.onStoryViewerPreviousRequested",
                    listener: "jqUnit.assert",
                    args: "onStorySubmitRequested event fired."
                }]
            }]
        }]
    });

    fluid.defaults("sjrk.storyTelling.ui.storyViewerTest", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            storyViewer: {
                type: "sjrk.storyTelling.ui.testStoryViewer",
                container: "#testStoryViewer",
                createOnEvent: "{storyViewerTester}.events.onTestCaseStart"
            },
            storyViewerTester: {
                type: "sjrk.storyTelling.ui.storyViewerTester"
            }
        }
    });

    $(document).ready(function () {
        fluid.test.runTests([
            "sjrk.storyTelling.ui.storyViewerTest"
        ]);
    });

})(jQuery, fluid);