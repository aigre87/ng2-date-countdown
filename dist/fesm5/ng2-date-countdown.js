import { __decorate, __metadata } from 'tslib';
import { EventEmitter, Input, Output, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var CountDown = /** @class */ (function () {
    function CountDown() {
        this.displayString = '';
        this.showZero = false;
        this.reached = new EventEmitter();
        this.display = [];
        this.displayNumbers = [];
        this.wasReached = false;
        this.interval = null;
    }
    CountDown.prototype.ngOnInit = function () {
        var _this = this;
        this.interval = setInterval(function () { return _this._displayString(); }, 100);
    };
    CountDown.prototype.ngOnDestroy = function () {
        clearInterval(this.interval);
    };
    CountDown.prototype._displayString = function () {
        if (this.wasReached)
            return;
        if (typeof this.units === 'string') {
            this.units = this.units.split('|');
        }
        var givenDate = new Date(this.end);
        var now = new Date();
        var dateDifference = givenDate - now;
        if ((dateDifference < 100 && dateDifference > 0) || dateDifference < 0 && !this.wasReached) {
            this.wasReached = true;
            this.reached.next(now);
        }
        var lastUnit = this.units[this.units.length - 1], unitConstantForMillisecs = {
            year: (((1000 * 60 * 60 * 24 * 7) * 4) * 12),
            month: ((1000 * 60 * 60 * 24 * 7) * 4),
            weeks: (1000 * 60 * 60 * 24 * 7),
            days: (1000 * 60 * 60 * 24),
            hours: (1000 * 60 * 60),
            minutes: (1000 * 60),
            seconds: 1000
        }, unitsLeft = {}, returnText = '', returnNumbers = '', totalMillisecsLeft = dateDifference, i, unit;
        for (i in this.units) {
            if (this.units.hasOwnProperty(i)) {
                unit = this.units[i].trim();
                if (unitConstantForMillisecs[unit.toLowerCase()] === false) {
                    //$interval.cancel(countDownInterval);
                    throw new Error('Cannot repeat unit: ' + unit);
                }
                if (unitConstantForMillisecs.hasOwnProperty(unit.toLowerCase()) === false) {
                    throw new Error('Unit: ' + unit + ' is not supported. Please use following units: year, month, weeks, days, hours, minutes, seconds, milliseconds');
                }
                // If it was reached, everything is zero
                unitsLeft[unit] = (this.wasReached) ? 0 : totalMillisecsLeft / unitConstantForMillisecs[unit.toLowerCase()];
                if (lastUnit === unit) {
                    unitsLeft[unit] = Math.ceil(unitsLeft[unit]);
                }
                else {
                    unitsLeft[unit] = Math.floor(unitsLeft[unit]);
                }
                totalMillisecsLeft -= unitsLeft[unit] * unitConstantForMillisecs[unit.toLowerCase()];
                unitConstantForMillisecs[unit.toLowerCase()] = false;
                // If it's less than 0, round to 0
                unitsLeft[unit] = (unitsLeft[unit] > 0) ? unitsLeft[unit] : 0;
                returnNumbers += ' ' + unitsLeft[unit] + ' | ';
                returnText += ' ' + unit;
            }
        }
        if (this.text === null || !this.text) {
            this.text = {
                Year: 'Year',
                Month: 'Month',
                Weeks: 'Weeks',
                Days: 'Days',
                Hours: 'Hours',
                Minutes: 'Minutes',
                Seconds: 'Seconds',
                MilliSeconds: 'Milliseconds'
            };
        }
        this.displayString = returnText
            .replace('Year', this.text.Year + ' | ')
            .replace('Month', this.text.Month + ' | ')
            .replace('Weeks', this.text.Weeks + ' | ')
            .replace('Days', this.text.Days + ' | ')
            .replace('Hours', this.text.Hours + ' | ')
            .replace('Minutes', this.text.Minutes + ' | ')
            .replace('Seconds', this.text.Seconds);
        this.displayNumbers = returnNumbers.split('|');
        this.display = this.displayString.split('|');
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CountDown.prototype, "units", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CountDown.prototype, "end", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CountDown.prototype, "displayString", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CountDown.prototype, "text", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CountDown.prototype, "divider", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CountDown.prototype, "showZero", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CountDown.prototype, "reached", void 0);
    CountDown = __decorate([
        Component({
            selector: 'countdown',
            template: "<div class=\"countdown\">\n  <div *ngFor=\"let time of display; let i = index\" class=\"measurements {{time}}\">\n    <p class=\"measurements-number\">\n      {{ (showZero && displayNumbers[i] < 10) ? '0' + displayNumbers[i].trim() : displayNumbers[i]}}\n    </p>\n    <span *ngIf=\"display[i+1]\" class=\"divider\"> {{divider}} </span>\n    <p class=\"measurements-text\">\n      {{time}}\n    </p>\n  </div>\n</div>\n<ng-content></ng-content>\n",
            styles: [".countdown{display:flex;align-items:center;justify-content:center;align-content:center;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif}.countdown .measurements{flex:.1}.countdown .measurements .divider{float:right}"]
        }),
        __metadata("design:paramtypes", [])
    ], CountDown);
    return CountDown;
}());

var CountdownModule = /** @class */ (function () {
    function CountdownModule() {
    }
    CountdownModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                CountDown
            ],
            exports: [
                CountDown
            ]
        })
    ], CountdownModule);
    return CountdownModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { CountDown, CountdownModule };
//# sourceMappingURL=ng2-date-countdown.js.map
