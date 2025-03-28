const milestonesData = JSON.parse(data).data;

function loadMilestones() {
    const milestones = document.querySelector(".col2");
    milestones.innerHTML = `${milestonesData.map(function(content) {
        return `<div class="full-content" id="${content._id}">
                    <div class="content">
                        <input type="checkbox" onclick="markMileStone(this,${content._id})">
                        <p>${content.name}</p>
                    </div>
                    <div class="hidden_panel">
                        ${content.modules.map(function(module2) {
                            return `<div class="module">
                                        <p>${module2.name}</p>
                                    </div>`;
                        }).join('')}
                    </div>
                </div>`;
    }).join('')}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const contentDivs = document.querySelectorAll(".content p");
    contentDivs.forEach(contentDiv => {
        contentDiv.addEventListener("click", function () {
            loadImage(this.parentElement); // Call corrected function name

            const hiddenPanel = this.parentElement.nextElementSibling;
            if (hiddenPanel.style.display === "block") {
                hiddenPanel.style.display = "none";
            } else {
                const hidden_panels = document.querySelectorAll(".hidden_panel");
                hidden_panels.forEach(function(panel) {
                    panel.style.display = "none";
                });
                hiddenPanel.style.display = "block";
            }
        });
    });
});

function loadImage(content) { // Fixed function name from 'loadimage' to 'loadImage'
    const milestoneImage = document.querySelector(".milestoneImage");
    const milestoneTitle = document.querySelector(".title");
    const milestoneDetails = document.querySelector(".details");

    const milestoneName = content.querySelector("p").innerText;
    const milestoneData = milestonesData.find(function(m) {
        return m.name === milestoneName;
    });

    if (milestoneData) {
        // Start fade-out
        milestoneImage.style.opacity = "0";

        // Wait for transition to finish before changing src
        setTimeout(function () {
            milestoneImage.src = milestoneData.image;
            milestoneTitle.innerText = milestoneData.name;
            milestoneDetails.innerText = milestoneData.description;

            // Trigger fade-in after src change
            
            milestoneImage.style.opacity = "1";
            
        }, 800); // Match the transition duration (0.8s = 800ms)
    }
}
function markMileStone(checkbox,id){
    const milestoneList =document.querySelector(".col2");
    const doneList = document.querySelector(".hidden");
    const item = document.getElementById(id)

    if(checkbox.checked){
        milestoneList.removeChild(item);
        doneList.appendChild(item);
    }else{
        milestoneList.appendChild(item);
        doneList.removeChild(item);    }
}

loadMilestones();