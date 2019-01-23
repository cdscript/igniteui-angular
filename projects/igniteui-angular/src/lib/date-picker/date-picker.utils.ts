/**
 * This enumeration is used to configure whether the date picker has an editable input
 * or is readonly - the date is selected only through a popup calendar.
 */
export enum DatePickerInteractionMode {
    EDITABLE = 'editable',
    READONLY = 'readonly'
}

/**
 *@hidden
 */
export const enum PREDEFINED_FORMAT_OPTIONS {
    SHORT_DATE = 'shortDate',
    MEDIUM_DATE = 'mediumDate',
    LONG_DATE = 'longDate',
    FULL_DATE = 'fullDate'
}

/**
 *@hidden
 */
export const enum PREDEFINED_FORMATS {
    SHORT_DATE_FORMAT = 'M/d/yy',
    MEDIUM_DATE_FORMAT = 'MMM d, y',
    LONG_DATE_FORMAT = 'MMMM d, y',
    FULL_DATE_FORMAT = 'EEEE, MMMM d, y'
}

/**
 *@hidden
 */
export const enum PREDEFINED_MASKS {
    SHORT_DATE_MASK = '00/00/00',
    MEDIUM_DATE_MASK = 'LLL 00, 0000',
    LONG_DATE_MASK = 'LLLLLLLLL 00, 0000', // longest month - sep - 9 chars
    FULL_DATE_MASK = 'LLLLLLLLL, LLLLLLLLL 00, 0000' // longest month - sep - 9 characters, longest week day - wed - 9 chars
}

/**
 *@hidden
 */
export const enum FORMAT_DESC {
    NUMERIC = 'numeric',
    TWO_DIGITS = 'twoDigits',
    SHORT = 'short',
    LONG = 'long',
    // NARROW = 'narrow' //not supported, return the same first letters for June/July, Thursday/Tuesday
}

/**
 *@hidden
 */
export const enum DATE_CHARS {
    YEAR_CHAR = 'y',
    MONTH_CHAR = 'M',
    DAY_CHAR = 'd',
    WEEKDAY_CHAR = 'E'
}

/**
 *@hidden
 */
export const enum DATE_PARTS {
    DAY = 'day',
    MONTH = 'month',
    YEAR = 'year',
    WEEKDAY = 'weekday'
}

/**
 *@hidden
 */
export const MAX_MONTH_SYMBOLS = 9;
/**
 *@hidden
 */
export const MAX_WEEKDAY_SYMBOLS = 9;
/**
 *@hidden
 */
export const SEPARATOR = 'separator';
/**
 *@hidden
 */
export const DEFAULT_LOCALE_DATE = 'en';

/**
 *@hidden
 */
export const SPIN_DELTA = 1;

/**
 *@hidden
 */
export const NUMBER_OF_MONTHS = 12;

/**
 *@hidden
 */
export const PROMPT_CHAR = '_';

export interface IFormatViews {
    day?: boolean;
    month?: boolean;
    year?: boolean;
}

export interface IFormatOptions {
    day?: string;
    month?: string;
    weekday?: string;
    year?: string;
}

export const MONTHS_NAMES_ARRAY = [
    { long: 'January', short: 'Jan' },
    { long: 'February', short: 'Feb' },
    { long: 'March', short: 'Mar' },
    { long: 'April', short: 'Apr' },
    { long: 'May', short: 'May' },
    { long: 'June', short: 'Jun' },
    { long: 'July', short: 'Jul' },
    { long: 'August', short: 'Aug' },
    { long: 'September', short: 'Sep' },
    { long: 'October', short: 'Oct' },
    { long: 'November', short: 'Nov' },
    { long: 'December', short: 'Dec' }
];

export const WEEKDAYS_NAMES_ARRAY = [
    { long: 'Monday', short: 'Mon' },
    { long: 'Tuesday', short: 'Tue' },
    { long: 'Wednesday', short: 'Wed' },
    { long: 'Thursday', short: 'Thu' },
    { long: 'Friday', short: 'Fri' },
    { long: 'Saturday', short: 'Sat' },
    { long: 'Sunday', short: 'Sun' }
];

