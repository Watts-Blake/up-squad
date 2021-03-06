import { useState } from "react";
import { Modal } from "../../context/Modal";
import SingleEvent from ".";
import { getRsvps } from "../../store/rsvp";
import { getCurrentEvent } from "../../store/setCurrentEvent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const hoursTransform = (hours) => {
  if (hours <= 12) {
    return `${hours}:00 AM`;
  } else if (hours === 0) {
    return `1:00 AM`;
  } else {
    return `${hours - 12}:00 PM`;
  }
};
const SingleEventModal = ({
  event,
  showEventListModal,
  setShowEventListModal,
}) => {
  const [showSingleEventModal, setShowSingleEventModal] = useState(false);
  const eventsObj = useSelector((state) => state.eventId);
  const dispatch = useDispatch();
  //     dispatch(getRsvps(event.id));
  //     dispatch(getCurrentEvent(event.id));
  const handleClick = async (e) => {
    e.preventDefault();
    await dispatch(getCurrentEvent(event.id));
    await dispatch(getRsvps(event.id));
    setShowSingleEventModal(true);
  };
  return (
    <div className="container column list_button" style={{ width: "90%" }}>
      <button
        className="collapse container column"
        id="event_list_button"
        style={{ maxHeight: "100px", width: "100%" }}
        onClick={handleClick}
      >
        <span className="container row gap" style={{ height: "10px" }}>
          {event.name.toUpperCase()} <h4> at </h4>
          {hoursTransform(new Date(event.date).getHours())}
        </span>
        <h6 className="">{new Date(event.date).toDateString()}</h6>
        <div className="container row gap" style={{ height: "8px" }}>
          {event.Venue.city}
          <h4>,</h4>
          {event.Venue.state}
        </div>
      </button>

      {showSingleEventModal && (
        <Modal onClose={() => setShowSingleEventModal(false)}>
          <SingleEvent
            setShowSingleEventModal={setShowSingleEventModal}
            setShowEventListModal={setShowEventListModal}
            eventId={event.id}
          ></SingleEvent>
        </Modal>
      )}
    </div>
  );
};

export default SingleEventModal;
