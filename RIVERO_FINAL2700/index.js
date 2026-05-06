
    const form = document.querySelector('form');
    const btn = form.querySelector('button');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        btn.innerText = "Sending...";
        btn.disabled = true;

        const formData = new FormData(form);

        try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            btn.innerText = "Message Sent! ✅";
            btn.style.backgroundColor = "#22c55e"; 
            form.reset();
        } else {
            // This is where the Worker sends a 400 or 500 error
            const errorText = await response.text();
            console.error("Worker sent an error:", errorText);
            throw new Error(errorText);
        }
    } catch (err) {
        // --- THIS IS THE PART YOU ARE ADDING/REPLACING ---
        console.log("Submission failed. Check the Network tab for details.");
        console.error("Actual Error:", err);
        
        btn.innerText = "Error! ❌";
        btn.style.backgroundColor = "#ef4444"; 
        btn.disabled = false;
        // ------------------------------------------------
    }
    });