/**
 *@hidden
 */
export function getYearFormatType(format: string): string {
    let type;
    const occurences = format.match(new RegExp(DATE_CHARS.YEAR_CHAR, 'g')).length;

    switch (occurences) {
        case 1: {
            // y (2020)
            type = FORMAT_DESC.NUMERIC;
            break;
        }
        case 4: {
            // yyyy (2020)
            type = FORMAT_DESC.NUMERIC;
            break;
        }
        case 2: {
            // yy (20)
            type = FORMAT_DESC.TWO_DIGITS;
            break;
        }
    }

    return type;
}

/**
 *@hidden
 */
export function getMonthFormatType(format: string): string {
    let type;
    const occurences = format.match(new RegExp(DATE_CHARS.MONTH_CHAR, 'g')).length;

    switch (occurences) {
        case 1: {
            // M
            type = FORMAT_DESC.NUMERIC;
            break;
        }
        case 2: {
            // MM
            type = FORMAT_DESC.TWO_DIGITS;
            break;
        }
        case 3: {
            // MMM
            type = FORMAT_DESC.SHORT;
            break;
        }
        case 4: {
            // MMMM
            type = FORMAT_DESC.LONG;
            break;
        }
    }

    return type;
}

/**
 *@hidden
 */
export function getDayFormatType(format: string): string {
    let type;
    const occurences = format.match(new RegExp(DATE_CHARS.DAY_CHAR, 'g')).length;

    switch (occurences) {
        case 1: {
            // d
            type = FORMAT_DESC.NUMERIC;
            break;
        }
        case 2: {
            // dd
            type = FORMAT_DESC.TWO_DIGITS;
            break;
        }
    }

    return type;
}

/**
 *@hidden
 */
export function getWeekDayFormatType(format: string): string {
    let type;
    const occurences = format.match(new RegExp(DATE_CHARS.WEEKDAY_CHAR, 'g')).length;

    switch (occurences) {
        case 3: {
            // EEE (Tue)
            type = FORMAT_DESC.SHORT;
            break;
        }
        case 4: {
            // EEEE (Tuesday)
            type = FORMAT_DESC.LONG;
            break;
        }
    }

    return type;
}

/**
 *@hidden
 */
export function parseDateFormat(format: string): any[] {
    const dateStruct = [];
    const maskArray = Array.from(format);
    const weekdayInitPosition = format.indexOf(DATE_CHARS.WEEKDAY_CHAR);
    const monthInitPosition = format.indexOf(DATE_CHARS.MONTH_CHAR);
    const dayInitPosition = format.indexOf(DATE_CHARS.DAY_CHAR);
    const yearInitPosition = format.indexOf(DATE_CHARS.YEAR_CHAR);

    if (yearInitPosition !== -1) {
        dateStruct.push({
            type: DATE_PARTS.YEAR,
            initialPosition: yearInitPosition,
            formatType: getYearFormatType(format)
        });
    }

    if (weekdayInitPosition !== -1) {
        dateStruct.push({
            type: DATE_PARTS.WEEKDAY,
            initialPosition: weekdayInitPosition,
            formatType: getWeekDayFormatType(format)
        });
    }

    if (monthInitPosition !== -1) {
        dateStruct.push({
            type: DATE_PARTS.MONTH,
            initialPosition: monthInitPosition,
            formatType: getMonthFormatType(format)
        });
    }

    if (dayInitPosition !== -1) {
        dateStruct.push({
            type: DATE_PARTS.DAY,
            initialPosition: dayInitPosition,
            formatType: getDayFormatType(format)
        });
    }

    for (let i = 0; i < maskArray.length; i++) {
        if (!isSpecialSymbol(maskArray[i])) {
            dateStruct.push({
                type: SEPARATOR,
                initialPosition: i,
                value: maskArray[i]
            });
        }
    }

    dateStruct.sort((a, b) => a.initialPosition - b.initialPosition);
    fillDatePartsPositions(dateStruct);

    return dateStruct;
}

