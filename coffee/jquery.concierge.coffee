# Reference jQuery
$ = jQuery

# Adds plugin object to jQuery
$.fn.extend
  # Change pluginName to your plugin's name.
  concierge: (options) ->
    # Default settings
    settings =
      animate: true
      nextText: "Next"
      nextClass: "next"
      nextEvent: "click"
      startingStep: 0
      debug: false
      onStep: ->
      afterAll: ->

    settings = $.extend settings, options

    log = (msg) ->
      console?.log msg if settings.debug

    scope = @

    advanceStep = (currentIndex, direction, callback) ->
      totalSteps = settings.steps.length
      nextIndex = currentIndex + direction
      if nextIndex == totalSteps
        finishSteps this, currentIndex
      else
        showStep nextIndex
      log nextIndex + " out of " + totalSteps

    showStep = (stepIndex, callback) ->
      activeStep = settings.steps[stepIndex]
      $el = scope.find activeStep.element

      $el.popover
        animation: true
        content: activeStep.content
        title: activeStep.title
        placement: activeStep.placement
      $el.popover 'show'
      settings.onStep.call(this, stepIndex, $el)

      $('.popover').addClass('concierge-step').find('.popover-content:visible').append(
        "<a href='#' data-stepnav='next' class='#{settings.nextClass}'>#{settings.nextText}</a>"
      ).find("a[data-stepnav='next']").on settings.nextEvent, ->
        $el.popover 'hide'
        advanceStep stepIndex, 1
        false

    finishSteps = (context, currentIndex) ->
      $el = settings.steps[currentIndex].element
      $el.popover 'hide'
      settings.afterAll.call(context, currentIndex)
    
    showStep settings.startingStep