document.addEventListener("DOMContentLoaded", () => {
  function validateForm() {
    let isValid = true;
    const fieldsets = document.querySelectorAll(".athlete-row");
    const unfilledFieldIds = []; // Array para armazenar os IDs dos campos não preenchidos
    const filledFieldIds = []; // Array para armazenar os IDs dos campos preenchidos corretamente
    const filledFieldsets = new Set(); // Usando um Set para evitar duplicados e contar fieldsets preenchidos corretamente

    fieldsets.forEach((fieldset) => {
        const nameInput = fieldset.querySelector('input[name^="name"]');
        const matriculaInput = fieldset.querySelector('input[name^="matricula"]');
        const fileInput = fieldset.querySelector('input[type="file"]');

        // Verifica se o campo de nome, matrícula e arquivo foram preenchidos
        const isNameFilled = nameInput && nameInput.value.trim() !== "";
        const isMatriculaFilled = matriculaInput && matriculaInput.value.trim() !== "";
        const isFileFilled = fileInput && fileInput.files.length > 0;

        // Se o fieldset está completamente preenchido
        if (isNameFilled && isMatriculaFilled && isFileFilled) {
            filledFieldsets.add(fieldset);

            // Adiciona os IDs dos campos preenchidos corretamente
            if (nameInput) filledFieldIds.push(nameInput.id);
            if (matriculaInput) filledFieldIds.push(matriculaInput.id);
            if (fileInput) filledFieldIds.push(fileInput.id);
        } else {
            // Se qualquer campo do fieldset foi preenchido, todos os campos obrigatórios devem ser preenchidos
            if (isNameFilled || isMatriculaFilled || isFileFilled) {
                if (!isNameFilled && nameInput && nameInput.hasAttribute("required")) {
                    unfilledFieldIds.push(nameInput.id);
                    isValid = false;
                }
                if (!isMatriculaFilled && matriculaInput && matriculaInput.hasAttribute("required")) {
                    unfilledFieldIds.push(matriculaInput.id);
                    isValid = false;
                }
                if (!isFileFilled && fileInput && fileInput.hasAttribute("required")) {
                    unfilledFieldIds.push(fileInput.id);
                    isValid = false;
                }
            }
        }
    });

    // Verifica a modalidade e o horário
    if (!checkTimeAndModality()) {
        isValid = false;
    }

    // Gera um array com IDs esperados dos campos
    const array1 = [];
    for (let i = 1; i <= 6; i++) {
        array1.push(`name${i}`);
        array1.push(`matricula${i}`);
        array1.push(`file${i}`);
    }

    // Remove os campos preenchidos corretamente do array de campos esperados
    const resultArray = checkFirstSixFieldsets()
    // Aplica os estilos de erro para os campos não preenchidos
    applyStyles(unfilledFieldIds);

    // Aplica os estilos para os campos faltando
    applyStyles(resultArray);

    // Se todos os campos esperados estão preenchidos, então resultArray será vazio
    if (resultArray.length != 0) {
        isValid = false;
    }

    return isValid;
}



  function applyStyles(ids) {
    // Estilos para campos obrigatórios
    const requiredStyle = {
      border: "2px solid red",
    };

    // Estilos padrão para remover o estilo de erro
    const defaultStyle = {
      border: "", // Remove a borda
    };

    // Primeiro, aplica o estilo de erro a todos os IDs fornecidos
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        // Aplica o estilo de erro para campos não preenchidos
        Object.keys(requiredStyle).forEach((styleProperty) => {
          element.style[styleProperty] = requiredStyle[styleProperty];
        });
      }
    });

    // Em seguida, remove o estilo de erro para campos que foram preenchidos
    document.querySelectorAll("input, select, textarea").forEach((element) => {
      if (
        element.value.trim() !== "" ||
        (element.type === "file" && element.files.length > 0)
      ) {
        Object.keys(defaultStyle).forEach((styleProperty) => {
          element.style[styleProperty] = defaultStyle[styleProperty];
        });
      }
    });
    for (let i of ids) {
      // Verifica se o ID começa com "file" seguido pelo valor de i
      if (i.startsWith("file")) {
        // Constrói o seletor para o <label> com base no valor de i
        const labelId = `label-${i}`; // Supondo que o ID do <label> seja algo como "label-file14"
        const label = document.querySelector(`#${labelId}`); // Seleciona o <label> com o ID construído
        const icon = label.querySelector("i");
        const input = document.getElementById(i);

        // Aqui você pode manipular o <label> como desejar
        if (label) {
          label.style.backgroundColor = "#ffc107"; // Cor de fundo amarela
          label.style.color = "#000";
          icon.classList.remove("fa-upload");
          icon.classList.add("fa-exclamation");
          icon.style.width = "16px";
          icon.style.textAlign = "center";
          input.classList.remove("required-field");
        }
      }
    }
  }

  window.submitForm = function () {
    if (validateForm()) {
      setTimeout(() => {
        submitFormPDF();
        alert("🎉 Inscrição feita com sucesso! 🎉");
      }, 500);
    } else {
      setTimeout(() => {
        alert("Por favor, preencha todos os campos obrigatórios.");
      }, 500);
    }
  };

  window.handleFileChange = function (event) {
    const input = event.target;
    const label = document.querySelector(`label[for="${input.id}"]`);
    const icon = label.querySelector("i");
    if (input.files.length > 0) {
      label.style.backgroundColor = "#28a745"; // Cor de fundo quando o arquivo é selecionado
      label.style.color = "#fff";
      icon.classList.remove("fa-upload"); // Remove o ícone de upload
      icon.classList.remove("fa-exclamation");
      icon.classList.add("fa-check");
      icon.style.width = "16px";
      icon.style.textAlign = "center";
      // Remove a classe de campo obrigatório quando um arquivo é selecionado
      input.classList.remove("required-field");
    } else {
      label.style.backgroundColor = "#007bff"; // Cor de fundo padrão
      label.style.color = "#fff"; // Cor do texto padrão
      icon.classList.remove("fa-check"); // Remove o ícone de check
      icon.classList.add("fa-upload"); // Adiciona o ícone de upload
      // Adiciona a classe de campo obrigatório se nenhum arquivo estiver selecionado

      input.classList.add("required-field");
    }
  };
  // Adiciona evento change para todos os inputs de arquivo
  document.querySelectorAll('input[type="file"]').forEach((fileInput) => {
    fileInput.addEventListener("change", handleFileChange);
  });
});
function checkTimeAndModality() {
  let test = true;
  // Obtém o valor da modalidade selecionada
  const genderSelect = document.getElementById("genderSelect");
  const selectedGender = genderSelect.value;

  // Obtém o valor do curso selecionado
  const teamSelect = document.getElementById("teamSelect");
  const selectedTeam = teamSelect.value;

  // Remove a borda vermelha existente
  genderSelect.style.border = "";
  teamSelect.style.border = "";

  // Verifica qual seleção está vazia e retorna uma mensagem correspondente
  if (!selectedGender && !selectedTeam) {
    // Adiciona a borda vermelha aos campos vazios
    genderSelect.style.border = "2px solid red";
    teamSelect.style.border = "2px solid red";
    test = false;
  } else if (!selectedGender) {
    // Adiciona a borda vermelha ao campo vazio
    genderSelect.style.border = "2px solid red";
    test = false;
  } else if (!selectedTeam) {
    // Adiciona a borda vermelha ao campo vazio
    teamSelect.style.border = "2px solid red";
    test = false;
  } else {
  }
  return test;
}
function checkFirstSixFieldsets() {
  const fieldsets = document.querySelectorAll(".athlete-row");
  const unfilledFieldIds = []; // Array para armazenar os IDs dos campos não preenchidos
  const requiredFieldsets = 6; // Limite de fieldsets a serem verificados (6 primeiros)

  // Itera sobre os primeiros 6 fieldsets
  for (let i = 0; i < Math.min(fieldsets.length, requiredFieldsets); i++) {
      const fieldset = fieldsets[i];
      
      const nameInput = fieldset.querySelector('input[name^="name"]');
      const matriculaInput = fieldset.querySelector('input[name^="matricula"]');
      const fileInput = fieldset.querySelector('input[type="file"]');

      // Verifica se algum dos campos não está preenchido (e se o campo existe)
      if (nameInput && nameInput.value.trim() === "") {
          unfilledFieldIds.push(nameInput.id); // Adiciona o ID do campo não preenchido
      }
      
      if (matriculaInput && matriculaInput.value.trim() === "") {
          unfilledFieldIds.push(matriculaInput.id); // Adiciona o ID do campo não preenchido
      }
      
      if (fileInput && fileInput.files.length === 0) {
          unfilledFieldIds.push(fileInput.id); // Adiciona o ID do campo não preenchido
      }
  }

  return unfilledFieldIds; // Retorna o array de IDs dos campos não preenchidos
}

