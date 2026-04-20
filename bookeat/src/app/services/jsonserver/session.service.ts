import { DOCUMENT, effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { BookingState, INITIAL_SESSION_STATE } from '../../models/session.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _theme = signal<'light' | 'dark'>('light');
  public readonly theme = this._theme.asReadonly();
  private _booking = signal<BookingState>(INITIAL_SESSION_STATE);
  public readonly booking = this._booking.asReadonly();

  private readonly isBrowser: boolean;

  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadInitialState();

    effect(() => {
      if (!this.isBrowser) return;
      const theme = this.theme();
      sessionStorage.setItem('theme', theme);
      this.document.body.classList.toggle('dark-mode', theme === 'dark');
      this.document.body.classList.toggle('light-mode', theme === 'light');
    });

    effect(() => {
      if (!this.isBrowser) return;
      sessionStorage.setItem('pendingBooking', JSON.stringify(this.booking()));
    });
  }

  private loadInitialState() {
    if (!this.isBrowser) return;
    this._theme.set((sessionStorage.getItem('theme') as 'light' | 'dark') || 'light');
    const savedBooking = sessionStorage.getItem('pendingBooking');
    if (savedBooking) this._booking.set(JSON.parse(savedBooking));
  }

  toggleTheme() {
    this._theme.update(current => current === 'light' ? 'dark' : 'light');
  }

  updateBooking(newValue: Partial<BookingState>) {
    this._booking.update(current => ({ ...current, ...newValue }));
  }
}
