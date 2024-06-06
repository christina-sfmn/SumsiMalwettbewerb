// -------------------- GLOBAL VARIABLES & SETTINGS --------------------

const baseUrl = "https://sumsi.dev.webundsoehne.com";
let headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
let body = {
  email: "admin@csaw.at",
  password: "UZXaTS2jyrbM5j33SPSt",
};
let authToken;

// VARIABLES FOR SUBMISSION/VOTING
let lastDateForSubmission = "01.11.2024";
let endOfCompetition = "05.11.2024";
let dateOfWinnerPublication = "06.11.2024";

const currentDate = new Date();
const lastDateForSubmissionDate = parseDate(lastDateForSubmission);
const endOfCompetitionDate = parseDate(endOfCompetition);

let submission_open;
let voting_open;

// VARIABLES FOR UPLOAD FORM
const uploadForm = document.getElementById("upload-form");
const uploadMsg = document.getElementById("upload-message");
const infoMsg = document.getElementById("info-msg");
const errorMsg = document.getElementById("error-msg");

uploadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (submission_open === true) {
    uploadImage();
  } else {
    alert(
      "Die Zeit zum Hochladen von Bildern ist abgelaufen. Es ist nicht möglich, ein neues Bild hochzuladen."
    );
    return;
  }
});

// VARIABLE FOR SUBMISSIONS + GALLERY
let allSubmissions = []; // Array for submissions

// VARIABLES FOR GALLERY
const loading = `<div class="flex flex-col items-center justify-center lg:w-[310%] md:w-[200%] w-[100%] mx-auto">
<img src="../assets/icons/Ellipsis@1x-1.0s-200px-200px.svg" class="w-16 h-16">
<p class="uppercase text-black font-bold text-xl">Loading</p>
</div>`;
const galleryContainer = document.getElementById("galleryContainer");
const itemsPerPage = 6; // Items per page
let currentPage = 1; // Current page

// -------------------- CONVERT DATE STRING INTO DATE OBJECT --------------------

function parseDate(dateString) {
  const [day, month, year] = dateString.split(".");
  return new Date(`${year}-${month}-${day}`);
}

// -------------------- BASIC AUTHENTICATION --------------------

function authentication() {
  const loginUrl = new URL(`${baseUrl}/api/v1/login`);

  fetch(loginUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log("Authentication data:", data);
      authToken = data.token;
      getAllSubmissions();
      checkOpenedSubmissionAndVoting();
    })
    .catch((error) =>
      console.error("Fehler bei der Authentifizierung:", error)
    );
}

// -------------------- CHECK SUBMISSION AND VOTING STATUS --------------------

function checkOpenedSubmissionAndVoting() {
  if (currentDate <= lastDateForSubmissionDate) {
    submission_open = true;
    voting_open = false;
    infoMsg.innerText = `Sie können Bilder bis zum ${lastDateForSubmission} hochladen, danach beginnt die Abstimmung. Das Gewinnspiel endet am ${endOfCompetition} und wir werden den/die Gewinner:in am ${dateOfWinnerPublication} bekannt geben.`;
    infoMsg.classList.remove("hidden");
  } else if (currentDate >= endOfCompetitionDate) {
    voting_open = false;
  } else {
    submission_open = false;
    voting_open = true;
    errorMsg.innerText = `Es ist nicht mehr möglich, neue Bilder hochzuladen. Die Abstimmung ist im Gange. Wir werden den/die Gewinner:in am ${dateOfWinnerPublication} bekannt geben.`;
    errorMsg.classList.remove("hidden"); // Show error message in form
    infoMsg.classList.add("hidden");
    document.getElementById("upload-form").classList.add("hidden"); // Hide upload form
  }
}

// -------------------- GET ALL SUBMISSIONS --------------------

function getAllSubmissions() {
  const submissionsUrl = new URL(`${baseUrl}/api/v1/submissions`);

  headers = {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  galleryContainer.innerHTML = loading;
  fetch(submissionsUrl, {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .then((submissions) => {
      // console.log("Submissions data:", submissions);
      allSubmissions = submissions.data; // Save all submissions in array
      displayGallery();
    })
    .catch((error) => console.error("Fehler bei der Anfrage:", error));
}

// -------------------- DISPLAY GALLERY --------------------

function displayGallery() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const submissionsToDisplay = allSubmissions.slice(startIndex, endIndex);

  // Check for submissions
  if (submissionsToDisplay.length === 0) {
    alert("Keine weiteren Einträge zum Anzeigen.");
    return;
  }

  galleryContainer.innerHTML = ""; // Clear gallery

  // Create cards for each element & add to container
  submissionsToDisplay.forEach((submission) => {
    const card = document.createElement("div");
    card.className = "submission-container";

    const submissionImage = document.createElement("img");
    submissionImage.setAttribute(
      "src",
      `${baseUrl}` + submission.image.public_location
    );
    submissionImage.setAttribute("alt", submission.image.name);
    submissionImage.setAttribute("loading", "lazy");

    const submissionChild = document.createElement("p");
    submissionChild.className = "child-info";
    submissionChild.innerText =
      submission.child_firstname + ", " + submission.child_age;

    const submissionVotes = document.createElement("p");
    submissionVotes.className = "votes-info";

    // Get vote count
    getVoteCount(submission.id).then((totalVotes) => {
      if (
        totalVotes === 0 ||
        totalVotes === null ||
        totalVotes === undefined ||
        totalVotes === ""
      ) {
        submissionVotes.innerText = "noch keine Stimmen vorhanden";
      } else {
        submissionVotes.innerText = `${totalVotes} Stimme(n)`;
      }
    });

    const voteBtn = document.createElement("button");
    voteBtn.className = "vote-btn";
    voteBtn.innerText = "Abstimmen";
    voteBtn.onclick = () => voteForImage(submission);

    card.appendChild(submissionImage);
    card.appendChild(submissionChild);
    card.appendChild(submissionVotes);
    card.appendChild(voteBtn);
    galleryContainer.appendChild(card);
  });

  // Show/hide navigation buttons based on page
  if (currentPage === 1) {
    document.getElementById("prev-btn").classList.add("hidden");
  } else {
    document.getElementById("prev-btn").classList.remove("hidden");
  }

  if (endIndex >= allSubmissions.length) {
    document.getElementById("load-more-btn").classList.add("hidden");
  } else {
    document.getElementById("load-more-btn").classList.remove("hidden");
  }
}

// Load more images
document.getElementById("load-more-btn").addEventListener("click", () => {
  currentPage++;
  displayGallery();
});

// Load previous images
document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayGallery();
  }
});

