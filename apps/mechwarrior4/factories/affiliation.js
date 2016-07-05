let Affiliation = require('../affiliation.js')

module.exports = function () {
  // HACK: this is just until we get real static data
  this.affiliations = [
    new Affiliation({
      name: 'Capellan Confederation',
      cost: 150,
      primaryLanguage: 'Mandarin Chinese',
      secondaryLanguages: ['Russian', 'Cantonese', 'Vietnamese', 'English'],
      attributes: [{ WIL: 50 }],
      skills: [
        {
          name: 'Language',
          subSkill: ['Russian', 'Cantonese', 'Vietnamese', 'English'],
          complexities: ['CB', 'CA'],
          links: [['INT'], ['DEX', 'INT']],
          xp: 10
        },
        {
          name: 'Protocol',
          subSkill: ['Capellan'],
          complexities: ['CB', 'CA'],
          links: [['INT'], ['DEX', 'INT']],
          xp: 10
        },
        {
          name: 'Martial Arts',
          complexities: ['CB', 'CA'],
          links: [['INT'], ['DEX', 'INT']],
          xp: 5
        }
      ]
    }),
    new Affiliation({
      name: 'Draconis Combine',
      cost: 150,
      primaryLanguage: 'Japanese',
      secondaryLanguages: ['Arabic', 'English', 'Swedenese'],
      attributes: [{ WIL: 50 }],
      skills: [
        {
          name: 'Arts',
          subSkill: 'Oral Tradition',
          complexities: ['CB', 'CA'],
          links: [['INT'], ['DEX', 'INT']],
          xp: 15
        },
        {
          name: 'Martial Arts',
          complexities: ['CB', 'CA'],
          links: [['INT'], ['DEX', 'INT']],
          xp: 10
        },
        {
          name: 'Protocol',
          subSkill: ['Combine'],
          complexities: ['CB', 'CA'],
          links: [['INT'], ['DEX', 'INT']],
          xp: 10
        }
      ]
    })
  ]

    return {
      all: () => this.affiliations
    }
}
