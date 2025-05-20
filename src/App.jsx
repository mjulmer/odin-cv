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

  // TODO display key events
  // don't display key events when there aren't any
  // TODO add ID to key events ->
  // TODO add remove key event affordance
  // TODO add date to key events -> date formatting
  // TODO add skills section

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
      <CharacterIntakeForm
        setDisplayInfo={setDisplayInfo}
        setDisplayPrefixTitle={setDisplayPrefixTitle}
        setDisplaySuffixTitle={setDisplaySuffixTitle}
        setDisplayClass={setDisplayClass}
        setDisplaySpecies={setDisplaySpecies}
        setDisplaySkills={setDisplaySkills}
        setDisplayKeyEvents={setDisplayKeyEvents}
        setDisplayBackstory={setDisplayBackstory}
      />
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

function CharacterIntakeForm({
  setDisplayInfo,
  setDisplayPrefixTitle,
  setDisplaySuffixTitle,
  setDisplayClass,
  setDisplaySpecies,
  setDisplaySkills,
  setDisplayKeyEvents,
  setDisplayBackstory,
}) {
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

  const [skills, setSkills] = useState([undefined]);
  const [keyEvents, setKeyEvents] = useState([new KeyEvent()]);
  const [backstory, setBackstory] = useState("");

  function changeHandler(setter) {
    return (event) => setter(event.target.value);
  }

  function addButtonHandler() {
    setKeyEvents(keyEvents.concat(new KeyEvent()));
  }

  function removeButtonHandler(clickEvent) {
    setKeyEvents(
      keyEvents.filter(
        (keyEvent) => keyEvent.id !== clickEvent.target.getAttribute("data-id")
      )
    );
  }

  const keyEventDivs = keyEvents.map((event) => (
    <CharacterMajorEventInput
      key={event.id}
      eventId={event.id}
      removeButtonHandler={removeButtonHandler}
    />
  ));

  // TODO: appropriately mark required fields
  return (
    <form
      className="character-intake"
      onSubmit={(event) => {
        event.preventDefault();
        setDisplayInfo(name);
        setDisplayPrefixTitle(prefixTitle);
        setDisplaySuffixTitle(suffixTitle);
        setDisplayClass(playerClass);
        setDisplaySpecies(species);
        setDisplaySkills(skills);
        setDisplayKeyEvents(keyEvents);
        setDisplayBackstory(backstory);
      }}
    >
      <label htmlFor="name">Name</label>
      <input id="name" required onChange={changeHandler(setName)} />
      <br />
      <label htmlFor="prefix">Title (prefix)</label>
      <input id="prefix" onChange={changeHandler(setPrefixTitle)} />
      <br />
      <label htmlFor="suffix">Title (suffix)</label>
      <input id="suffix" onChange={changeHandler(setSuffixTitle)} />
      <br />
      <label htmlFor="species">Species</label>
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
      <label htmlFor="class">Class</label>
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
          onClick={addButtonHandler}
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

function CharacterMajorEventInput({ eventId, removeButtonHandler }) {
  return (
    <div>
      <label htmlFor={"event-title" + eventId}>Event name</label>
      <input
        type="text"
        name={"event-title" + eventId}
        id={"event-title" + eventId}
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
      <input type="date" id={"start-date" + eventId}></input>
      <label htmlFor={"end-date" + eventId}>End date</label>
      <input type="date" id={"end-date" + eventId}></input>
      <label htmlFor={"event-desc-" + eventId}>Event description</label>
      <textarea
        name={"event-desc-" + eventId}
        id={"event-desc-" + eventId}
        cols="50"
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
        <>
          {backstory ? (
            <>
              <p>Backstory</p>
              <p className="character-text-box">{backstory}</p>
            </>
          ) : null}
        </>
        <>
          {keyEvents ? (
            <>
              <p>Key Events</p>
              <KeyEventsDisplay keyEventsList={keyEvents}></KeyEventsDisplay>
            </>
          ) : null}
        </>
      </div>
    </div>
  );
}

function KeyEventsDisplay({ keyEventsList }) {
  return <div></div>;
}

export default App;
