import {DOCUMENT, effect, Inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {BookingState,  INITIAL_SESSION_STATE} from '../../models/session.model';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _theme = signal<'light' | 'dark'>('light');
  public readonly theme = this._theme.asReadonly();
  private _booking = signal<BookingState>(INITIAL_SESSION_STATE);
  public readonly booking = this._booking.asReadonly();

  private isBrowser: boolean;

  constructor(@Inject(DOCUMENT) private document: Document,@Inject(PLATFORM_ID) platformId: Object) {    this.loadInitialState()
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadInitialState();
    effect(() => {
      const currentTheme = this.theme();
      if (this.isBrowser){
        sessionStorage.setItem('theme', currentTheme);
        if (currentTheme === 'dark') {
          this.document.body.classList.remove('light-mode');
          this.document.body.classList.add('dark-mode');
        }else{
          this.document.body.classList.remove('dark-mode');
          this.document.body.classList.add('light-mode');
        }
      }
    });

    effect(() => {
      if (this.isBrowser){
        sessionStorage.setItem('pendingBooking',JSON.stringify(this.booking()));
      }
    });
  }
  private loadInitialState(){
    if (!this.isBrowser) {
      return;
    }
    const saveTheme = (sessionStorage.getItem('theme') as 'light' |'dark') || 'light';
    this._theme.set(saveTheme);

    const savedBooking = sessionStorage.getItem('pendingBooking');
    if (savedBooking) {
      this._booking.set(JSON.parse(savedBooking));
    }
  }

  toggleTheme() {
    const currentTheme = this._theme();
    if (currentTheme === 'light') {
      this._theme.set('dark'); // Forzamos a oscuro
    } else {
      this._theme.set('light'); // Forzamos a claro
    }
  }

  updateBooking(newValue: Partial<BookingState>) {
    this._booking.update(current=>({...current, ...newValue}))
  }

}
