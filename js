<script>
const CLIENT_ID = "YOUR_CLIENT_ID.apps.googleusercontent.com";
const API_KEY = "YOUR_API_KEY";

const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

let tokenClient;
let gapiInited = false;
let gisInited = false;

// Load Google API
function gapiLoaded() {
  gapi.load("client", async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
  });
}

// Load Google Identity Services
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: handleAuth,
  });
  gisInited = true;
}

// Handle OAuth response
async function handleAuth(tokenResponse) {
  if (tokenResponse.error) {
    console.error(tokenResponse);
    return;
  }

  gapi.client.setToken(tokenResponse);

  const event = {
    summary: "Aura AI Wellness Check 🌸",
    description: "Mood or journal logged via Aura AI",
    start: {
      dateTime: new Date().toISOString(),
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      timeZone: "Asia/Kolkata",
    },
  };

  await gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });

  alert("Event added to Google Calendar ✨");
}

// Button click function
function addToCalendar() {
  if (!gapiInited || !gisInited) {
    alert("Google API not loaded yet");
    return;
  }
  tokenClient.requestAccessToken({ prompt: "consent" });
}
</script>
