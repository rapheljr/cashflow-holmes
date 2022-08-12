const { Player } = require('../../src/models/player');
const professions = require('../../data/professions.json');
const assert = require('assert');

describe('Player', () => {
  const expectedProfession = professions[0];

  it('Should assign profession to player', () => {
    const player = new Player('p1', 'host');
    player.assignProfession(expectedProfession);
    player.createProfile();
    const { profession } = player.details;
    assert.deepStrictEqual(profession, expectedProfession);
  });

  it('Should assign color to player', () => {
    const player = new Player('p2', 'guest');
    player.assignProfession(expectedProfession);
    player.createProfile();
    player.assignColor('red');
    const { color } = player.details;
    assert.strictEqual(color, 'red');
  });

  it('Should create profile for a player', () => {
    const player = new Player('p3', 'guest');
    player.assignProfession(expectedProfession);
    player.createProfile();
    const { profile } = player.details;
    const expectedCash = 7700;
    assert.strictEqual(profile.profession, 'Doctor(MD)');
    assert.strictEqual(profile.cash, expectedCash);
  });
});