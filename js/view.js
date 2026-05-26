"use strict";

export class View {

    init() {
        this.UI = document.getElementById("UI");
        this.createHeader();
        this.createTable();
    }

    createHeader() {

        const header = document.createElement("div");
        header.classList.add("header");
        header.innerHTML = `<h1>Grader 3000</h1> <p>Benotungssystem ISC</p>`;
        this.UI.appendChild(header);
    }

    createTable() {

        this.table = document.createElement("div");
        this.table.classList.add("table");

        const headerRow = document.createElement("div");

        headerRow.classList.add("row", "table-header");

        headerRow.innerHTML = `
        <div class="cell">Kategorie</div>
        <div class="cell">Bezeichnung</div>
        <div class="cell">Punkte (0–100)</div>
    `;

        this.table.appendChild(headerRow);
        this.UI.appendChild(this.table);
    }

    createInput(category, text, id) {
        const row = document.createElement("div");
        row.classList.add("row");

        const categoryCell = document.createElement("div");
        categoryCell.classList.add("cell");
        categoryCell.textContent = category;

        const labelCell = document.createElement("div");
        labelCell.classList.add("cell");
        labelCell.textContent = text;

        const inputCell = document.createElement("div");
        inputCell.classList.add("cell");

        const input = document.createElement("input");

        input.type = "number";
        input.id = id;
        input.min = 0;
        input.max = 100;
        input.value = 0;

        inputCell.appendChild(input);

        row.appendChild(categoryCell);
        row.appendChild(labelCell);
        row.appendChild(inputCell);

        this.table.appendChild(row);
    }

    createAttendance() {
        this.createInput("Anwesenheit", "Anwesenheit", "attendance");

        document.getElementById("attendance").value = 100;
    }

    createResult() {

        const result = document.createElement("h2");

        result.id = "result";
        result.textContent = "Gesamtnote: -";
        result.classList.add("result");

        this.UI.appendChild(result);
    }

    createReasons() {

        const reasons = document.createElement("p");

        reasons.id = "REASONS";
        reasons.classList.add("reasons");

        this.UI.appendChild(reasons);
    }

    markNegative(id) {
        document.getElementById(id).classList.add("negative");
    }

    markDropped(id) {
        document.getElementById(id).classList.add("dropped");
    }

    clearMarks() {

        document.querySelectorAll("input").forEach(input => {
            input.classList.remove("negative");
            input.classList.remove("dropped");
        });
    }

    showGrade(grade) {

        document.getElementById("result").textContent = "Gesamtnote: " + grade;
    }

    showReasons(reasons) {
        document.getElementById("REASONS").textContent = reasons.join(" | ");
    }
}