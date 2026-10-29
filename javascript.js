<script>
document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.querySelector("form");
    const searchInput = document.querySelector(
        'input[placeholder*="job" i], input[name="job"]'
    );
    const locationInput = document.querySelector(
        'input[placeholder*="location" i], input[name="location"]'
    );

    const jobCards = document.querySelectorAll("[data-title]");
    const resultsSection = document.getElementById("searchResultsSection");
    const message = document.getElementById("searchMessage");

    if (!searchForm || jobCards.length === 0) {
        console.log("Search form or job cards not found.");
        return;
    }

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const jobTerm = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const locationTerm = locationInput
            ? locationInput.value.trim().toLowerCase()
            : "";

        let found = 0;

        jobCards.forEach(function (card) {
            const title = (card.dataset.title || "").toLowerCase();
            const location = (card.dataset.location || "").toLowerCase();
            const description = (card.textContent || "").toLowerCase();

            const matchesJob =
                !jobTerm ||
                title.includes(jobTerm) ||
                description.includes(jobTerm);

            const matchesLocation =
                !locationTerm ||
                location.includes(locationTerm) ||
                description.includes(locationTerm);

            if (matchesJob && matchesLocation) {
                card.style.display = "";
                found++;
            } else {
                card.style.display = "none";
            }
        });

        if (message) {
            message.textContent = found > 0
                ? found + " job(s) found!"
                : "No matching jobs found. Try another job title or location.";
        }

        if (resultsSection) {
            resultsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
</script>