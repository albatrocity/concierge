(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    concierge: function(options) {
      var advanceStep, finishSteps, log, scope, settings, showStep;
      settings = {
        animate: true,
        nextText: "Next",
        nextClass: "next",
        nextEvent: "click",
        startingStep: 0,
        debug: false,
        onStep: function() {},
        afterAll: function() {}
      };
      settings = $.extend(settings, options);
      log = function(msg) {
        if (settings.debug) {
          return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
        }
      };
      scope = this;
      advanceStep = function(currentIndex, direction, callback) {
        var nextIndex, totalSteps;
        totalSteps = settings.steps.length;
        nextIndex = currentIndex + direction;
        if (nextIndex === totalSteps) {
          finishSteps(this, currentIndex);
        } else {
          showStep(nextIndex);
        }
        return log(nextIndex + " out of " + totalSteps);
      };
      showStep = function(stepIndex, callback) {
        var $el, activeStep;
        activeStep = settings.steps[stepIndex];
        $el = scope.find(activeStep.element);
        $el.popover({
          animation: true,
          content: activeStep.content,
          title: activeStep.title,
          placement: activeStep.placement
        });
        $el.popover('show');
        settings.onStep.call(this, stepIndex, $el);
        return $('.popover').addClass('concierge-step').find('.popover-content:visible').append("<a href='#' data-stepnav='next' class='" + settings.nextClass + "'>" + settings.nextText + "</a>").find("a[data-stepnav='next']").on(settings.nextEvent, function() {
          $el.popover('hide');
          advanceStep(stepIndex, 1);
          return false;
        });
      };
      finishSteps = function(context, currentIndex) {
        var $el;
        $el = settings.steps[currentIndex].element;
        $el.popover('hide');
        return settings.afterAll.call(context, currentIndex);
      };
      return showStep(settings.startingStep);
    }
  });

}).call(this);
