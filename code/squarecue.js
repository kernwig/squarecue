/* SquareCue by Adam Fanello - Copyright 2020 - GNU v3 licensed */
var select = '<select id="dancelevel" onchange="document.body.className = this.value">';
var levels = [
    {value: 'abc', display: 'ABC Core'},
    {value: 'abca', display: 'ABC A-Dance'},
    {value: 'abcb', display: 'ABC B-Dance'},
    {value: 'abcc', display: 'ABC C-Dance'},
    {value: 'basic', display: 'Basic'},
    {value: 'ms', display: 'Mainstream'},
    {value: 'plus', display: 'Plus'},
    {value: 'a1', display: 'A1'},
    {value: 'a2', display: 'A2/Advanced'},
];
var firstLevel = null;
for (var idx=0; idx < levels.length; ++idx) {
    var level = levels[idx];
    var levelElements = document.getElementsByTagName(level.value);
    if (levelElements.length) {
        select += '<option value="' + level.value + '">' + level.display + '</option>';
        firstLevel = firstLevel || level.value;
    }
}
select += '</select>';

if (firstLevel) {
    var h1 = document.getElementsByTagName('h1')[0];
    h1.insertAdjacentHTML('afterend', select);
    document.getElementById('dancelevel').selectedIndex = 0;
    document.body.className = firstLevel;
}
