PropTypes = require('prop-types')
_ = require 'lodash'
React = require 'react'
R = React.createElement

Popover = require 'react-bootstrap/lib/Popover'
OverlayTrigger = require 'react-bootstrap/lib/OverlayTrigger'
 
# Shows a popover when help icon is clicked. Needs bootstrap
module.exports = class PopoverHelpComponent extends React.Component
  @propTypes:
    placement: PropTypes.string # "top", "right", "bottom", "left"

  @defaultProps:
    placement: "top"

  render: ->
    R OverlayTrigger, trigger: ["hover", "focus"], placement: @props.placement, overlay: R(Popover, null, @props.children),
      R 'span', className: "text-muted", style: { cursor: "pointer" },
        R 'span', className: "glyphicon glyphicon-question-sign"
