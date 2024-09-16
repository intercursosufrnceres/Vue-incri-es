<script setup>
import {updateTeams} from '../assets/main.js';
function handleChange() {
  updateTeams();
}
</script>

<template>
<!DOCTYPE html>
<html lang="pt-br">


  <body>
    <h1>Incrições 3º Intercursos</h1>
    <form id="athleteForm">
      <div id="athletes">
        <fieldset class="course-options">
          <legend>Modalidade</legend>
          <select id="genderSelect" name="gender" @change="handleChange">
            <option value="" disabled selected>Selecione a Modalidade</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </fieldset>

        <fieldset class="course-options">
          <legend>Cursos</legend>
          <select id="teamSelect" name="team">
            <option value="" disabled selected>Selecione o Curso</option>
            <!-- Times serão exibidos aqui -->
          </select>
        </fieldset>
        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">1°</h3>
            <input
              type="text"
              id="name1"
              name="name1"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula1"
              name="matricula1"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file1"
                name="file1"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file1" id="label-file1">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">2°</h3>
            <input
              type="text"
              id="name2"
              name="name2"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula2"
              name="matricula2"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file2"
                name="file2"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file2" id="label-file2">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">3°</h3>
            <input
              type="text"
              id="name3"
              name="name3"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula3"
              name="matricula3"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file3"
                name="file3"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file3" id="label-file3">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">4°</h3>
            <input
              type="text"
              id="name4"
              name="name4"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula4"
              name="matricula4"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file4"
                name="file4"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file4" id="label-file4">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">5°</h3>
            <input
              type="text"
              id="name5"
              name="name5"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula5"
              name="matricula5"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file5"
                name="file5"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file5" id="label-file5">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">6°</h3>
            <input
              type="text"
              id="name6"
              name="name6"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula6"
              name="matricula6"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file6"
                name="file6"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file6" id="label-file6">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">7°</h3>
            <input
              type="text"
              id="name7"
              name="name7"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula7"
              name="matricula7"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file7"
                name="file7"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file7" id="label-file7">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">8°</h3>
            <input
              type="text"
              id="name8"
              name="name8"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula8"
              name="matricula8"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file8"
                name="file8"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file8" id="label-file8">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">9°</h3>
            <input
              type="text"
              id="name9"
              name="name9"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula9"
              name="matricula9"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file9"
                name="file9"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file9" id="label-file9">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">10°</h3>
            <input
              type="text"
              id="name10"
              name="name10"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula10"
              name="matricula10"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file10"
                name="file10"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file10" id="label-file10">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">11°</h3>
            <input
              type="text"
              id="name11"
              name="name11"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula11"
              name="matricula11"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file11"
                name="file11"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file11" id="label-file11">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">12°</h3>
            <input
              type="text"
              id="name12"
              name="name12"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula12"
              name="matricula12"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file12"
                name="file12"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file12" id="label-file12">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">13°</h3>
            <input
              type="text"
              id="name13"
              name="name13"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula13"
              name="matricula13"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file13"
                name="file13"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file13" id="label-file13">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="athlete-row">
            <h3 class="numero">14°</h3>
            <input
              type="text"
              id="name14"
              name="name14"
              placeholder="Nome Completo"
              required
            />
            <input
              type="text"
              id="matricula14"
              name="matricula14"
              placeholder="Matrícula"
              required
            />
            <div class="file-upload">
              <input
                type="file"
                id="file14"
                name="file14"
                accept="application/pdf"
                required
                onchange="handleFileChange(event)"
              />
              <label for="file14" id="label-file14">
                <i class="fas fa-upload"></i
              ></label>
            </div>
          </div>
        </fieldset>
      </div>
      <button id="enviarformulario" type="button" onclick="submitForm()">
        Finalizar Inscrição
      </button>
    </form>
  </body>
</html>

</template>
