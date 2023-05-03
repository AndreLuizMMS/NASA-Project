async function httpGetPlanets() {
  const response = await fetch('http://localhost:2323/planets');
  return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch('http://localhost:2323/launches');
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    const response = await fetch('http://localhost:2323/launches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(launch)
    });
    return await response.json();
  } catch (error) {
    return {
      ok: false
    };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    const response = await fetch(`http://localhost:2323/launches/${id}`, {
      method: 'delete'
    });
    return await response.json();
  } catch (error) {
    return {
      ok: false
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
