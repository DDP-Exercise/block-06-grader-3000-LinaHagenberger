"use strict";

import {Model} from "./model.js";
import {View} from "./view.js";

export class Controller {

    init() {
        this.model = new Model();
        this.model.init();

        this.view = new View();
        this.view.init();

        for (let i = 0; i < 8; i++) {
            this.view.createInput(i === 0 ? "Übungsnoten" : "", "Übung " + (i + 1), "exercise" + i, i === 0);
        }

        this.view.createInput("Klausur", "Klausur", "exam");
        this.view.createAttendance();
        this.view.createResult();
        this.view.createReasons();
        this.addEventListeners();

        document.addEventListener("gradeChanged", () => {

            this.view.clearMarks();

            let lowest = Math.min(...this.model.exercises);
            let droppedIndex = this.model.exercises.findIndex(v => v === lowest);

            this.view.markDropped("exercise" + droppedIndex);
            this.model.exercises.forEach((points, i) => {

                if (i === droppedIndex) {
                    return;
                }

                if (!this.model.isPositive(points)) {
                    this.view.markNegative("exercise" + i);
                }
            });

            if (!this.model.isPositive(this.model.exam)) {
                this.view.markNegative("exam");
            }

            if (this.model.attendance < 80) {
                this.view.markNegative("attendance");
            }

            this.view.showGrade(this.model.getGrade());

            this.view.showReasons(this.model.getNegativeReasons());
        });
    };

    addEventListeners() {
        let inputs = document.querySelectorAll("input");

        inputs.forEach(input => {
            input.addEventListener("change", () => {

                let value = Number(input.value);

                if (value < 0) {
                    value = 0;
                }

                if (value > 100) {
                    value = 100;
                }

                input.value = value;

                if (input.id.includes("exercise")) {
                    let index = input.id.replace("exercise", "");
                    this.model.setExercise(index, value);
                }

                if (input.id === "exam") {
                    this.model.setExam(value);
                }

                if (input.id === "attendance") {
                    this.model.setAttendance(value);
                }
            });
        });
    }
}

const CONTROLLER = new Controller();
CONTROLLER.init();