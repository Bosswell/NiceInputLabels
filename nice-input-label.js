class NiceInputLabel {
    constructor(querySelector) {
        this.$customInputGroup = $(querySelector);
        this.$customInputs = $(querySelector).find('.custom-input-group--input');

        this.initListners();
    }

    initListners() {
        this.$customInputGroup.on('click', function () {
            $(this).find('input').focus();
        });

        this.$customInputs.on({
            focusin: function () {
                let $input = $(this);

                $input.attr('data-text-on-focus', $input.val());
                $input.parent().addClass('active-label');
            },
            focusout: function () {
                let $input = $(this);

                if ($input.val() !== $input.data('text-on-focus')) {
                    let $formSection = $input.parent().parent();

                    if ($formSection.attr('id') === 'delivery-data') {
                        deactivateAddressSelect();
                    }

                    $formSection.find('.address-id').val('0');
                }

                if ($input.val() === '')
                    $input.parent().removeClass('active-label');
            },
            input: function () {
                let $input = $(this);

                if ($input.is(':invalid')) {
                    $input.removeClass('validInput').addClass('invalidInput');
                } else if ($input.is(':valid')) {
                    $input.removeClass('invalidInput').addClass('validInput');
                }
            },
            invalid: function () {
                $(this).removeClass('validInput').addClass('invalidInput');
            },
            valid: function () {
                $(this).removeClass('invalidInput').addClass('validInput');
            }
        });
    }
}