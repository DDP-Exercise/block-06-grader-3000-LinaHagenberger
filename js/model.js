"use strict";

export class Model {

    init() {
        this.exercises = new Array(8).fill(0);
        this.exam = 0;
        this.attendance = 100;
    }

    setExercise(index, points) {
        this.exercises[index] = Number(points);
        this.notifyChange();
    }

    setExam(points) {
        this.exam = Number(points);
        this.notifyChange();
    }

    setAttendance(percent) {
        this.attendance = Number(percent);
        this.notifyChange();
    }

    isPositive(points) {
        return points > 50;
    }

    getLowestExercise() {
        return Math.min(...this.exercises);
    }

    getPositiveExerciseCount() {
        return this.exercises.filter(
            points => this.isPositive(points)
        ).length;
    }

   enoughPositiveExercises() {
       const required = Math.ceil(this.exercises.length * 0.75);
       return this.getPositiveExerciseCount() >= required;
    }

    getExerciseScore() {
        const LOWEST = Math.min(...this.exercises);
        const TOTAL = this.exercises.reduce((sum, value) => sum + value, 0) - LOWEST;
        const MAX = (this.exercises.length - 1) * 100;
        return (TOTAL / MAX) * 100;
    }

    getTotalPercent() {
        const exerciseScore = this.getExerciseScore();
        return (exerciseScore * 0.6 + this.exam * 0.4);
    }

    getNegativeReasons() {
        const REASONS = [];

        if (!this.isPositive(this.exam)) {
            REASONS.push("Klausur negativ");
        }

        if (!this.isPositive(this.getExerciseScore())) {
            REASONS.push("Übungsnote negativ");
        }

        if (!this.enoughPositiveExercises()) {
            REASONS.push("Zu wenige positive Übungen");
        }

        if (this.attendance < 80) {
            REASONS.push("Anwesenheit unter 80%");
        }
        return REASONS;
    }

    isOverallPositive() {
        return this.getNegativeReasons().length === 0;
    }

    getGrade() {
        if (!this.isOverallPositive()) {
            return 5;
        }

        const PERCENT = this.getTotalPercent();

        if (PERCENT <= 50) {
            return 5;
        }
        if (PERCENT <= 61) {
            return 4;
        }
        if (PERCENT <= 74) {
            return 3;
        }
        if (PERCENT <= 86) {
            return 2;
        }
        return 1;
    }

    notifyChange() {
        document.dispatchEvent(new CustomEvent("gradeChanged"));
    }
}