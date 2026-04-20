export interface BookingState {
  date: string,
  time: string,
  diners: string,
}

export const INITIAL_SESSION_STATE: BookingState = {
  date: '',
  time: '',
  diners: '1',
};
