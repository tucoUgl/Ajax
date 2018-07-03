(function(jQuery) {

    jQuery.fn.validator = function(options) {

        var isEmpty = function(obj) { return obj == null || obj.length == 0; };

        var opts = jQuery.extend(true, { // Allows for overriding any messages or validator functions
            wrapperClass: "invalid", messageClass: "message", useMessages: true,
            onValidation: null, onValidationFailed: null, // Callbacks which recieve an object containing the element and state { el: el, state: state }
            validateOn: "blur", // The jQuery events that cause validation to occur
            defaultMessages: {
                "required": "Required",
                "min": "Value is not long enough.",
                "max": "Value is too long.",
                "accepted": "Must be checked.",
                "number": "Must be a number.",
                "date": "Must be a valid date.",
                "email": "Must be an email address.",
                "url": "Must be a URL.",
                "regex": "Invalid"
            },
            validatorFunctions: { // Return true if the value passes validation
                "required": function(el, value) { return ! isEmpty(value); },
                "min": function(el, value, args) { return isEmpty(value) || value.length >= args.length; },
                "max": function(el, value, args) { return isEmpty(value) || value.length <= args.length; },
                "accepted": function(el, value) { return el.is(":checked"); },
                "number": function(el, value) { return isEmpty(value) || (!isNaN(value) && !/^\s+$/.test(value)); },
                "alpha": function(el, value) { return isEmpty(value) || /^[a-zA-Z]+$/.test(value); },
                "date": function(el, value) { return isEmpty(value) || !isNaN(new Date(value)); },
                "email": function(el, value) { return isEmpty(value) || /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(value); },
                "url": function(el, value) { return isEmpty(value) || /(((ht|f)tp(s?):\/\/)|(www\.[^ \[\]\(\)\n\r\t]+)|(([012]?[0-9]{1,2}\.){3}[012]?[0-9]{1,2})\/)([^ \[\]\(\),;&quot;'&lt;&gt;\n\r\t]+)([^\. \[\]\(\),;&quot;'&lt;&gt;\n\r\t])|(([012]?[0-9]{1,2}\.){3}[012]?[0-9]{1,2})/.test(value); },
                "regex": function(el, value, args) { return isEmpty(value) || args.expression.test(value); }
            }
        }, options);

        this.live(opts.validateOn, function() {
            var el = jQuery(this), validators = {};
            var validationString = expandValidatorString(el.data("validator") || "");
            try { validators = eval("({" + validationString + "})"); } catch (e) { } // Keeps invalid validation methods from raising errors
            var state = validate(el, validators, el.val());
            render(el, state);
            notify(el, state);
        });

        var expandValidatorString = function(str) {
            for (method in opts.validatorFunctions) {
                var containsExp = new RegExp(method);
                var testExp = new RegExp(method + "\\b(:|\\s:)");
                if (containsExp.test(str) && !testExp.test(str)) {
                    str = str.replace(containsExp, method + ":{}");
                }
            }
            return str;
        };

        var validate = function(el, validators, value) {
            var state = { isValid: true, errors: [] };
            for (method in opts.validatorFunctions) {
                if (!validators[method]) { continue; }
                var errOpts = validators[method];
                if (opts.validatorFunctions[method](el, value, errOpts)) { continue; }
                state.isValid = false;
                state.errors.push({
                    method: method,
                    message: errOpts.message ? errOpts.message: opts.defaultMessages[method],
                    title: errOpts.title ? errOpts.title: opts.defaultMessages[method]
                });
            }
            el.data("validation-state", state); // Adds the current validation state to the DOM element
            return state;
        };

        var render = function(el, state) {
            if (el.parent().is("." + opts.wrapperClass)) {
                jQuery("span." + opts.messageClass, el.parent()).remove();
                el.unwrap();
            }
            if (!state.isValid) {
                el.wrap(jQuery("<div class='" + opts.wrapperClass + "'></div>"));
                var message = jQuery("<span class='" + opts.messageClass + "'></span>");
                var text = "", title = "";
                for (var i = 0; i < state.errors.length; i++) {
                    if (state.errors[i].message && opts.useMessages) {
                        text = text + state.errors[i].message;
                    }
                    title = title + state.errors[i].title;
                }
                message.text(text);
                el.parent().append(message).attr("title", title);
            }
        };

        var notify = function(el, state) {
            var container = el.closest("form"); // Validation events will be triggered on the nearest form or body if no form is present
            if (container.length == 0) { container = jQuery("body"); }
            container.trigger("validation", [{ el: el, state: state }]);
            if (opts.onValidation) { opts.onValidation(el, state); }
            if (state.isValid) { return; }
            container.trigger("validationFailed", [{ el: el, state: state }]);
            if (opts.onValidationFailed) { opts.onValidationFailed(el, state); }
        };
    };

})(jQuery);