// -------------------- UPLOAD IMAGES --------------------

async function uploadImage() {
  const headers = {
    Authorization: `Bearer ${authToken}`,
    Accept: "application/json",
  };

  const email = document.getElementById("email").value;
  const childAge = parseInt(document.getElementById("child_age").value, 10);
  // Error handling
  if (isNaN(childAge) || childAge > 14) {
    alert("Das Kind darf nicht älter als 14 Jahre sein.");
    return;
  }

  if (await emailExists(email)) {
    alert("Diese E-Mail-Adresse hat bereits ein Bild eingereicht.");
    return;
  }
  // Create FormData-Object
  const body = new FormData();
  body.append(
    "legalguardian_firstname",
    document.getElementById("legalguardian_firstname").value
  );
  body.append(
    "legalguardian_lastname",
    document.getElementById("legalguardian_lastname").value
  );
  body.append("email", document.getElementById("email").value);
  body.append(
    "child_firstname",
    document.getElementById("child_firstname").value
  );
  body.append("child_age", document.getElementById("child_age").value);

  // Add checkbox-values as 1 or 0
  body.append(
    "approval_privacypolicy",
    document.getElementById("approval_privacypolicy").checked ? 1 : 0
  );
  body.append(
    "approval_participation",
    document.getElementById("approval_participation").checked ? 1 : 0
  );
  body.append(
    "approval_mailnotification",
    document.getElementById("approval_mailnotification").checked ? 1 : 0
  );
  body.append("image", document.querySelector('input[name="image"]').files[0]);

  try {
    uploadMsg.innerText = "Uploading ...";
    const uploadUrl = new URL(`${baseUrl}/api/v1/submissions`);

    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (response.ok) {
      uploadMsg.innerText = "Bild erfolgreich hochgeladen!";
      uploadForm.reset();
      getAllSubmissions(); // Update gallery
      setTimeout(() => {
        uploadMsg.innerText = "";
      }, 5000);
    } else {
      const errorData = await response.json();
      console.error("Fehler beim Hochladen des Bildes:", errorData);
      uploadMsg.innerText = "Fehler beim Hochladen des Bildes.";
    }
  } catch (error) {
    console.error("Fehler:", error);
    alert("Es gab ein Problem beim Hochladen des Bildes.");
  }
}

// Check if submission with this email address already exists
async function emailExists(email) {
  const submissionsUrl = new URL(`${baseUrl}/api/v1/submissions`);

  const response = await fetch(submissionsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.data.some((submission) => submission.email === email);
  } else {
    console.error("Fehler beim Abrufen der Einreichungen.");
    return false;
  }
}

// -------------------- GET VOTE COUNT --------------------

function getVoteCount(submission) {
  const voteCountUrl = new URL(
    `${baseUrl}/api/v1/submissions/${submission}/votes/count`
  );

  return fetch(voteCountUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((votes) => {
      // console.log("Votes data:", votes);
      return votes.data.votes;
    })
    .catch((error) => {
      console.error("Fehler beim Abrufen der Stimmenanzahl:", error);
    });
}

// -------------------- VOTE FOR IMAGE --------------------

function voteForImage(submission) {
  // Check if voting is open or closed
  if (!voting_open) {
    alert("Die Abstimmung ist derzeit nicht möglich.");
    return;
  }
  const email = prompt("Bitte geben Sie Ihre E-Mail-Adresse ein:");

  // Check if email was entered
  if (email === null) {
    // User clicked "Cancel"
    alert("Abstimmung abgebrochen.");
    return;
  }

  if (email === "") {
    alert("E-Mail-Adresse ist erforderlich, um abzustimmen.");
    return;
  }

  const votingsUrl = new URL(
    `${baseUrl}/api/v1/submissions/${submission.id}/votings`
  );

  // Fetch existing votes for submission to check if user has already voted
  fetch(votingsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((votings) => {
      const userHasVoted = votings.data.some((vote) => vote.email === email);
      if (userHasVoted) {
        alert("Sie haben bereits für dieses Bild abgestimmt.");
        return;
      }

      // Submit vote
      fetch(votingsUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email }),
      })
        .then((response) => response.json())
        .then((votings) => {
          if (votings.status === "success") {
            alert("Ihre Stimme wurde erfolgreich abgegeben!");
            getAllSubmissions(); // Update gallery
          } else {
            alert("Sie haben bereits die maximale Anzahl an Stimmen erreicht.");
          }
        })
        .catch((error) => {
          console.error("Fehler bei der Abstimmung:", error);
          alert(
            "Fehler beim Abgeben der Stimme. Bitte versuchen Sie es später erneut."
          );
        });
    })
    .catch((error) => {
      console.error("Fehler beim Überprüfen der Abstimmungen:", error);
      alert(
        "Fehler beim Überprüfen der Abstimmungen. Bitte versuchen Sie es später erneut."
      );
    });
}
