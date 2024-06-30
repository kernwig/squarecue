/* SquareCue by Adam Fanello - Copyright 2020,2024 - GNU v3 licensed */

let select = 'Level: <select id="dancelevel" onchange="selectLevel(this.value)">';
const levels = [
  {value: 'abc', display: 'ABC Core'},
  {value: 'abca', display: 'ABC A-Dance'},
  {value: 'abcb', display: 'ABC B-Dance'},
  {value: 'abcc', display: 'ABC C-Dance'},
  {value: 'basic', display: 'Basic'},
  {value: 'hc', display: 'Handicapable'},
  {value: 'ssd', display: 'SSD'},
  {value: 'ms', display: 'Mainstream'},
  {value: 'plus', display: 'Plus'},
  {value: 'a1', display: 'A1'},
  {value: 'a2', display: 'A2/Advanced'},
];
const levelToOptionIndex = {};
let firstLevel = null;
let levelCount = 0;
for (let idx = 0; idx < levels.length; ++idx) {
  const level = levels[idx];
  const levelElements = document.getElementsByTagName(level.value);
  if (levelElements.length) {
    select += '<option value="' + level.value + '">' + level.display + '</option>';
    firstLevel = firstLevel || level.value;
    levelToOptionIndex[level.value] = levelCount;
    levelCount++;
  }
}
select += '</select>';

function selectLevel(value) {
  document.body.className = value;
  document.getElementById('dancelevel').selectedIndex = levelToOptionIndex[value];
  localStorage.setItem("level", value);
}

let defaultBpm = document.getElementsByTagName('bpm')[0];
if (defaultBpm) {
  const bpm = Number(defaultBpm.textContent);
  defaultBpm.remove();
  defaultBpm = bpm;
}

const
  trackHtml =
    'BPM: <input id="bpm" type="number" min="64" max="256" value="' + (defaultBpm || 128) + '"/>' +
    '<button id="runTracking" onclick="javascript: runTracking()">Track</button>' +
    '<button id="pauseTracking" style="display: none" onclick="javascript: pauseTracking()">Pause</button>' +
    '<button id="resetTracking" onclick="javascript: resetTracking()">Reset</button>' +
    'Run time: <span id="clock">0:00</span>';

if (levelCount > 0) {
  let header = document.getElementsByTagName('header')[0];
  const h1 = document.createElement("h1");
  h1.textContent = header.textContent;
  header.textContent = "";
  header.appendChild(h1);
  header.insertAdjacentHTML('beforeend', select + trackHtml);
  const previousLevel = localStorage.getItem("level");
  selectLevel(levelToOptionIndex[previousLevel] != undefined ? previousLevel : firstLevel);
}

// Tracking functionality

const segmentNames = [
  ["opener"],
  ["figure1", "figure12"],
  ["figure2", "figure12"],
  ["middle"],
  ["figure3", "figure34"],
  ["figure4", "figure34"],
  ["closer"],
  ["tag"]
];
const figureFilterNames = ["figure1","figure2","figure3","figure4"];
const measureNames = [
  ["m1"],
  ["m2", "m9"],
  ["m3", "m17"],
  ["m4", "m25"],
  ["m5", "m33"],
  ["m6", "m41"],
  ["m7", "m49"],
  ["m8", "m57"],
];

const highlightClass = "highlight";
const beatsPerMeasure = 8;
const secondsPerMinute = 60;
const millisecondsPerSecond = 1000;

let trackSinceTime;
let trackAccumulatedTime = 0;
let segmentIdx = 0;
let measureIdx = 0;
let clockTime = 0;
let measureIntervalID;
let clockIntervalID;
let currentHighlights = [];

for (const segmentName of new Set(segmentNames.flat())) {
  for (const element of document.getElementsByTagName(segmentName)) {
    const html = '<a class="track-here" href="javascript: skipToSegment(\'' + segmentName + '\')">Track From Here</a>';
    element.insertAdjacentHTML("afterbegin", html);
  }
}

function skipToSegment(name) {
  for (let idx = 0; idx < segmentNames.length; ++idx) {
    for (const segmentName of segmentNames[idx]) {
      if (segmentName === name) {
        pauseTracking();
        segmentIdx = idx;
        measureIdx = 0;
        runTracking();
        return;
      }
    }
  }
}

function runTracking() {
  console.log("runTracking");
  if (measureIntervalID) {
    console.log("tracking already running");
    return;
  }

  const bpm = Number(document.getElementById("bpm").value);
  if (bpm < 64 || bpm > 999) {
    alert("Bad BPM value: " + bpm);
    return;
  }
  const delay = (secondsPerMinute / bpm * beatsPerMeasure) * millisecondsPerSecond;
  console.log("measure delay is", delay, "ms");

  trackSinceTime = Date.now();
  updateClock();
  clockIntervalID = setInterval(() => updateClock(), 1000);

  trackNextMeasure();
  measureIntervalID = setInterval(() => trackNextMeasure(), delay);

  setTrackingButtons(true);
}

function pauseTracking() {
  console.log("pauseTracking");
  if (measureIntervalID || clockIntervalID) {
    clearInterval(measureIntervalID);
    clearInterval(clockIntervalID);
    measureIntervalID = undefined;
    clockIntervalID = undefined;
    trackAccumulatedTime += (Date.now() - trackSinceTime);
    setTrackingButtons(false);
  }
}

function resetTracking() {
  console.log("resetTracking");
  pauseTracking();
  trackAccumulatedTime = 0;
  trackSinceTime = 0;
  segmentIdx = 0;
  measureIdx = 0;
  clearHighlights();
  setTrackingButtons(false);
  updateClock();
}

function setTrackingButtons(running) {
  document.getElementById("bpm").disabled = running;
  document.getElementById("runTracking").style.display = running ? "none" : "inline";
  document.getElementById("pauseTracking").style.display = running ? "inline" : "none";
  document.getElementById("resetTracking").disabled = running;
}

function trackNextMeasure() {
  console.log("trackNextMeasure");
  clearHighlights();

  for (const segmentElement of document.querySelectorAll(segmentNames[segmentIdx].join(","))) {
    for (const measureElement of segmentElement.querySelectorAll(measureNames[measureIdx].join(","))) {
      const filterOnFigure = getFigureAttribute(measureElement);
      if (!filterOnFigure || filterOnFigure === segmentNames[segmentIdx][0]) {
        measureElement.classList.add(highlightClass);
        currentHighlights.push(measureElement);
      }
    }
  }

  if (currentHighlights.length) {
    currentHighlights[0].scrollIntoView({
      scrollMode: 'if-needed',
      behavior: "smooth",
      block: 'nearest',
      inline: 'nearest',
    });
  }

  measureIdx++;
  if (measureIdx === measureNames.length) {
    measureIdx = 0;
    segmentIdx++;
    if (segmentIdx === segmentNames.length) {
      segmentIdx = 0;
      pauseTracking();
    }
  }
}

function getFigureAttribute(elem) {
  for (const figureName of figureFilterNames) {
    if (elem.attributes.getNamedItem(figureName)) {
      return figureName;
    }
  }
  return null;
}

function clearHighlights() {
  for (const element of currentHighlights) {
    element.classList.remove(highlightClass);
  }
  currentHighlights = [];
}

function updateClock() {
  let clock;
  if (trackSinceTime) {
    const ms = trackAccumulatedTime + (Date.now() - trackSinceTime);
    const seconds = ms / 1000;
    clock = Math.floor(seconds / 60) + ":" + ("0" + Math.round(seconds % 60)).slice(-2);
  } else {
    clock = "0:00";
  }
  document.getElementById("clock").textContent = clock;
}
