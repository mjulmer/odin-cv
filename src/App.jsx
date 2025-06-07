import { useState } from "react";
import "./App.css";

function App() {
  const [displayName, setDisplayName] = useState("NAME");
  const [displayPrefixTitle, setDisplayPrefixTitle] = useState("");
  const [displaySuffixTitle, setDisplaySuffixTitle] = useState("");

  const [displayClass, setDisplayClass] = useState("Class");
  const [displaySpecies, setDisplaySpecies] = useState("Species");

  const [displaySkills, setDisplaySkills] = useState([]);
  const [displayKeyEvents, setDisplayKeyEvents] = useState([]);
  const [displayBackstory, setDisplayBackstory] = useState("");

  function setDisplayInfo(
    name = displayName,
    prefix = displayPrefixTitle,
    suffix = displaySuffixTitle,
    playerClass = displayClass,
    species = displaySpecies,
    skills = displaySkills,
    keyEvents = displayKeyEvents,
    backstory = displayBackstory
  ) {
    setDisplayName(name);
    setDisplayPrefixTitle(prefix);
    setDisplaySuffixTitle(suffix);
    setDisplayClass(playerClass);
    setDisplaySpecies(species);
    setDisplaySkills(skills);
    setDisplayKeyEvents(keyEvents);
    setDisplayBackstory(backstory);
  }

  return (
    <div className="app-root">
      <CharacterIntakeForm setDisplayInfo={setDisplayInfo} />
      <CharacterInfo
        prefixTitle={displayPrefixTitle}
        name={displayName}
        suffixTitle={displaySuffixTitle}
        species={displaySpecies}
        playerClass={displayClass}
        skills={displaySkills}
        keyEvents={displayKeyEvents}
        backstory={displayBackstory}
      />
    </div>
  );
}

function CharacterIntakeForm({ setDisplayInfo }) {
  function KeyEvent(name, startDate, endDate, description) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }

  const [name, setName] = useState("");
  const [prefixTitle, setPrefixTitle] = useState("");
  const [suffixTitle, setSuffixTitle] = useState("");

  const [playerClass, setPlayerClass] = useState("");
  const [species, setSpecies] = useState("");

  const [skills, setSkills] = useState([[crypto.randomUUID(), ""]]);
  const [keyEvents, setKeyEvents] = useState([new KeyEvent()]);
  const [backstory, setBackstory] = useState("");

  function changeHandler(setter) {
    return (event) => setter(event.target.value);
  }

  function addSkillButtonHandler() {
    setSkills([...skills, [crypto.randomUUID(), ""]]);
  }

  function addEventButtonHandler() {
    setKeyEvents(keyEvents.concat(new KeyEvent()));
  }

  function removeSkillButtonHandler(clickEvent) {
    setSkills(
      skills.filter(
        (skill) =>
          skill[0] !== clickEvent.target.parentElement.getAttribute("data-id")
      )
    );
  }

  const skillDivs = skills.map((skill) => {
    return (
      <div key={skill[0]} className="skillUnit" data-id={skill[0]}>
        <input
          className="skill"
          onChange={changeHandler((value) =>
            setSkills(
              skills.map((innerMapSkill) => {
                if (innerMapSkill[0] != skill[0]) {
                  return innerMapSkill;
                }
                return [innerMapSkill[0], value];
              })
            )
          )}
        />
        <button onClick={removeSkillButtonHandler}>Remove</button>
      </div>
    );
  });

  function removeEventButtonHandler(clickEvent) {
    setKeyEvents(
      keyEvents.filter(
        (keyEvent) => keyEvent.id !== clickEvent.target.getAttribute("data-id")
      )
    );
  }

  function setEventProperty(eventId, propertyToChange, newPropertyValue) {
    setKeyEvents(
      keyEvents.map((event) => {
        if (event.id === eventId) {
          event[propertyToChange] = newPropertyValue;
        }
        return event;
      })
    );
  }

  const keyEventDivs = keyEvents.map((event) => (
    <CharacterMajorEventInput
      key={event.id}
      eventId={event.id}
      removeButtonHandler={removeEventButtonHandler}
      setEventProperty={setEventProperty}
    />
  ));

  return (
    <form
      className="character-intake"
      onSubmit={(event) => {
        event.preventDefault();
        setDisplayInfo(
          name,
          prefixTitle,
          suffixTitle,
          playerClass,
          species,
          skills,
          keyEvents,
          backstory
        );
      }}
    >
      <p>
        Required fields are marked <span aria-label="required">*</span>
      </p>
      <label htmlFor="name">
        Name <span aria-label="required">*</span>
      </label>
      <input id="name" required onChange={changeHandler(setName)} />
      <br />
      <label htmlFor="prefix">Title (prefix)</label>
      <input id="prefix" onChange={changeHandler(setPrefixTitle)} />
      <br />
      <label htmlFor="suffix">Title (suffix)</label>
      <input id="suffix" onChange={changeHandler(setSuffixTitle)} />
      <br />
      <label htmlFor="species">
        Species <span aria-label="required">*</span>
      </label>
      <select id="species" required onChange={changeHandler(setSpecies)}>
        <option value=""></option>
        <option value="Redwood">Redwood</option>
        <option value="Live Oak">Live Oak</option>
        <option value="Ent">Ent</option>
        <option value="Tree">Tree (unspecified)</option>
        <option value="Dwarf">Dwarf</option>
        <option value="Halfling">Halfling</option>
        <option value="Human">Human</option>
        <option value="Elf">Elf</option>
      </select>
      <br />
      <label htmlFor="class">
        Class <span aria-label="required">*</span>
      </label>
      <select id="class" required onChange={changeHandler(setPlayerClass)}>
        <option value=""></option>
        <option value="Warrior">Warrior</option>
        <option value="Monk">Monk</option>
        <option value="Scholar">Scholar</option>
        <option value="Rogue">Rogue</option>
        <option value="Druid">Druid</option>
        <option value="Hunter">Hunter</option>
      </select>
      <br />
      <div className="skills-header">
        <p className="skills-title">Skills</p>
        <button
          className="new-skill-button"
          type="button"
          onClick={addSkillButtonHandler}
        >
          Add another
        </button>
      </div>
      <>{skillDivs}</>
      <br />
      <label htmlFor="backstory">Backstory</label>
      <textarea
        id="backstory"
        cols="50"
        onChange={changeHandler(setBackstory)}
      />
      <div className="key-events-header">
        <p className="key-events-title">Key events</p>
        <button
          className="new-event-button"
          type="button"
          onClick={addEventButtonHandler}
        >
          Add another
        </button>
      </div>
      <>{keyEventDivs}</>
      <br />
      <button>Submit</button>
    </form>
  );
}

