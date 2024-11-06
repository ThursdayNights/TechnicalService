var cases = [
  {
    requestid: 1,
    servicetype: "Repair",
    technician: "Victor",
    equipment: "Arburg",
    serialnumber: "123456",
    description: "This is the first work order",
    status: "Request",
    created: "2024-10-02",
    servicecall: { date: "2024-10-10", time: "10:00" },
    notes: [
      {
        noteid: 1,
        noteowner: "Lourens",
        note: "This is the first note",
        notedate: "2024-10-02",
      },
    ],
    parts: [
      { partid: 1, parts: "This is a list of parts", partdate: "2024-10-02" },
    ],
    labour: [
      {
        labourid: 1,
        technician: "Lourens",
        labourdetial: "Text Description",
        hourtype: "",
        labourhours: "",
      },
    ],
  },
];
