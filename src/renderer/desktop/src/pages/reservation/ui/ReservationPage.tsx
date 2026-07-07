import {
  RESERVATION_CONTENT_HEIGHT_REM,
  RESERVATION_CONTENT_TOP_OFFSET_REM,
  RESERVATION_PAGE_HORIZONTAL_PADDING_REM,
} from "@/pages/reservation/model/Reservation.constant";
import { useReservation } from "@/pages/reservation/model/useReservation";

import { ReservationDetailModal } from "./Reservation.DetailModal";
import { ReservationNavigationPanel } from "./Reservation.NavigationPanel";
import { ReservationStatusPanel } from "./Reservation.StatusPanel";
import { ReservationTimeChangeModal } from "./Reservation.TimeChangeModal";

const ReservationPage = () => {
  const {
    scale,
    layoutWidthRem,
    monthDate,
    selectedDateKey,
    weekDays,
    reservations,
    filterTabs,
    reservationStatusRows,
    isLoading,
    hasNoConnectedShop,
    openedReservation,
    openedTimeChangeReservation,
    timeOptions,
    currentTimeValue,
    changedTimeValue,
    isDetailTimeMenuOpen,
    isCurrentTimeMenuOpen,
    isChangedTimeMenuOpen,
    activeStatusMenuReservationId,
    pageRef,
    setSelectedMonth,
    setSelectedDateKey,
    setSelectedFilterKey,
    setReservationStatus,
    toggleStatusMenu,
    openReservation,
    closeReservation,
    toggleDetailTimeMenu,
    selectDetailTime,
    openTimeChangeModal,
    closeTimeChangeModal,
    toggleCurrentTimeMenu,
    toggleChangedTimeMenu,
    selectCurrentTime,
    selectChangedTime,
    saveTimeChange,
  } = useReservation();
  const layoutHeightRem = RESERVATION_CONTENT_TOP_OFFSET_REM + RESERVATION_CONTENT_HEIGHT_REM;

  return (
    <div
      ref={pageRef}
      className="h-full overflow-hidden bg-[#FAFAFA]"
      style={{
        paddingLeft: `${RESERVATION_PAGE_HORIZONTAL_PADDING_REM}rem`,
        paddingRight: `${RESERVATION_PAGE_HORIZONTAL_PADDING_REM}rem`,
      }}
    >
      <div
        className="shrink-0 overflow-hidden"
        style={{
          width: `${layoutWidthRem * scale}rem`,
          height: `${layoutHeightRem * scale}rem`,
        }}
      >
        <div
          className="origin-top-left"
          style={{
            transform: `scale(${scale})`,
            width: `${layoutWidthRem}rem`,
            height: `${layoutHeightRem}rem`,
          }}
        >
          <div
            className="flex gap-4"
            style={{
              width: `${layoutWidthRem}rem`,
              height: `${RESERVATION_CONTENT_HEIGHT_REM}rem`,
              paddingTop: `${RESERVATION_CONTENT_TOP_OFFSET_REM}rem`,
            }}
          >
            <ReservationNavigationPanel
              monthDate={monthDate}
              selectedDate={selectedDateKey}
              weekDays={weekDays}
              onSelectMonth={setSelectedMonth}
              onSelectDate={setSelectedDateKey}
              reservations={reservations}
            />
            <ReservationStatusPanel
              filterTabs={filterTabs}
              rows={reservationStatusRows}
              isLoading={isLoading}
              hasNoConnectedShop={hasNoConnectedShop}
              activeStatusMenuReservationId={activeStatusMenuReservationId}
              onSelectFilter={setSelectedFilterKey}
              onToggleStatusMenu={toggleStatusMenu}
              onSelectStatus={setReservationStatus}
              onOpenReservation={openReservation}
              onOpenTimeChangeModal={openTimeChangeModal}
            />
          </div>
        </div>
      </div>

      {openedReservation ? (
        <ReservationDetailModal
          reservation={openedReservation}
          timeOptions={timeOptions}
          isTimeMenuOpen={isDetailTimeMenuOpen}
          onToggleTimeMenu={toggleDetailTimeMenu}
          onSelectTime={selectDetailTime}
          onClose={closeReservation}
        />
      ) : null}

      {openedTimeChangeReservation ? (
        <ReservationTimeChangeModal
          reservation={openedTimeChangeReservation}
          timeOptions={timeOptions}
          currentTime={currentTimeValue}
          changedTime={changedTimeValue}
          isCurrentTimeMenuOpen={isCurrentTimeMenuOpen}
          isChangedTimeMenuOpen={isChangedTimeMenuOpen}
          onToggleCurrentTimeMenu={toggleCurrentTimeMenu}
          onToggleChangedTimeMenu={toggleChangedTimeMenu}
          onSelectCurrentTime={selectCurrentTime}
          onSelectChangedTime={selectChangedTime}
          onClose={closeTimeChangeModal}
          onSave={saveTimeChange}
        />
      ) : null}
    </div>
  );
};

export { ReservationPage };