/**
 *@hidden
 */
export function isSpecialSymbol(char: string): boolean {
    return (char !== DATE_CHARS.YEAR_CHAR
        && char !== DATE_CHARS.MONTH_CHAR
        && char !== DATE_CHARS.DAY_CHAR
        && char !== DATE_CHARS.WEEKDAY_CHAR) ? false : true;
}

/**
 *@hidden
 */
export function getFormatMask(format: string): string {
    const mask = [];
    const dateStruct = parseDateFormat(format);

    for (let i = 0; i < dateStruct.length; i++) {
        if (dateStruct[i].type === DATE_PARTS.DAY) {
            mask.push('00');
        }
        if (dateStruct[i].type === DATE_PARTS.MONTH) {
            switch (dateStruct[i].formatType) {
                case FORMAT_DESC.SHORT: {
                    mask.push('LLL');
                    break;
                }
                case FORMAT_DESC.LONG: {
                    mask.push('LLLLLLLLL');
                    break;
                }
                default: {
                    // M && MM
                    mask.push('00');
                    break;
                }
            }
        }
        if (dateStruct[i].type === DATE_PARTS.YEAR) {
            switch (dateStruct[i].formatType) {
                case FORMAT_DESC.NUMERIC: {
                    mask.push('0000');
                    break;
                }
                case FORMAT_DESC.TWO_DIGITS: {
                    mask.push('00');
                    break;
                }
            }
        }
        if (dateStruct[i].type === DATE_PARTS.WEEKDAY) {
            switch (dateStruct[i].formatType) {
                case FORMAT_DESC.SHORT: {
                    mask.push('LLL');
                    break;
                }
                case FORMAT_DESC.LONG: {
                    mask.push('LLLLLLLLL');
                    break;
                }
            }
        }
        if (dateStruct[i].type === SEPARATOR) {
            mask.push(dateStruct[i].value);
        }
    }

    return mask.join('');
}

/**
 *@hidden
 */
export function createDate(day: number, month: number, year: number): Date {
    const date = new Date();
    date.setDate(day);
    date.setMonth(month);
    date.setFullYear(year);
    return date;
}

/**
 *@hidden
 */
export function trimMaskSymbols(mask: string): string {
    return mask.replace(/0|L/g, PROMPT_CHAR);
}

/**
 *@hidden
 */
export function trimUnderlines(value: string): string {
    return value.replace(/_/g, '');
}

/**
 *@hidden
 */
export function getLongMonthName(value: Date): string {
    return value.toLocaleString('en', {
        month: 'long'
    });
}

/**
 *@hidden
 */
export function getLongDayName(value: Date): string {
    return value.toLocaleString('en', {
        weekday: 'long'
    });
}

/**
 *@hidden
 */
export function getNumericFormatPrefix(formatType: string): string {
    switch (formatType) {
        case FORMAT_DESC.TWO_DIGITS: {
            return '0';
        }
        case FORMAT_DESC.NUMERIC: {
            return PROMPT_CHAR;
        }
    }
}

/**
 *@hidden
 */
