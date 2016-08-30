React = require 'react'
ReactDOM = require 'react-dom'
H = React.DOM
_ = require 'lodash'
Modal = require 'react-overlays/lib/Modal'
className = require "classnames"
toPX = require('to-px')

# Modal popup
module.exports = class ModalPopupComponent extends React.Component
  @propTypes:
    header: React.PropTypes.node # Header of modal. Any react element
    footer: React.PropTypes.node # Footer of modal. Any react element
    size: React.PropTypes.string # "large" for large,  "small" for small and none for standard
    onClose: React.PropTypes.func # callback function to be called when close is requested
    showCloseX: React.PropTypes.bool # True to show close 'x' at top right
    scrollDisabled: React.PropTypes.bool # Force disable content scrolling see https://github.com/mWater/react-library/issues/31

  close: =>
    @props.onClose?()

  render: ->
    modalStyle =
      position: 'fixed'
      zIndex: 1040
      top: 0
      bottom: 0
      left: 0
      right: 0
      outline: 0
      overflowY: "auto"

    backdropStyle =
      position: 'fixed'
      zIndex: 1040
      top: 0
      bottom: 0
      left: 0
      right: 0
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.5

    dialogClass =
      className
        "modal-dialog": true
        "modal-lg": @props.size == "large"
        "modal-sm": @props.size == "small"

    modalProps =
      show: true
      onHide: @close
      backdrop: true
      backdropStyle: backdropStyle
      style: modalStyle
      ariaLabelledby:'modal-label'

    modalContent =
      H.div className: dialogClass, style: {outline: 0},
        React.createElement(ModalComponentContent, @props)

    H.div null,
      React.createElement(Modal, modalProps, modalContent)

  # Static version that displays a modal until the onClose is called.
  # modalFunc takes close function as a single parameter and returns a ModalPopupComponent
  @show: (modalFunc, onClose) =>
    # Create temporary div to render into
    tempDiv = $('<div></div>').get(0)

    # Create close function
    close = () =>
      # Unrender
      ReactDOM.unmountComponentAtNode(tempDiv)

      # Remove div
      $(tempDiv).remove()

      # Call onClose
      if onClose
        onClose()

    popupElem = modalFunc(close)
    ReactDOM.render(popupElem, tempDiv)    


# Content must be rendered at body level to prevent weird behaviour, so this is the inner component
class ModalComponentContent extends React.Component
  @propTypes: 
    header: React.PropTypes.node # Header of modal. Any react element
    footer: React.PropTypes.node # Footer of modal. Any react element
    size: React.PropTypes.string # "large" for large
    showCloseX: React.PropTypes.bool # True to show close 'x' at top right
    onClose: React.PropTypes.func # callback function to be called when close is requested
    scrollDisabled: React.PropTypes.bool # Force content scrolling disable see https://github.com/mWater/react-library/issues/31

  componentDidUpdate: (prevProps, prevState) ->
    @calculateModalBodyHeight()

  componentDidMount: ->
    @calculateModalBodyHeight()

  calculateModalBodyHeight: ->
    header = $(@refs.modalHeader)
    footer = $(@refs.modalFooter)
    content = $(@refs.modalBody)

    if $(window).height() < $(content).height() and not @props.scrollDisabled

      scale = toPX("vh")
      maxHeight = 98 * scale - (header?.outerHeight() + footer?.outerHeight() + 60)

      content.css(maxHeight: "#{maxHeight}px", overflowY: "auto")

  render: ->
    style = if not @props.scrollDisabled then {} else {}
    H.div className: "modal-content",
      if @props.header
        H.div className: "modal-header", ref: "modalHeader",
          if @props.showCloseX
            H.button className: "close",
              H.span onClick: @props.onClose, "\u00d7"
          H.h4 className: "modal-title",
            @props.header
      else if @props.showCloseX
        H.button className: "close", style: { position: "absolute", right: 10, top: 10 },
          H.span onClick: @props.onClose, "\u00d7"

      H.div className: "modal-body", style: style, ref: "modalBody",
        @props.children
      if @props.footer
        H.div className: "modal-footer", ref: "modalFooter",
          @props.footer

