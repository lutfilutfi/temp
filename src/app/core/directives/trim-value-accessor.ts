import { Directive, HostListener, forwardRef, Renderer2, ElementRef } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const TRIM_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TrimValueAccessorDirective),
    multi: true
};

/**
 * The trim accessor for writing trimmed value and listening to changes that is
 * used by the {@link NgModel}, {@link FormControlDirective}, and
 * {@link FormControlName} directives.
 */
@Directive({
    selector: 'input:not([type=password]):not([type=radio]):not([type=checkbox]):not([bsDatepicker]):not([type=email]),textarea,[ngDefaultControl]',
    providers: [TRIM_VALUE_ACCESSOR]
})
export class TrimValueAccessorDirective extends DefaultValueAccessor {

    @HostListener('input', ['$event.target.value']) ngOnChange = (val: string) => {
        this.onChange(val.trim());
    }

    constructor(private renderer: Renderer2, private elRef: ElementRef) {
        super(renderer, elRef, true);
    }

    writeValue(value: any): void {
        if (typeof value === 'string') {
            value = value.trim();
        }
        super.writeValue(value);
    }

}