function CharacterMajorEventInput({
  eventId,
  removeButtonHandler,
  setEventProperty,
}) {
  return (
    <div className="keyEventsDivInput" data-id={eventId}>
      <label htmlFor={"event-title" + eventId}>Event name</label>
      <input
        type="text"
        name={"event-title" + eventId}
        id={"event-title" + eventId}
        onChange={(event) =>
          setEventProperty(
            event.target.parentElement.getAttribute("data-id"),
            "name",
            event.target.value
          )
        }
      />
      <button
        className="new-event-button"
        data-id={eventId}
        type="button"
        onClick={removeButtonHandler}
      >
        Remove
      </button>
      <label htmlFor={"start-date" + eventId}>Start date</label>
      <input
        type="date"
        id={"start-date" + eventId}
        onChange={(event) =>
          setEventProperty(
            event.target.parentElement.getAttribute("data-id"),
            "startDate",
            event.target.value
          )
        }
      ></input>
      <label htmlFor={"end-date" + eventId}>End date</label>
      <input
        type="date"
        id={"end-date" + eventId}
        onChange={(event) =>
          setEventProperty(
            event.target.parentElement.getAttribute("data-id"),
            "endDate",
            event.target.value
          )
        }
      ></input>
      <label htmlFor={"event-desc-" + eventId}>Event description</label>
      <textarea
        name={"event-desc-" + eventId}
        id={"event-desc-" + eventId}
        cols="50"
        onChange={(event) =>
          setEventProperty(
            event.target.parentElement.getAttribute("data-id"),
            "description",
            event.target.value
          )
        }
      ></textarea>
    </div>
  );
}

function CharacterInfo({
  prefixTitle,
  name,
  suffixTitle,
  playerClass,
  species,
  skills,
  keyEvents,
  backstory,
}) {
  const keyEventsDivsAndDisplayState = getKeyEventsDisplay(keyEvents);
  const keyEventsDivs = keyEventsDivsAndDisplayState[0];
  const shouldRenderEvents = keyEventsDivsAndDisplayState[1];
  return (
    <div className="character-info">
      <div className="inner-display-container">
        <p className="displayNameTitle">
          {prefixTitle}
          {" " + name + " "}
          {suffixTitle}
        </p>
        <p className="displaySpeciesClass">
          {species} {playerClass}
        </p>
        <DisplaySkills skills={skills} />
        <>
          {backstory ? (
            <>
              <p>Backstory</p>
              <p className="character-text-box">{backstory}</p>
            </>
          ) : null}
        </>
        <>
          {shouldRenderEvents ? (
            <>
              <p>Key Events</p>
              {keyEventsDivs}
            </>
          ) : null}
        </>
      </div>
    </div>
  );
}

function DisplaySkills({ skills }) {
  return (
    <div className="displaySkills">
      {skills.map((skill) => {
        if (!skill[1]) {
          return null;
        }
        return (
          <span key={skill[0]} className="skillBubble">
            {skill[1]}
          </span>
        );
      })}
    </div>
  );
}

function getKeyEventsDisplay(keyEventsList) {
  let shouldRenderEvents = false;
  const keyEventsDiv = (
    <div className="keyEventsDiv">
      {keyEventsList.map((event) => {
        if (!event.name && !event.description) {
          return null;
        }
        shouldRenderEvents = true;
        return (
          <div key={event.id} className="character-text-box">
            <p>{event.name}</p>
            <DisplayKeyEventDate
              startDate={event.startDate}
              endDate={event.endDate}
            />
            <p>{event.description}</p>
          </div>
        );
      })}
    </div>
  );
  return [keyEventsDiv, shouldRenderEvents];
}

function DisplayKeyEventDate({ startDate, endDate }) {
  if (!startDate && !endDate) {
    return null;
  }
  if (startDate && endDate) {
    return (
      <p>
        From {startDate.toString()} to {endDate.toString()}
      </p>
    );
  }
  if (startDate) {
    return <p>{startDate.toString()}</p>;
  }
  return <p>{endDate.toString()}</p>;
}

export default App;
