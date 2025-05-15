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
  const [name, setName] = useState("");
  const [prefixTitle, setPrefixTitle] = useState("");
  const [suffixTitle, setSuffixTitle] = useState("");

  const [playerClass, setPlayerClass] = useState("");
  const [species, setSpecies] = useState("");

  const [skills, setSkills] = useState([]);
  const [keyEvents, setKeyEvents] = useState([]);
  const [backstory, setBackstory] = useState("");

  function changeHandler(setter) {
    return (event) => setter(event.target.value);
  }

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
      <br />
      <button>Submit</button>
    </form>
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
        ) : (
          <></>
        )}
      </>
    </div>
  );
}

export default App;
