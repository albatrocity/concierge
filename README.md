# Concierge
Concierge is jQuery plugin that creates a walkthrough guide for use in educating users about stuff on the page.

It was written in Coffeescript and requires Twitter's [Bootsrap Tooltip](https://github.com/twitter/bootstrap/blob/master/js/bootstrap-tooltip.js) and [Bootstrap Popover](https://github.com/twitter/bootstrap/blob/master/js/bootstrap-tooltip.js) plugins, and of course jQuery. The [Bootstrap Transition plugin](https://github.com/twitter/bootstrap/blob/master/js/bootstrap-popover.js) is required if you want animation support.

## Dependencies
* [jQuery](http://jquery.com/)
* [Bootsrap Tooltip](https://github.com/twitter/bootstrap/blob/master/js/bootstrap-tooltip.js)
* [Bootstrap Popover](https://github.com/twitter/bootstrap/blob/master/js/bootstrap-tooltip.js)

# Usage
Concierge works by calling the plugin on a jQuery element that you want to scope actions to, then defining an array of steps.

```javascript
$('.features').concierge({
  steps: [
    {
      element: $('#intro'),               // The Element the popover will be attached to
      title: "Look at this thing!",       // Title of the popover
      content: $('#intro-guide'),         // Can be text, HTML, or a jQuery object
      placement: 'bottom'                 // positioning of popover: top/bottom/left/right
    },
    {
      element: $('.bulk-upload'),
      title: "Bulk Upload",
      content: "For when one upload at a time simply isn't enough. You can click this button and upload lots of things!",
      placement: 'right'
    },
    {
      element: $('.save'),
      title: "Make your edits not disappear!",
      content: "Just as if you wrote them on actual paper, clicking this button will commit what you see to memory forever.",
      placement: 'bottom'
    },
    {
      element: $('.delete'),
      title: "Destroy the evidence!",
      content: "Want to make it all go away? Click here and destroy your hard work!",
      placement: 'top'
    }
  ],
  onStep: function(stepIndex, $el) {    // Callback on showing step.
    console.log(stepIndex);             // Access to current step index
    console.log("attached to:" + $el);  // and element popover is attached to.
  },
  afterAll: function() {
    alert('ALL STEPS COMPLETED')        // Callback after last step
  },
  nextText: "Next",                     // Text for the next button
  nextClass: "next",                    // Class for the next button
  nextEvent: "click",                   // Event for next action (mouseover, click, etc.)
  startingStep: 0,                      // Optional step to start on. Zero-based
  animation: true                       // Boolean for bootstrap animations
});
```