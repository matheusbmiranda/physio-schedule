import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[appBirthDateMask]',
  standalone: true,
  exportAs: 'birthDateMask'
})
export class BirthDateMaskDirective implements AfterViewInit, OnDestroy {
  private readonly input = inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly control = inject(NgControl, { self: true, optional: true });

  ngAfterViewInit(): void {
    this.input.addEventListener('keydown', this.handleKeydown, true);
    this.input.addEventListener('input', this.handleInput, true);
    this.input.addEventListener('blur', this.handleBlur, true);
  }

  ngOnDestroy(): void {
    this.input.removeEventListener('keydown', this.handleKeydown, true);
    this.input.removeEventListener('input', this.handleInput, true);
    this.input.removeEventListener('blur', this.handleBlur, true);
  }

  private readonly handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Backspace') {
      this.removeDigitBeforeSeparator(event);
      return;
    }

    if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) {
      return;
    }

    if (!/\d/.test(event.key)) {
      event.preventDefault();
    }
  };

  private removeDigitBeforeSeparator(event: KeyboardEvent): void {
    const start = this.input.selectionStart ?? 0;
    const end = this.input.selectionEnd ?? start;

    if (start !== end || start === 0 || this.input.value[start - 1] !== '/') {
      return;
    }

    event.preventDefault();
    this.input.value = this.input.value.slice(0, start - 2) + this.input.value.slice(start);
    this.input.setSelectionRange(start - 2, start - 2);
    this.input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  private readonly handleInput = (): void => {
    const cursor = this.input.selectionStart ?? this.input.value.length;
    const digitsBeforeCursor = this.input.value.slice(0, cursor).replace(/\D/g, '').length;
    const formattedValue = this.format(this.input.value);

    this.input.value = formattedValue;
    const formattedCursor = this.getCursorPosition(formattedValue, digitsBeforeCursor);
    this.input.setSelectionRange(formattedCursor, formattedCursor);

    const date = this.toDate(formattedValue);
    if (date) {
      queueMicrotask(() => {
        this.writeValidDate(date);
      });
    }
  };

  private readonly handleBlur = (): void => {
    const formattedValue = this.format(this.input.value);
    this.input.value = formattedValue;

    queueMicrotask(() => {
      if (!formattedValue) {
        this.setInvalidState(false);
        return;
      }

      const date = this.toDate(formattedValue);
      this.control?.control?.markAsTouched();

      if (date) {
        this.writeValidDate(date);
        return;
      }

      this.setInvalidState(true);
    });
  };

  handleDateSelection(date: Date | null): void {
    if (!date) {
      return;
    }

    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.input.value = this.formatDate(normalizedDate);
    if (normalizedDate > this.today()) {
      this.setInvalidState(true);
      return;
    }

    this.writeValidDate(normalizedDate);
  }

  private format(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4, 8);

    if (digits.length <= 2) {
      return digits.length === 2 ? `${day}/` : day;
    }

    return year ? `${day}/${month}/${year}` : `${day}/${month}`;
  }

  private getCursorPosition(value: string, digitCount: number): number {
    if (!digitCount) {
      return 0;
    }

    let digitsSeen = 0;
    for (let index = 0; index < value.length; index += 1) {
      if (/\d/.test(value[index])) {
        digitsSeen += 1;
      }
      if (digitsSeen === digitCount) {
        return index + 1;
      }
    }

    return value.length;
  }

  private toDate(value: string): Date | null {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return null;
    }

    const [day, month, year] = value.split('/').map(Number);
    if (year < 1) {
      return null;
    }

    const date = new Date(0);
    date.setHours(0, 0, 0, 0);
    date.setFullYear(year, month - 1, day);

    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day && date <= this.today()
      ? date
      : null;
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()}`;
  }

  private setInvalidState(isInvalid: boolean): void {
    const formControl = this.control?.control;
    if (!formControl) {
      return;
    }

    const currentErrors = formControl.errors ?? {};
    if (isInvalid) {
      formControl.setErrors({ birthDateInvalid: true });
      return;
    }

    if (currentErrors['birthDateInvalid'] || currentErrors['matDatepickerParse']) {
      const {
        birthDateInvalid: _birthDateInvalid,
        matDatepickerParse: _matDatepickerParse,
        ...otherErrors
      } = currentErrors;
      formControl.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
    }
  }

  private writeValidDate(date: Date): void {
    this.control?.control?.setValue(date, { emitEvent: true, emitModelToViewChange: false });
    this.setInvalidState(false);
  }

  private today(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }
}
