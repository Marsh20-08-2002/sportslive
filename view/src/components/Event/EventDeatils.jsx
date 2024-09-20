/* eslint-disable react/no-unescaped-entities */
function EventDeatils() {
  return (
    <>
      <div className="cover"></div>
      <div className="main">
        <div className="details">
          <h1 className="name">
            Github Actions <span>Hackathon </span>2k24
          </h1>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
            exercitationem velit eum, ut in officia facere modi temporibus est
            ullam praesentium soluta non consequuntur? Repellat earum quas quam
            maiores animi.
          </p>
          <button className="register">Register</button>
        </div>
        <div className="timer">
          <p className="date">Event on 24th March</p>
          <div>
            <p className="time-title">
              <span>Days</span>
              <span>Hours</span>
              <span>Minutes</span>
            </p>
            <p className="time-left">
              <span>12</span> : <span>07</span> : <span>41</span>
            </p>
          </div>
        </div>
      </div>
      <div className="event">
        <div className="event-child">
          <h1>Event Details</h1>
          <div className="event-card">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/conference-call--v1.png"
              alt="conference-call--v1"
            />
            <p className="event-card-title">Team Size</p>
            <p className="event-card-detail">4</p>
          </div>
          <div className="event-card">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/marker--v1.png"
              alt="marker--v1"
            />
            <p className="event-card-title">Location</p>
            <p className="event-card-detail">NASHIK</p>
          </div>
          <div className="event-card">
            <img
              width="64"
              height="64"
              src="https://img.icons8.com/glyph-neue/64/overtime.png"
              alt="overtime"
            />
            <p className="event-card-title">Time</p>
            <p className="event-card-detail">9:00 AM</p>
          </div>
          <div className="event-card">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/average-2.png"
              alt="average-2"
            />
            <p className="event-card-title">Entry Fees</p>
            <p className="event-card-detail">Rs 499/-</p>
          </div>
        </div>
        <div className="contact">
          For more details contact us +91 8888-46902
        </div>
      </div>
      <h1 className="winner-title">Legacy of Champion's 2k23</h1>
      <div className="winners">
        <div>
          <img src="1.jpg" alt="" />
          <p className="winner-position">1st Position</p>
          <p className="winner-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
            magni vero distinctio nihil ipsum accusantium ducimus inventore,
            libero ab mollitia quos amet deleniti, optio ullam? Aut laboriosam
            deserunt tempora eveniet?
          </p>
        </div>
        <div>
          <img src="2.jpg" alt="" />
          <p className="winner-position">2nd Position</p>
          <p className="winner-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus ab eligendi reprehenderit laboriosam quas quam
            aspernatur exercitationem corrupti reiciendis, doloribus facere
            repudiandae, eaque perferendis! Asperiores fuga blanditiis delectus
            quibusdam quia!
          </p>
        </div>
        <div>
          <img src="3.jpg" alt="" />
          <p className="winner-position">3rd Position </p>
          <p className="winner-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim,
            adipisci nemo sunt tempore dolores fuga quibusdam praesentium harum
            ipsa corrupti, tenetur, voluptate placeat quisquam expedita beatae
            ipsam repudiandae sed non!
          </p>
        </div>
      </div>
    </>
  );
}

export default EventDeatils;
