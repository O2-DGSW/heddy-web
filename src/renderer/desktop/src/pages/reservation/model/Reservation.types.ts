export type ReservationStatusKey = "approved" | "rejected" | "changeRequest";

export type ReservationFilterKey = "all" | "rejected" | "approved" | "changeRequest";

export interface ReservationRecord {
  id: number;
  customerName: string;
  service: string;
  dateKey: string;
  dateLabel: string;
  time: string;
  requestedTime?: string;
  tags: string[];
  request: string;
  status: ReservationStatusKey;
}

export interface FilterTab {
  key: ReservationFilterKey;
  label: string;
  active?: boolean;
}

export interface ReservationCalendarProps {
  monthDate: string;
  selectedDate: string;
  weekDays: string[];
  onSelectMonth: (monthDate: string) => void;
  onSelectDate: (dateKey: string) => void;
}

export interface ReservationCardListProps {
  reservations: ReservationRecord[];
}

export interface ReservationNavigationPanelProps
  extends ReservationCalendarProps, ReservationCardListProps {}

export interface ReservationStatusPanelProps {
  filterTabs: FilterTab[];
  rows: ReservationRecord[];
  isLoading: boolean;
  errorMessage: string;
  onSelectFilter: (filterKey: ReservationFilterKey) => void;
  activeStatusMenuReservationId: number | null;
  onToggleStatusMenu: (reservationId: number) => void;
  onSelectStatus: (reservationId: number, status: ReservationStatusKey) => void;
  onOpenReservation: (reservationId: number) => void;
  onOpenTimeChangeModal: (reservationId: number) => void;
}

export interface ReservationDetailModalProps {
  reservation: ReservationRecord;
  timeOptions: string[];
  isTimeMenuOpen: boolean;
  onToggleTimeMenu: () => void;
  onSelectTime: (time: string) => void;
  onClose: () => void;
}

export interface ReservationTimeChangeModalProps {
  reservation: ReservationRecord;
  timeOptions: string[];
  currentTime: string;
  changedTime: string;
  isCurrentTimeMenuOpen: boolean;
  isChangedTimeMenuOpen: boolean;
  onToggleCurrentTimeMenu: () => void;
  onToggleChangedTimeMenu: () => void;
  onSelectCurrentTime: (time: string) => void;
  onSelectChangedTime: (time: string) => void;
  onClose: () => void;
  onSave: () => void;
}
