document.addEventListener("DOMContentLoaded", function () {
  const firstNameInput = document.querySelector("#firstname");
  const lastNameInput = document.querySelector("#lastname");
  const age = document.querySelector("#age");
  const placeOfBirth = document.querySelector("#nationality");
  const playerLifeStory = document.querySelector("#biography");
  const warningFirstStep = document.querySelector("#error-firststep");
  const warningSecondStep = document.querySelector("#error-secondstep");

  window.addEventListener("message", function (event) {
    var item = event.data;

    if (item.showPlayerMenu == true) {
      document.querySelector(".action-menu-form").style.display = "block";
    } else if (item.showPlayerMenu == false) {
      document.querySelector(".action-menu-form").style.display = "none";
    }
  });

  document.querySelector("#next_step").addEventListener("click", function (e) {
    if (firstNameInput.value === "" || lastNameInput.value === "" || age.value === "" || age.value < 18 || age.value > 90 || placeOfBirth.value === ""){             
      warningFirstStep.innerHTML = '<span class="error">Erro:</span> Preencha todos os campos ou revise suas informações'
      return;
    };
    warningFirstStep.innerHTML = '';
    document.querySelector(".control-form-two").style.display = "block";
  });

  document
    .querySelector("#create-character")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const gender = document.querySelector('input[name="gender"]:checked');

      if (playerLifeStory.value === ""){
        warningSecondStep.innerHTML = '<span class="error">Erro:</span> História vazia'
        return;
      }  
      warningSecondStep.innerHTML = "";

      fetch(`https://${GetParentResourceName()}/spawnButton`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          firstname: firstNameInput.value,
          lastname: lastNameInput.value,
          age: age.value,
          gender: gender.value
        }),
      })
        .then((resp) => resp.json())
        .then((resp) => console.log(resp));
    });
});
