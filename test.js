// const launches = new Map();

// const launch = {
//   flightNumber: 100,
//   mission: 'Kepler Mission 2012',
//   roceket: 'Deds 023',
//   launchDate: new Date('June 17, 2030,'),
//   destination: 'Kepler 420 B',
//   customer: ['DEDS', 'PUC'],
//   upcoming: true,
//   success: false
// };

// launches.set(launch.flightNumber, launch);

// // const getAllPlanets = (req, res) => {
// //   return res.status(200).json(Array.from(launches.values()));
// // };

// const test = launches.values();

// console.log(test);


const myMap = new Map([
  ['value1', 1],
  ['value2', 2],
  ['value3', 3]
]);

const iterator = myMap.values();

let result = iterator.next();

while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}