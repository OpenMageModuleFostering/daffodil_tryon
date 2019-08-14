/*
 * jQuery UI Button @VERSION
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Button
 *
 * Depends:
 *      jquery.ui.core.js
 */
(function($) {

var lastActive;

$.widget("ui.button", {
        _init: function() {
                var self = this;
                this.element
                        .addClass("ui-button ui-widget ui-state-default ui-corner-all")
                        .bind("mouseenter.button", function() {
                                if (self.options.disabled) { return; }
                                $(this).addClass("ui-state-hover");
                                if (this == lastActive) {
                                        $(this).addClass("ui-state-active");
                                }
                        })
                        .bind("mouseleave.button", function() {
                                if (self.options.disabled) { return; }
                                $(this).removeClass("ui-state-hover ui-state-active");
                        })
                        .bind("mousedown.button", function() {
                                if (self.options.disabled) { return; }
                                $(this).addClass("ui-state-active");
                                lastActive = this;
                                $(document).one('mouseup', function() {
                                        lastActive = null;
                                });
                        })
                        .bind("mouseup.button", function() {
                                if (self.options.disabled) { return; }
                                $(this).removeClass("ui-state-active");
                        });
        },

        destroy: function() {
                this.element
                        .removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-focus")
                        .unbind(".button");
                $.widget.prototype.destroy.call(this);
        }
});

// TODO merge with button-widget
$.widget("ui.toggleButton", {
        _init: function() {
                var self = this,
                        label = (this.label = $("[for='" + this.element.attr("id") + "']"));

                label.add(this.element).hide();
                this.button = $("<button/>")
                        .html("" + label.html())
                        .insertAfter(this.element)
                        .button()
                        .unbind("mousedown.button mouseup.button mouseleave.button")
                        .bind("click", function() {
                                if (self.options.disabled) { return; }
                                $(this).toggleClass("ui-state-active");
                                self.element.attr("checked", function() {
                                        return !!this.checked;
                                })
                                .click();
                        })
                        .bind("mouseleave", function() {
                                if (self.options.disabled) { return; }
                                $(this).removeClass("ui-state-hover");
                        });

                if (this.element.attr("checked")) {
                        this.button.addClass("ui-state-active");
                }
        },

        destroy: function() {
                this.element.add(this.label).show();
                this.button.remove();
                $.widget.prototype.destroy.call(this);
        }
});

// TODO merge with button-widget
$.widget("ui.radioButton", {
        _init: function() {
                var self = this,
                        radios = (this.radios = this.element.find(":radio"));
                self.buttons = $([]);
                self.labels = $([]);
                self.element.addClass("ui-button-set");
                radios.each(function(index) {
                        var radio = $(this),
                                label = $("[for='" + this.id + "']");
                        label.add(radio).hide();
                        var button = $("<button/>")
                                .html("" + label.html())
                                .insertAfter(this)
                                .button()
                                .unbind("mousedown.button mouseup.button mouseleave.button")
                                .bind("click", function() {
                                        if (self.options.disabled) { return; }
                                        self.buttons.removeClass("ui-state-active");
                                        $(this).addClass("ui-state-active");
                                        radio.attr("checked", true).click();
                                })
                                .bind("mouseleave", function() {
                                        if (self.options.disabled) { return; }
                                        $(this).removeClass("ui-state-hover");
                                });

                        if (this.checked) {
                                button.addClass("ui-state-active");
                        }
                        
                        self.buttons = self.buttons.add(button);
                        self.labels = self.labels.add(label);
                });
        },

        destroy: function() {
                this.buttons.remove();
                this.labels.add(this.radios).show();
                $.widget.prototype.destroy.call(this);
        }
});

$.widget("ui.buttons", {
        _init: function() {
                var buttons = this.buttons = this.element.find("button").button();
                if (!buttons.length) {
                        this.toggle = this.element.find(":checkbox").toggleButton();
                        buttons = this.toggle.next();
                }
                if (!buttons.length && this.element.is(":has(:radio)")) {
                        this.radio = this.element.radioButton();
                        buttons = this.radio.find("button");
                }
                if (buttons.length) {
                        this.element.addClass("ui-button-set");
                        buttons.removeClass("ui-corner-all");
                        buttons.filter(":first").addClass("ui-corner-left");
                        buttons.filter(":last").addClass("ui-corner-right");
                } else {
                        this.buttons = this.element.filter("button").button();
                }
        },
        
        destroy: function() {
                if (this.toggle) {
                        this.toggle.toggleButton("destroy");
                }
                if (this.radio) {
                        this.radio.radioButton("destroy");
                }
                this.buttons.button("destroy");
                $.widget.prototype.destroy.call(this);
        }
});


})(jQuery);