export function getSpinnedDateInput(dateFormatParts: any[], inputValue: string, position: number, delta: number): string {
    const datePart = getDatePartOnPosition(dateFormatParts, position);
    const positionsArray = datePart[0].position;
    const startIdx = positionsArray[0];
    const endIdx = positionsArray[1];
    const datePartType = datePart[0].type;
    const datePartFormatType = datePart[0].formatType;

    const partValue = getDateValueFromInput(dateFormatParts, datePartType, inputValue);
    let newValue = parseInt(partValue, 10);

    if (isNaN(newValue)) {
        if (datePartType === DATE_PARTS.MONTH
            && (datePartFormatType === FORMAT_DESC.LONG || datePartFormatType === FORMAT_DESC.SHORT)) {
            newValue = getMonthIndexFromString(dateFormatParts, inputValue) - 1;
        }
        if (datePartType === DATE_PARTS.WEEKDAY) {
            newValue = getMonthIndexFromString(dateFormatParts, inputValue) - 1;
        }
    }

    // console.log('getSpinnedDateInput newValue ' + newValue + ' inputValue ' + inputValue + ' datePartType ' + datePartType);

    let maxValue, minValue;
    if (!isNaN(newValue)) {
        switch (datePartType) {
            case DATE_PARTS.MONTH: {
                // Max 12 months
                if (datePartFormatType === FORMAT_DESC.LONG || datePartFormatType === FORMAT_DESC.SHORT) {
                    minValue = 0;
                    maxValue = NUMBER_OF_MONTHS - 1;
                } else {
                    minValue = 1;
                    maxValue = NUMBER_OF_MONTHS;
                }
                break;
            }
            case DATE_PARTS.DAY: {
                minValue = 1;
                maxValue = daysInMonth(
                    getFullYearFromString(dateFormatParts, inputValue),
                    getMonthIndexFromString(dateFormatParts, inputValue));
                break;
            }
            case DATE_PARTS.YEAR: {
                if (datePartFormatType === FORMAT_DESC.TWO_DIGITS) {
                    minValue = 0;
                    maxValue = 99;
                } else {
                    // Infinite loop
                    minValue = 'infinite';
                    maxValue = 'infinite';
                }
                break;
            }
            case DATE_PARTS.WEEKDAY: {
                minValue = 0;
                maxValue = 6;
                break;
            }
        }
    }

    let tempValue = newValue;
    tempValue += delta;
    if ((tempValue <= maxValue && tempValue >= minValue) || maxValue === 'infinite' || minValue === 'infinite') {
        newValue = tempValue;
    }

    const start = inputValue.slice(0, startIdx);
    const end = inputValue.slice(endIdx, inputValue.length);
    let changedPart: string;

    if (datePartType === DATE_PARTS.MONTH
        && (datePartFormatType === FORMAT_DESC.LONG || datePartFormatType === FORMAT_DESC.SHORT)) {
        // Named months
        const monthName = getMonthNameFromIndex(dateFormatParts, newValue);
        let suffix = '';
        const promptCharToAdd = (datePartFormatType === FORMAT_DESC.LONG) ? MAX_MONTH_SYMBOLS - monthName.length : 3;
        for (let i = 0; i < promptCharToAdd; i++) {
            suffix += PROMPT_CHAR;
        }
        changedPart = (monthName.length < promptCharToAdd) ? `${monthName}${suffix}` : `${monthName}`;
    } else {
        // Numeric data
        // Handling leading zero format
        const prefix = getNumericFormatPrefix(datePartFormatType);
        changedPart = (newValue < 10) ? `${prefix}${newValue}` : `${newValue}`;
    }

    // console.log('getSpinnedDateInput ' + `${start}${changedPart}${end}`);

    return `${start}${changedPart}${end}`;
}

// /**
//  *@hidden
//  */
// export function isOneDigit(input: string, char: string, index: number): boolean {
//     return input.match(new RegExp(char, 'g')).length === 1 && index < 10;
// }

/**
 *@hidden
 */
export function daysInMonth(fullYear: number, month: number): number {
    return new Date(fullYear, month, 0).getDate();
}

/**
 *@hidden
 */
