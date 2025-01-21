document.getElementById('reminderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const phoneNumber = document.getElementById('phoneNumber').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const interval = parseInt(document.getElementById('interval').value);

    const startDate = new Date();
    const endDate = new Date();

    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    startDate.setHours(startHours, startMinutes, 0);
    endDate.setHours(endHours, endMinutes, 0);

    if (startDate >= endDate) {
        document.getElementById('message').innerText = "End time must be after start time.";
        return;
    }

    document.getElementById('message').innerText = "Reminders scheduled.";

    const intervalId = setInterval(() => {
        const currentTime = new Date();

        if (currentTime >= endDate) {
            clearInterval(intervalId);
            document.getElementById('message').innerText = "Reminders ended.";
            return;
        }

        if (currentTime >= startDate) {
            sendReminder(phoneNumber);
        }
    }, interval * 60000); // Interval in milliseconds
});

function sendReminder(phoneNumber) {
    fetch('/send-reminder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, message: "Time to drink water! Stay hydrated!" }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Reminder sent successfully.");
            } else {
                console.error("Error sending reminder:", data.error);
            }
        })
        .catch(error => console.error("Error:", error));
}
