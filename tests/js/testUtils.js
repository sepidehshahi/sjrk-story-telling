/*
Copyright 2017 OCAD University
Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.
You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/fluid-project/sjrk-story-telling/master/LICENSE.txt
*/

/* global fluid, sjrk, jqUnit */

(function ($, fluid) {

    "use strict";

    fluid.registerNamespace("sjrk.storyTelling.testUtils");

    /* Changes the content of a specified HTML element to the given value.
     * This is abstracted to a utility function in order to use it with gpii-binder
     * when setting up tests. It triggers the change event in order to ensure
     * the form value is relayed to the model, as val on its own does not.
     * - "component": the infusion component containing the element
     * - "selector": the infusion selector of the element
     * - "value": the value to which the element will be set using jQuery val()
     */
    sjrk.storyTelling.testUtils.changeFormElement = function (component, selector, value) {
        component.locate(selector).val(value).change();
    };

    /* Verifies that specified UI "pages" are visible or hidden in the DOM.
     * The pages are DOM elements, but could be entire UI grades or internal to them.
     * Visible is taken to mean "display: block" and hidden is "display: none".
     * - "expectedHidden": a collection of elements which should be hidden
     * - "expectedVisible": a collection of elements which should be visible
     */
    sjrk.storyTelling.testUtils.verifyPageVisibility = function (expectedHidden, expectedVisible) {
        fluid.each(expectedHidden, function (el) {
            sjrk.storyTelling.testUtils.assertElementVisibility(el, "none");
        });

        fluid.each(expectedVisible, function (el) {
            sjrk.storyTelling.testUtils.assertElementVisibility(el, "block");
        });
    };

    /* Asserts that an individual DOM element has a given visibility state
     * according to its css "display" value. Uses jqUnit for the assertion.
     * - "element": the DOM element to be tested
     * - "expectedVisibility": the display state which is expected
     */
    sjrk.storyTelling.testUtils.assertElementVisibility = function (element, expectedVisibility) {
        var friendlyName = element.selectorName || element.selector;
        jqUnit.assertEquals("The element " + friendlyName + " has expected visibility", expectedVisibility, element.css("display"));
    };

    /* Asserts that an individual DOM element has a given text value
     * according to the jQuery text() function. Uses jqUnit for the assertion.
     * - "element": the DOM element to be tested
     * - "expectedText": the expected text value of the element
     */
    sjrk.storyTelling.testUtils.assertElementText = function (element, expectedText) {
        var friendlyName = element.selectorName || element.selector;
        jqUnit.assertEquals("The element " + friendlyName + " has expected text", expectedText, element.text());
    };

})(jQuery, fluid);