export function addPromptCharsEditMode(date: Date, inputValue: string, dateFormatParts: any[]): string {
    let offset = 0;
    const dateArray = Array.from(inputValue);
    const monthName = getLongMonthName(date);
    const dayName = getLongDayName(date);

    for (let i = 0; i < dateFormatParts.length; i++) {
        if (dateFormatParts[i].type === DATE_PARTS.WEEKDAY) {
            if (dateFormatParts[i].formatType === FORMAT_DESC.LONG) {
                offset += MAX_WEEKDAY_SYMBOLS - 4;
                for (let j = dayName.length; j < MAX_WEEKDAY_SYMBOLS; j++) {
                    dateArray.splice(j, 0, PROMPT_CHAR);
                }
                dateArray.join('');
            }
        }

        if (dateFormatParts[i].type === DATE_PARTS.MONTH) {
            if (dateFormatParts[i].formatType === FORMAT_DESC.LONG) {
                const startPos = offset + dateFormatParts[i].initialPosition + monthName.length;
                const endPos = startPos + MAX_MONTH_SYMBOLS - monthName.length;
                offset += MAX_MONTH_SYMBOLS - 4;
                for (let j = startPos; j < endPos; j++) {
                    dateArray.splice(j, 0, PROMPT_CHAR);
                }
                dateArray.join('');
            }
            if (dateFormatParts[i].formatType === FORMAT_DESC.NUMERIC
                || dateFormatParts[i].formatType === FORMAT_DESC.TWO_DIGITS) {
                if (date.getMonth() + 1 < 10) {
                    const startPos = offset + dateFormatParts[i].initialPosition;
                    dateArray.splice(startPos, 0, getNumericFormatPrefix(dateFormatParts[i].formatType));
                }
                offset += 1;
                dateArray.join('');
            }
        }

        if (dateFormatParts[i].type === DATE_PARTS.DAY) {
            if (dateFormatParts[i].formatType === FORMAT_DESC.NUMERIC
                || dateFormatParts[i].formatType === FORMAT_DESC.TWO_DIGITS) {
                if (date.getDate() < 10) {
                    const startPos = offset + dateFormatParts[i].initialPosition;
                    dateArray.splice(startPos, 0, getNumericFormatPrefix(dateFormatParts[i].formatType));
                }
                offset += 1;
                dateArray.join('');
            }
        }
    }

    return dateArray.join('');
}

/**
 *@hidden
 */
export function getDateValueFromInput(dateFormatParts: any[], type: string, inputValue: string): string {
    const part = getDateFormatPart(dateFormatParts, type);
    const partPosition = part.position;
    const startIdx = partPosition[0];
    const endIdx = partPosition[1];

    return trimUnderlines(inputValue.substring(startIdx, endIdx));
}

/**
 *@hidden
 */
export function getDateFormatPart(dateFormatParts: any[], type: string): any {
    return dateFormatParts.filter((datePart) => (datePart.type === type))[0];
}

/**
 *@hidden
 */
function getDatePartOnPosition(dateFormatParts: any[], position: number) {
    return dateFormatParts.filter((element) =>
        element.position[0] <= position && position <= element.position[1] && element.type !== SEPARATOR);
}

/**
 *@hidden
 */
function fillDatePartsPositions(dateArray: any[]): void {
    let currentPos = 0;

    for (let i = 0; i < dateArray.length; i++) {
        // Day part positions
        if (dateArray[i].type === DATE_PARTS.DAY) {
            // Offset 2 positions for number
            dateArray[i].position = [currentPos, currentPos + 2];
            currentPos += 2;
        }

        // Month part positions
        if (dateArray[i].type === DATE_PARTS.MONTH) {
            switch (dateArray[i].formatType) {
                case FORMAT_DESC.SHORT: {
                    // Offset 3 positions for short month name
                    dateArray[i].position = [currentPos, currentPos + 3];
                    currentPos += 3;
                    break;
                }
                case FORMAT_DESC.LONG: {
                    // Offset 9 positions for long month name
                    dateArray[i].position = [currentPos, currentPos + MAX_MONTH_SYMBOLS];
                    currentPos += MAX_MONTH_SYMBOLS;
                    break;
                }
                default: {
                    // FORMAT_DESC.NUMERIC || FORMAT_DESC.TWO_DIGITS - 2 positions
                    dateArray[i].position = [currentPos, currentPos + 2];
                    currentPos += 2;
                    break;
                }
            }
        }

        // Separator positions
        if (dateArray[i].type === SEPARATOR) {
            dateArray[i].position = [currentPos, currentPos + 1];
            currentPos++;
        }

        // Year part positions
        if (dateArray[i].type === DATE_PARTS.YEAR) {
            switch (dateArray[i].formatType) {
                case FORMAT_DESC.NUMERIC: {
                    // Offset 4 positions for full year
                    dateArray[i].position = [currentPos, currentPos + 4];
                    currentPos += 4;
                    break;
                }
                case FORMAT_DESC.TWO_DIGITS: {
                    // Offset 2 positions for short year
                    dateArray[i].position = [currentPos, currentPos + 2];
                    currentPos += 2;
                    break;
                }
            }
        }

        if (dateArray[i].type === DATE_PARTS.WEEKDAY) {
            switch (dateArray[i].formatType) {
                case FORMAT_DESC.SHORT: {
                    // Offset 3 positions
                    dateArray[i].position = [currentPos, currentPos + 3];
                    currentPos += 3;
                    break;
                }
                case FORMAT_DESC.LONG: {
                    // Offset 9 positions
                    dateArray[i].position = [currentPos, currentPos + MAX_WEEKDAY_SYMBOLS];
                    currentPos += MAX_WEEKDAY_SYMBOLS;
                    break;
                }
            }
        }

    }
}

