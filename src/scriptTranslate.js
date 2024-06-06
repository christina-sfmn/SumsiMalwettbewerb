// VARIABLES FOR TRANSLATION TEXT
const preferredLanguage = getLanguagePreference();
const bodyContent = document.getElementById("body-content");
let originalHTML;

document.addEventListener("DOMContentLoaded", (event) => {
  if (preferredLanguage === "en") {
    translatePage();
  }
});

// FUNCTIONS TO STORE LANGUAGE PREFERENCES WHEN USER SELECTS LANGUAGE
function setLanguagePreference(language) {
  localStorage.setItem("preferredLanguage", language);
}

function getLanguagePreference() {
  return localStorage.getItem("preferredLanguage") || "de"; // Default to German
}

// FUNCTIONS FOR TRANSLATION
function translateToEnglish() {
  setLanguagePreference("en");
  translatePage();
}

function resetToGerman() {
  setLanguagePreference("de");
  resetPage();
}

async function translatePage() {
  const apiKey = ""; // Insert API key here

  // Store the original HTML content if it's not already stored
  if (!originalHTML) {
    originalHTML = bodyContent.innerHTML;
  }

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: originalHTML,
          target: "en", // (English)
          format: "html",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.error.message}`
      );
    }

    const data = await response.json();
    if (data.data && data.data.translations) {
      bodyContent.innerHTML = data.data.translations[0].translatedText;
    } else {
      throw new Error("Translation error: Invalid response structure");
    }
  } catch (error) {
    console.error("Translation error:", error);
    alert("Translation error: " + error.message);
  }
}

// Reset function - to original language - German
function resetPage() {
  if (originalHTML) {
    bodyContent.innerHTML = originalHTML;
  }
}