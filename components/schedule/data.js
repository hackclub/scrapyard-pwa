const schedule = [
  {
    day: {
      short: "Saturday",
      long: "Saturday",
      number: 1,
      date: "March 1st"
    },
    events: [
      {
        name: "✈️ Transportation Available from AUS",
        start: "8:00 am",
        end: "11:00 am",
        muted: true
      },
      {
        name: "Doors Open",
        start: "11:00 am",
        end: "12:00 pm"
      },
      {
        name: "Opening Ceremony",
        start: "12:00 pm",
        end: "12:30 pm"
      },
      {
        name: "Lunch",
        start: "12:30 pm",
        end: "1:30 pm"
      },
      {
        name: "Workshops 1",
        start: "2:00 pm",
        end: "3:00 pm"
      },
      {
        name: "Dinner / Lightning Talks",
        start: "7:00 pm",
        end: "8:00 pm"
      },
      {
        name: "Workshops 2",
        start: "9:00 pm",
        end: "10:00 pm"
      },
      {
        name: "???",
        start: "11:59 pm",
        end: "1:00 am"
      }
    ]
  },
  {
    day: {
      short: "Sunday",
      long: "Sunday",
      number: 2,
      date: "March 2nd"
    },
    events: [
      {
        name: "Breakfast",
        start: "7:00 am",
        end: "9:00 am"
      },
      {
        name: "Lunch",
        start: "12:30 pm",
        end: "1:30 pm"
      },
      {
        name: "Demos",
        start: "1:30 pm",
        end: "2:30 pm"
      },
      {
        name: "Closing Ceremony",
        start: "2:30 pm",
        end: "3:00 pm"
      },
      {
        name: "✈️ Transportation Available to AUS",
        start: "3:00 pm",
        end: "10:00 pm",
        muted: true
      }
    ]
  }
];

export default schedule;