/**
 *@hidden
 */
function getFullYearFromString(dateFormatParts: any[], inputValue): number {
    const partPos = getDateFormatPart(dateFormatParts, DATE_PARTS.YEAR).position;
    return Number(inputValue.substring(partPos[0], partPos[1]));
}

/**
 *@hidden
 */
function getMonthIndexFromString(dateFormatParts: any[], inputValue): number {
    let monthIndex;
    const formatType = getDateFormatPart(dateFormatParts, DATE_PARTS.MONTH).formatType;
    const value = getDateValueFromInput(dateFormatParts, DATE_PARTS.MONTH, inputValue);

    switch (formatType) {
        case FORMAT_DESC.NUMERIC:
        case FORMAT_DESC.TWO_DIGITS: {
            monthIndex = Number(value);
            break;
        }
        case FORMAT_DESC.SHORT: {
            monthIndex = MONTHS_NAMES_ARRAY.findIndex((month) => month.short === value) + 1;
            break;
        }
        case FORMAT_DESC.LONG: {
            monthIndex = MONTHS_NAMES_ARRAY.findIndex((month) => month.long === value) + 1;
            break;
        }
    }

    return monthIndex;
}

/**
 *@hidden
 */
function getMonthNameFromIndex(dateFormatParts: any[], index: number): string {
    const formatType = getDateFormatPart(dateFormatParts, DATE_PARTS.MONTH).formatType;
    switch (formatType) {
        case FORMAT_DESC.LONG: {
            return MONTHS_NAMES_ARRAY[index].long;
        }
        case FORMAT_DESC.SHORT: {
            return MONTHS_NAMES_ARRAY[index].short;
        }
    }
}

/**
 *@hidden
 */
function geDayNameFromIndex(dateFormatParts: any[], index: number): string {
    const formatType = getDateFormatPart(dateFormatParts, DATE_PARTS.WEEKDAY).formatType;
    switch (formatType) {
        case FORMAT_DESC.LONG: {
            return WEEKDAYS_NAMES_ARRAY[index].long;
        }
        case FORMAT_DESC.SHORT: {
            return WEEKDAYS_NAMES_ARRAY[index].short;
        }
    }
}

/**
 *@hidden
 */
function getDayIndexFromString(dateFormatParts: any[], inputValue): number {
    let dayIndex;
    const formatType = getDateFormatPart(dateFormatParts, DATE_PARTS.WEEKDAY).formatType;
    const value = getDateValueFromInput(dateFormatParts, DATE_PARTS.WEEKDAY, inputValue);

    switch (formatType) {
        case FORMAT_DESC.SHORT: {
            dayIndex = WEEKDAYS_NAMES_ARRAY.findIndex((dayName) => dayName.short === value);
            break;
        }
        case FORMAT_DESC.LONG: {
            dayIndex = WEEKDAYS_NAMES_ARRAY.findIndex((dayName) => dayName.long === value);
            break;
        }
    }

    return dayIndex;
}